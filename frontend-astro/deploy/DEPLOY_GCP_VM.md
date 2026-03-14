# Deploy to GCP VM

## Assumptions

- OS: Ubuntu
- domain: `raina-moon.com`, `www.raina-moon.com`
- app path on VM: `/home/APP_USER/portfolio-website`
- Astro app path: `/home/APP_USER/portfolio-website/frontend-astro`
- process port: `4321`

Replace `APP_USER` with the real VM username before using the service file.

## 1. Open firewall in GCP

- Allow `80`
- Allow `443`
- Keep SSH `22` open

## 2. Point DNS

- `A` record for `raina-moon.com` -> VM external IP
- `A` record for `www.raina-moon.com` -> VM external IP

Wait until DNS resolves.

## 3. Install runtime on VM

```bash
sudo apt update
sudo apt install -y nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

## 4. Upload code

```bash
cd /home/APP_USER
git clone <YOUR_REPO_URL> portfolio-website
cd /home/APP_USER/portfolio-website/frontend-astro
npm install
cp .env.production.example .env.production
```

## 5. Set production env

Edit `.env.production`:

```env
HOST=0.0.0.0
PORT=4321
PUBLIC_SITE_URL=https://www.raina-moon.com
```

## 6. Build and smoke test

```bash
cd /home/APP_USER/portfolio-website/frontend-astro
npm run build
source .env.production
npm run start
```

Check:

```bash
curl http://127.0.0.1:4321
```

Stop the process with `Ctrl+C` after the check.

## 7. Install systemd service

Copy and patch the template:

```bash
cd /home/APP_USER/portfolio-website/frontend-astro
sed "s|APP_USER|$USER|g; s|APP_DIR|/home/$USER/portfolio-website|g" \
  deploy/systemd/raina-portfolio.service | sudo tee /etc/systemd/system/raina-portfolio.service > /dev/null
```

Enable service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable raina-portfolio
sudo systemctl start raina-portfolio
sudo systemctl status raina-portfolio
```

Useful logs:

```bash
journalctl -u raina-portfolio -n 100 --no-pager
```

## 8. Install nginx config

```bash
cd /home/APP_USER/portfolio-website/frontend-astro
sudo cp deploy/nginx/raina-moon.conf /etc/nginx/sites-available/raina-moon
sudo ln -sf /etc/nginx/sites-available/raina-moon /etc/nginx/sites-enabled/raina-moon
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Install HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d raina-moon.com -d www.raina-moon.com
```

## 10. Verify

Check these URLs:

- `https://www.raina-moon.com`
- `https://www.raina-moon.com/robots.txt`
- `https://www.raina-moon.com/sitemap.xml`
- `https://www.raina-moon.com/troubleshooting`

## Update later

```bash
cd /home/APP_USER/portfolio-website
git pull origin main
cd frontend-astro
npm install
npm run build
sudo systemctl restart raina-portfolio
```
