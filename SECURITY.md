# Opflow Security Guide

## 🔒 Security Architecture

### Hot Wallet Security

**CRITICAL RULES:**

1. ✅ **Hot wallet addresses are PUBLIC** - stored in code
2. ✅ **Private keys are NEVER in code** - stored offline in hardware wallet
3. ✅ **Frontend cannot access funds** - only creates transaction requests
4. ✅ **Users sign in their own wallets** - non-custodial

### Hot Wallet Best Practices

```
┌─────────────────────────────────────────┐
│  COLD STORAGE (95% of funds)           │
│  - Hardware Wallet (Ledger/Trezor)     │
│  - Multi-sig 2-of-3 or 3-of-5          │
│  - Offline, air-gapped                 │
└─────────────────────────────────────────┘
              ↓ (Manual transfers)
┌─────────────────────────────────────────┐
│  HOT WALLET (5% for operations)        │
│  - bc1pvuy6k4...                       │
│  - 0xc07838c4...                       │
│  - Automated backend access            │
│  - Daily limits enabled                │
└─────────────────────────────────────────┘
```

---

## 🛡️ Frontend Security

### 1. No Private Data in Code

**✅ SAFE:**
```typescript
export const OPNET_HOT_WALLET = 'bc1pvuy6k4...'; // Public address
export const BASE_HOT_WALLET = '0xc07838c4...';  // Public address
```

**❌ NEVER DO THIS:**
```typescript
// NEVER STORE PRIVATE KEYS IN CODE!
const PRIVATE_KEY = '0x1234...'; // ❌ EXTREMELY DANGEROUS
const MNEMONIC = 'word1 word2...'; // ❌ NEVER!
```

### 2. User Wallet Interactions

The frontend only **requests** transactions:

```typescript
// OP_NET Transfer Request
window.opwallet.transfer({
  to: OPNET_HOT_WALLET,
  amount: userInputAmount,
  contractId: selectedToken.contractId
});
// User sees popup → User approves/rejects
// Frontend NEVER has access to private keys
```

```typescript
// Base ERC-20 Transfer Request
await walletClient.writeContract({
  address: USDT_CONTRACT,
  abi: ERC20_ABI,
  functionName: 'transfer',
  args: [BASE_HOT_WALLET, amount]
});
// User sees MetaMask popup → User approves/rejects
```

### 3. XSS Protection

**Enabled by default in Next.js 15:**
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options

**Additional CSP (add to next.config.js):**

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
              "img-src 'self' data: https:",
              "font-src 'self' https://api.fontshare.com",
              "connect-src 'self' https://mainnet.opnet.org https://mainnet.base.org https://api.coingecko.com"
            ].join('; ')
          }
        ]
      }
    ];
  }
};
```

---

## 🔐 Backend Security (Required for Production)

### 1. Hot Wallet Private Key Management

**Recommended Setup:**

```typescript
// backend/config/secrets.ts
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

// Store private keys in AWS Secrets Manager / SSM
const getPrivateKey = async () => {
  const client = new SSMClient({ region: 'us-east-1' });
  const command = new GetParameterCommand({
    Name: '/opflow/opnet-hot-wallet-private-key',
    WithDecryption: true
  });
  const response = await client.send(command);
  return response.Parameter?.Value;
};
```

**Alternative: Hardware Security Module (HSM)**
- AWS CloudHSM
- YubiHSM
- Ledger Enterprise

### 2. Transaction Verification

**Before executing opposite-side transfer:**

```typescript
// Verify incoming transaction
const verifyIncomingTransfer = async (txHash: string, chain: 'opnet' | 'base') => {
  // 1. Fetch transaction from blockchain
  const tx = await getTransaction(txHash, chain);
  
  // 2. Verify recipient is our hot wallet
  if (tx.to !== (chain === 'opnet' ? OPNET_HOT_WALLET : BASE_HOT_WALLET)) {
    throw new Error('Invalid recipient');
  }
  
  // 3. Verify amount matches order
  if (tx.amount !== expectedAmount) {
    throw new Error('Amount mismatch');
  }
  
  // 4. Wait for confirmations
  // OP_NET: 3 confirmations
  // Base: 12 confirmations
  if (tx.confirmations < MIN_CONFIRMATIONS) {
    throw new Error('Not enough confirmations');
  }
  
  // 5. Check for double-spend
  const isDoubleSpend = await checkDoubleSpend(txHash);
  if (isDoubleSpend) {
    throw new Error('Double spend detected');
  }
  
  return true;
};
```

### 3. Rate Limiting

```typescript
// backend/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

const swapLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 swaps per 15 minutes per IP
  message: 'Too many swap requests, please try again later'
});

app.post('/api/swap', swapLimiter, handleSwap);
```

### 4. Daily Limits

```typescript
// Limit on hot wallet
const DAILY_LIMIT_USD = 50000;

