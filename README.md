# Ahmed Mohamed Portfolio

A bilingual, responsive Next.js portfolio for backend engineering roles and freelance work. Graphite, teal, and coral; dark and light themes; a pixel portrait; scroll reveals; project filters and case studies; an optional tour and a first-visit animated loading screen; a command terminal; hidden packets; and a keyboard/touch mini-game. Sound and ambient audio are off by default. Reduced-motion preferences are respected.

## Run locally

Requires Node.js 20.9 or newer.

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:3000. For the production static build:

```powershell
npm run typecheck
npm run build
npm run preview
```

The static output is in `out/`. `npm start` also serves the production static build.

## Update content

Edit `src/lib/content.ts`. This is the source of profile details, skills, services, and the three CV projects. Project `preview`, `liveUrl`, and `githubUrl` are deliberately null until real assets and destinations are provided. Add screenshots to `public/images/`, then set `preview` to the public path. Missing links are omitted from the interface. No social profiles or outcome statistics have been invented.

Shared components are in `src/components/`. English routes start at `/`; matching Arabic routes start at `/ar/`. All project pages are statically generated from the project data. The résumé includes the updated contact and education details and provides a browser Print / Save PDF action.

## Contact behavior

Contact and hiring forms validate input and prepare an encoded mailto draft. They do not send email, store personal details, or claim delivery. No external form provider, analytics service, API key, or backend is required. A server-backed contact service can be added later.

## Personal files

The original CV and original portrait remain at the project root and are ignored by Git. Only the portrait copy under `public/images/` is served. The original CV still contains its original placeholder fields; the website résumé uses the supplied corrections.

## Accessibility and preferences

Navigation, filters, controls, and forms have labels. Dialogs use the native modal dialog element for keyboard focus containment and return focus on close. The terminal supports keyboard history. The game supports Space, Arrow Up, and touch, and pauses when the tab is hidden. Theme, collected packets, motion preference, and local game records are stored in localStorage. Sound and music do not automatically turn on when returning.

## Hosting

The public repository is https://github.com/ahmedmohammed00/portofolio_site. GitHub Actions builds and deploys `main` to https://ahmedmohammed00.github.io/portofolio_site/ using `.github/workflows/deploy.yml`.

In repository Settings > Pages, the publishing source is **GitHub Actions**. The workflow uses Node.js 24, installs with `npm ci`, builds the static `out/` directory, and deploys it using GitHub's Pages actions. Only the deployment job receives Pages write and OIDC permissions; no deployment secret is stored in the repository.

`NEXT_PUBLIC_BASE_PATH` sets the hosting subdirectory at build time, and `NEXT_PUBLIC_SITE_URL` sets the full site URL for metadata and sitemaps. The workflow obtains both from GitHub Pages. Local development defaults to `/`. Public images and icons use `src/lib/urls.ts`; fonts are imported as CSS and bundled by Next.js. For a custom domain, update the Pages domain and rebuild so these values match.

The earlier private Sites configuration stays local under `.openai/` and is excluded from the GitHub source snapshot.

## Animated loading screen

The loading screen uses a generated transparent sprite sheet with idle, walk, wave, point, thumbs-up, and jump poses. It appears once per browser session and can be replayed from the footer. Enter starts the portfolio when ready; Skip and Escape dismiss immediately. Motion follows the existing reduced-motion setting, and sound remains opt-in. The hero character also waves and gives a thumbs-up when clicked. Asset details and the generation prompt are in [docs/character-animation.md](docs/character-animation.md).
