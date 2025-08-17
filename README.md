# A Job Thing

This project is a frontend job board built with **Vue 3 + Vite + TypeScript + Pinia + Tailwind v4**.  
It consumes the public API at `https://feapi.ajt.my/jobs` and demonstrates reusable UI design, state management, i18n, and deployment to Vercel.

See [.ai-usage.md](./.ai-usage.md) for details on how AI was used.
---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- pnpm / npm / yarn

### Installation
```bash
npm install
npm run dev
```

### Environment Variables
VITE_API_BASE_URL=/api

## Project Structure (Simplified)

```bash
src/
│
├── api/                # Axios instance & API utilities
├── assets/             # Static files
├── components/         # Reusable UI components
├── i18n/               # Internationalization setup
├── pages               # Page-level components mapped to routes
├── router/             # Vue Router configuration
├── stores/             # Pinia stores for global state management
└── types/              # TypeScript types and interfaces

```

### API Proxy
In development we use Vite’s server.proxy to forward /api → https://feapi.ajt.my.

In production (Vercel), Vite’s proxy does not exist.
We added a vercel.json file:

```bash
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://feapi.ajt.my/$1" }
  ]
}
```
So the frontend always calls /api/... → Vercel rewrites it → API server.

### Internationalization
- vue-i18n configured with EN + ID locales.
- Language switcher in header.
- All visible strings moved to src/i18n JSON.

### Deployment
- Deploys on Vercel.
- vercel.json handles proxy rewrites.
- Build command: npm build

## Author

Developed by Rizky Ari

[Linkedin](https://www.linkedin.com/in/rizkyarihar/) | [GitHub](https://github.com/rizkyari)