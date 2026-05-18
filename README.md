# Sufi Shams Photography

Static photography portfolio for `sufishams.xyz`.

## Publish

Upload this folder to any static host, then point the domain DNS to that host.

- Cloudflare Pages: connect a Git repo or upload the folder, then add `sufishams.xyz` as a custom domain.
- Netlify: drag the folder into Netlify Deploys, then add `sufishams.xyz` under Domain management.
- GitHub Pages: push the folder to a repo, enable Pages, and keep the `CNAME` file.

The site entry point is `index.html`. The photo list is generated in `assets/gallery.js`.

## Porkbun DNS

The current Porkbun parking page means the domain is still using parked/default DNS or has not been connected to hosting yet.

For Netlify, set:

- `A` record for `@` to `75.2.60.5`
- `CNAME` record for `www` to your Netlify site hostname

For Cloudflare Pages, add `sufishams.xyz` as a custom domain in Pages and follow the DNS records Cloudflare provides.
