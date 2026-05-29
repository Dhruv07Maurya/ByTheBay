# ByTheBay Studio

> **Premium creative studio website** — Brand direction, photography, video editing, and digital growth for emerging brands. Built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, and GSAP.

---

## ✦ Preview

```
Home → Selected Works → Clients Marquee → Services (stacking scroll) → About Philosophy → Process → CTA → Footer
```

Pages: `/` · `/works` · `/about` · `/contact`

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS v4 + Vanilla CSS (inline & style blocks) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com) + ScrollTrigger |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Page Transitions** | Custom GSAP cinematic curtain system |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives) |
| **Fonts** | Google Fonts — Outfit (primary) + Playfair Display (display) |
| **Package Manager** | [pnpm](https://pnpm.io) |
| **Analytics** | Vercel Analytics |

---

## ✦ Features

- **Cinematic page transitions** — GSAP split-curtain wipe on every internal navigation
- **Stacking scroll services** — CSS `sticky` + GSAP ScrollTrigger scale/fade cards
- **Bento grid portfolio** — Hover-blur sibling effect on selected works
- **Infinite marquee** — Pure CSS client logo ticker strip
- **Cartoon character** — SVG figure with cursor-following eyes & hands (About page)
- **Glass floating nav** — Backdrop-blur bottom dock, always visible
- **Squiggly text** — Animated SVG path text distortion
- **Dither shader** — WebGL canvas background on hero
- **Fully responsive** — Mobile-first, tested down to 375px

---

## ✦ Project Structure

```
ByTheBay/
├── app/
│   ├── layout.tsx          # Root layout — fonts, nav, page transitions
│   ├── page.tsx            # Home page
│   ├── about/
│   │   └── page.tsx        # About page with interactive SVG character
│   ├── contact/
│   │   └── page.tsx        # Contact form page
│   ├── works/
│   │   └── page.tsx        # Works/portfolio listing
│   └── globals.css         # Global styles, Tailwind base
│
├── components/
│   ├── Navigation.tsx          # Floating glass bottom nav
│   ├── BarbaProvider.tsx        # GSAP cinematic transition wrapper
│   ├── Footer.tsx              # Site footer
│   ├── LenisScroll.tsx         # Lenis smooth scroll initialiser
│   ├── home/
│   │   ├── HeroSection.tsx         # Hero with dither shader + squiggly text
│   │   ├── SelectedWorksSection.tsx # Bento grid portfolio with hover-blur
│   │   ├── ClientsMarquee.tsx      # Infinite client logo ticker
│   │   ├── ServicesSection.tsx     # Stacking scroll service cards
│   │   ├── AboutPhilosophySection.tsx
│   │   ├── ProcessSection.tsx
│   │   └── CTASection.tsx
│   └── ui/
│       ├── dither-shader.tsx       # WebGL dither background
│       ├── squiggly-text.tsx       # Animated SVG text
│       ├── floating-dock.tsx       # Floating dock component
│       └── ...                    # shadcn/ui components
│
├── styles/
│   └── globals.css
│
├── public/                     # Static assets (icons, images)
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── components.json             # shadcn/ui config
└── package.json
```

---

## ✦ Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Cream | `#f0ede6` | Page background, light card bg |
| Espresso | `#2b160a` | Primary dark, active states |
| Deep Dark | `#1a1208` | Darkest backgrounds, nav |
| Brown | `#744f3a` | Accent, eyebrow labels |
| Warm Muted | `#a89880` | Secondary text |
| Dark Text | `#111111` | Primary heading text |

---

## ✦ Prerequisites

Make sure you have the following installed:

- **Node.js** `≥ 18.17.0` — [nodejs.org](https://nodejs.org)
- **pnpm** `≥ 8` — [pnpm.io/installation](https://pnpm.io/installation)

```bash
# Install pnpm globally if you don't have it
npm install -g pnpm
```

---

## ✦ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ByTheBay.git
cd ByTheBay
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root (copy from the example):

```bash
cp .env.example .env.local
```

> Currently the project has no required environment variables. This file is for future API keys (e.g. email service, CMS).

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
pnpm build
pnpm start
```

---

## ✦ Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build optimised production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint across the project |

---

## ✦ Adding shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com). To add new components:

```bash
npx shadcn@latest add [component-name]

# Examples
npx shadcn@latest add button
npx shadcn@latest add dialog
```

Components are installed to `components/ui/`.

---

## ✦ Adding New Pages

1. Create a folder under `app/` (e.g. `app/blog/`)
2. Add a `page.tsx` file with a default export
3. The page automatically gets the global layout (nav, transitions, fonts)

```tsx
// app/blog/page.tsx
export default function BlogPage() {
  return <main>...</main>
}
```

---

## ✦ Customising the Client Marquee

Edit the `CLIENTS` array in [`components/home/ClientsMarquee.tsx`](./components/home/ClientsMarquee.tsx):

```tsx
const CLIENTS = [
  { name: 'Your Brand Name', type: 'text' },
  // ...
]
```

---

## ✦ Customising Services

Edit the `SERVICES` array in [`components/home/ServicesSection.tsx`](./components/home/ServicesSection.tsx) to update service titles, descriptions, tags, and colours.

---

## ✦ Customising Portfolio Works

Edit the `works` array in [`components/home/SelectedWorksSection.tsx`](./components/home/SelectedWorksSection.tsx):

```tsx
const works = [
  {
    id: 1,
    title: 'Project Name',
    category: 'Category',
    year: '2025',
    image: 'https://your-image-url.com/image.jpg',
    link: '/works/project-slug',
  },
  // ...
]
```

---

## ✦ Deployment

### Deploy to Vercel (recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual deployment

```bash
pnpm build
# Output is in .next/ — deploy using any Node.js host
```

---

## ✦ Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari ≥ 15 | ✅ Full (`backdrop-filter` supported) |
| Safari < 15 | ⚠️ Nav blur degrades gracefully |
| Mobile (iOS/Android) | ✅ Fully responsive |

---

## ✦ License

This project is proprietary. All rights reserved — ByTheBay Studio.

---

## ✦ Contact

**ByTheBay Studio**
📧 [hello@bythebay.studio](mailto:hello@bythebay.studio)
📍 San Francisco Bay Area, CA

---

*Built with care, coffee, and a lot of GSAP. ✦*
