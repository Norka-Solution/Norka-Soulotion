# Norka — one identity

Every Norka product (this website, the ERP web + mobile app, Norka AI) shares this identity.

| | |
|---|---|
| Logo | `logo-blue.png` (light screens) / `logo-white.png` (dark screens) — the plain gear-and-brain mark, no background or tile. `logo.png` / `logo.svg` are the website's round icon |
| Primary | Norka blue `#3B62FC` (hover `#2848D8`) |
| Dark background | `#060B18` · surface `#0D1424` |
| Light background | `#FFFFFF` · surface `#F5F7FF` |
| Font | Cairo — Arabic and English, in every product (the website adds Geist for English marketing text) |
| Corners | 10px base radius |

## Changing the identity
1. Edit `tokens.json` (and the logo files) — nowhere else.
2. Run `zsh brand/sync.sh` — it builds `dist/` and copies it into:
   - `Norka-ERP-Frontend/styles/tokens/norka-brand.css`
   - `Norka-Assistant/web/src/brand/` (CSS + logo)
   - `Norka-Mobile-Platform/constants/norka-brand.ts`
3. Commit in each product. Web releases go live on deploy; the mobile app picks it up with the next OTA update.

A customer company's own logo and colour (set in the ERP) still override the Norka blue inside that company's ERP and assistant.