const checkDailyLimit = async (amount: number) => {
  const today = new Date().toISOString().split('T')[0];
  const todayVolume = await getTodayVolume(today);
  
  if (todayVolume + amount > DAILY_LIMIT_USD) {
    // Pause automated transfers
    // Notify admin
    await notifyAdmin('Daily limit reached');
    throw new Error('Daily limit exceeded');
  }
};
```

---

## 🚨 Incident Response

### 1. Suspicious Activity Detection

```typescript
// backend/monitoring/alerts.ts
const detectSuspiciousActivity = (swap) => {
  // Large swap (>$10k)
  if (swap.amount > 10000) {
    notifyAdmin('Large swap detected', swap);
  }
  
  // Multiple swaps from same address
  if (getSwapCountToday(swap.address) > 5) {
    notifyAdmin('Multiple swaps from same address', swap);
  }
  
  // Unusual token
  if (!WHITELISTED_TOKENS.includes(swap.token)) {
    throw new Error('Token not whitelisted');
  }
};
```

### 2. Emergency Pause

```typescript
// Admin-only endpoint
app.post('/admin/emergency-pause', adminAuth, async (req, res) => {
  await redis.set('EMERGENCY_PAUSE', 'true');
  await notifyAllAdmins('EMERGENCY PAUSE ACTIVATED');
  res.json({ success: true });
});

// Check before each swap
if (await redis.get('EMERGENCY_PAUSE') === 'true') {
  throw new Error('System temporarily paused');
}
```

### 3. Audit Logging

```typescript
// Log every transaction
const logTransaction = async (tx) => {
  await db.auditLog.create({
    timestamp: new Date(),
    txHash: tx.hash,
    from: tx.from,
    to: tx.to,
    amount: tx.amount,
    token: tx.token,
    chain: tx.chain,
    status: tx.status,
    ipAddress: tx.ipAddress,
    userAgent: tx.userAgent
  });
};
```

---

## 📋 Security Checklist

### Pre-Launch

- [ ] Private keys stored in secure vault (AWS Secrets Manager / HSM)
- [ ] Hot wallet has daily limits configured
- [ ] Multi-sig enabled for large transfers
- [ ] Rate limiting implemented
- [ ] HTTPS/SSL configured
- [ ] Content Security Policy enabled
- [ ] Transaction verification logic tested
- [ ] Audit logging enabled
- [ ] Emergency pause mechanism ready
- [ ] Monitoring and alerts configured

### Regular Audits

- [ ] Weekly: Review transaction logs
- [ ] Weekly: Check hot wallet balances
- [ ] Monthly: Security audit
- [ ] Monthly: Review access logs
- [ ] Quarterly: Penetration testing
- [ ] Quarterly: Update dependencies (`npm audit`)

### Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update all dependencies
npm update
```

---

## 🔍 Monitoring

### Real-Time Alerts

**Set up alerts for:**

1. **Hot Wallet Balance**
   - Alert if balance < $1,000
   - Alert if balance drops >50% in 1 hour

2. **Failed Transactions**
   - Alert if >10 failed transactions in 1 hour
   - Alert on any transaction timeout

3. **Unusual Activity**
   - Alert on swaps >$10,000
   - Alert on >5 swaps from same address/hour
   - Alert on first-time tokens

4. **System Health**
   - Alert if API response time >2s
   - Alert if RPC endpoint is down
   - Alert if price oracle fails

### Monitoring Tools

**Recommended:**
- **Sentry** - Error tracking
- **Datadog** - Application monitoring
- **PagerDuty** - On-call alerts
- **CloudWatch** (AWS) - Infrastructure monitoring

---

## 🛠️ Recovery Procedures

### Compromised Hot Wallet

1. **Immediate Actions (Within 5 minutes):**
   ```bash
   # Activate emergency pause
   curl -X POST https://api.opflow.com/admin/emergency-pause
   
   # Transfer all remaining funds to cold storage
   # (Manual transaction from secure device)
   ```

2. **Investigation (1-2 hours):**
   - Review audit logs
   - Identify attack vector
   - Assess damage

3. **Recovery (2-24 hours):**
   - Generate new hot wallet addresses
   - Update constants.ts with new addresses
   - Deploy updated frontend
   - Transfer funds from cold storage
   - Resume operations

4. **Post-Mortem (1 week):**
   - Document incident
   - Implement additional security measures
   - Notify users if necessary

---

## 📞 Security Contacts

### Internal Team

- **Security Lead**: security@opflow.com
- **On-Call**: +1-XXX-XXX-XXXX
- **Backup**: backup@opflow.com

### External Resources

- **Bug Bounty**: Contact before disclosure
- **Security Researchers**: Responsible disclosure policy

---

## ⚖️ Compliance

### KYC/AML (If Required)

Depending on jurisdiction, you may need:

- User identity verification
- Transaction limits for unverified users
- Suspicious activity reporting
- Customer due diligence

**Recommended Services:**
- Jumio
- Onfido
- Sumsub

### Data Privacy (GDPR)

If serving EU users:
- Privacy policy
- Cookie consent
- Right to be forgotten
- Data export capability

---

## 🎓 Security Training

### For Developers

- Never commit secrets to git
- Use environment variables for sensitive data
- Review dependencies before adding
- Follow secure coding practices
- Regular security training

### For Operations

- Principle of least privilege
- Two-factor authentication required
- Regular password rotation
- Secure communication channels

---

**Remember: Security is not a one-time setup. It's an ongoing process.**

*Stay vigilant. Stay secure.* 🔒
