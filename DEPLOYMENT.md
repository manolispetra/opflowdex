# Opflow Deployment Guide

This guide covers deploying Opflow to production environments.

## 📋 Pre-Deployment Checklist

### 1. Environment Configuration

- [ ] Hot wallet addresses configured in `/lib/constants.ts`
- [ ] Fee percentage verified (default 7%)
- [ ] RPC endpoints tested and working
- [ ] All OP-20 tokens added with correct contract IDs

### 2. Security Audit

- [ ] Hot wallet private keys stored OFFLINE in hardware wallet
- [ ] No private keys in code or environment variables
- [ ] HTTPS enabled on production domain
- [ ] CORS configured properly
- [ ] Rate limiting implemented (backend)

### 3. Performance Optimization

- [ ] Bundle analyzed (`npm run build` and check output)
- [ ] Images optimized
- [ ] Fonts loaded efficiently
- [ ] Cache headers configured

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click "Deploy"

#### Step 3: Configure Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

**Estimated deployment time**: 2-3 minutes

---

### Option 2: Netlify

#### Step 1: Build Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Step 2: Deploy

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

Or use Netlify's web interface:
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Deploy

---

### Option 3: AWS Amplify

#### Step 1: Connect Repository

1. Go to AWS Amplify Console
2. Connect your GitHub/GitLab repository
3. Select branch (usually `main`)

#### Step 2: Build Settings

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

#### Step 3: Deploy

Click "Save and Deploy"

---

### Option 4: Docker + Any Cloud Provider

#### Step 1: Create Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Step 2: Build and Run

```bash
docker build -t opflow .
docker run -p 3000:3000 opflow
```

#### Step 3: Deploy to Cloud

**AWS ECS/Fargate:**
```bash
aws ecr create-repository --repository-name opflow
docker tag opflow:latest YOUR_ECR_URI:latest
docker push YOUR_ECR_URI:latest
```

**Google Cloud Run:**
```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT/opflow
gcloud run deploy opflow --image gcr.io/YOUR_PROJECT/opflow --platform managed
```

**DigitalOcean App Platform:**
1. Connect GitHub repository
2. Select Dockerfile build
3. Deploy

---

### Option 5: Traditional VPS (Ubuntu)

#### Step 1: Set Up Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone your repository
git clone YOUR_REPO
cd opflow-app

# Install dependencies
npm install

# Build
npm run build
```

#### Step 2: Configure PM2

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'opflow',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Start with PM2:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Step 3: Configure Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable HTTPS with Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔒 SSL/HTTPS Configuration

### Cloudflare (Free SSL)

1. Add your domain to Cloudflare
2. Update nameservers at your registrar
3. Enable "Full (Strict)" SSL mode
4. Enable "Always Use HTTPS"

### Let's Encrypt (Self-Hosted)

```bash
sudo certbot certonly --standalone -d yourdomain.com
```

Update your web server to use certificates.

---

## 🌐 CDN Configuration

### Cloudflare CDN (Recommended)

1. Proxy DNS through Cloudflare
2. Enable Auto Minify (JS, CSS, HTML)
3. Enable Brotli compression
4. Set Browser Cache TTL to 1 month
5. Enable Rocket Loader (optional)

### AWS CloudFront

1. Create CloudFront distribution
2. Set origin to your deployment URL
3. Configure caching behaviors
4. Enable compression

---

## 📊 Monitoring & Analytics

### Add Google Analytics

Edit `/app/layout.tsx`:

```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ... existing head content ... */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Add Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
```

Run configuration:

```bash
npx @sentry/wizard@latest -i nextjs
```

---

## 🔧 Environment Variables (If Needed)

Create `.env.local`:

```env
# API Keys (if needed)
NEXT_PUBLIC_COINGECKO_API_KEY=your_key_here

# RPC Endpoints (optional override)
NEXT_PUBLIC_OPNET_RPC=https://mainnet.opnet.org
NEXT_PUBLIC_BASE_RPC=https://mainnet.base.org
```

**⚠️ Never commit `.env.local` to git!**

---

## 🧪 Testing Before Production

### Local Production Build

```bash
npm run build
npm start
```

Test all features:
- [ ] Wallet connections (OP_NET + Base)
- [ ] Token selection
- [ ] Price oracle updates
- [ ] Swap button functionality
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] All links work
- [ ] Hot wallet addresses copy correctly

### Performance Testing

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

Target scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

---

## 🚨 Post-Deployment

### 1. DNS Propagation

Check DNS with:
```bash
dig yourdomain.com
```

May take 24-48 hours to fully propagate.

### 2. Test Production Site

- [ ] Visit https://yourdomain.com
- [ ] Test all wallet connections
- [ ] Verify price updates
- [ ] Check mobile responsiveness
- [ ] Test all links

### 3. Set Up Monitoring

**Uptime Monitoring:**
- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://pingdom.com)

**Performance Monitoring:**
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)

### 4. Backup Strategy

```bash
# Automated daily backups
0 2 * * * cd /path/to/opflow-app && git pull && npm run build
```

---

## 🔄 Update/Maintenance

### Update Deployment

```bash
git pull origin main
npm install
npm run build
pm2 restart opflow  # If using PM2
```

### Vercel (Auto-Deploy)

Just push to GitHub:
```bash
git push origin main
```

Vercel automatically rebuilds and deploys.

---

## 💰 Cost Estimates

### Vercel (Hobby - Free)
- ✅ 100GB bandwidth/month
- ✅ Unlimited sites
- ✅ SSL included
- **Cost**: $0/month

### Vercel Pro
- ✅ 1TB bandwidth
- ✅ Team features
- **Cost**: $20/month

### AWS (t3.small + CloudFront)
- ✅ EC2: ~$15/month
- ✅ CloudFront: ~$5-10/month
- **Total**: ~$20-25/month

### DigitalOcean Droplet
- ✅ 2GB RAM, 1 CPU
- ✅ 50GB SSD
- **Cost**: $12/month

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Site is Slow

1. Enable CDN (Cloudflare)
2. Optimize images
3. Check bundle size: `npm run build` and review output
4. Add loading indicators

### Wallet Not Connecting

- Check browser console
- Verify wallet extensions installed
- Test on different browser
- Check network (OP_NET / Base mainnet)

---

## 📞 Support

For deployment issues:
1. Check this guide
2. Review Next.js deployment docs
3. Contact hosting provider support
4. Open GitHub issue

---

**🎉 Congratulations on deploying Opflow!**

*Remember: This is the frontend only. You'll need to set up backend services for automated transfers and order matching.*
