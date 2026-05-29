'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'Work',    href: '/works' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      <nav className="btb-nav">
        <div className="btb-nav-pill">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`btb-nav-link ${isActive ? 'btb-nav-active' : ''}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <style>{`
        /* ── Floating nav wrapper ── */
        .btb-nav {
          position: fixed;
          bottom: 1.75rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          pointer-events: auto;
        }

        /* ── Glass pill ── */
        .btb-nav-pill {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 5px;
          border-radius: 999px;

          /* Glass effect — warm cream tint to match brand palette */
          background: rgba(26, 18, 8, 0.72);
          backdrop-filter: blur(20px) saturate(1.6);
          -webkit-backdrop-filter: blur(20px) saturate(1.6);

          /* Subtle inner border for glass depth */
          border: 1px solid rgba(240, 237, 230, 0.10);

          /* Premium shadow — warm dark toned */
          box-shadow:
            0 8px 32px rgba(26, 18, 8, 0.45),
            0 2px 8px rgba(26, 18, 8, 0.25),
            inset 0 1px 0 rgba(240, 237, 230, 0.06);

          white-space: nowrap;
          max-width: 94vw;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .btb-nav-pill::-webkit-scrollbar { display: none; }

        /* ── Individual link ── */
        .btb-nav-link {
          display: block;
          font-family: var(--font-outfit), sans-serif;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          color: rgba(200, 184, 154, 0.75);
          text-decoration: none;
          flex-shrink: 0;
          transition:
            background-color 0.22s ease,
            color 0.22s ease;
        }

        /* Hover — warm highlight */
        .btb-nav-link:hover {
          color: #f0ede6;
          background-color: rgba(240, 237, 230, 0.08);
        }

        /* Active — filled warm cream pill */
        .btb-nav-active {
          background-color: #f0ede6 !important;
          color: #1a1208 !important;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(26,18,8,0.18);
        }
        .btb-nav-active:hover {
          background-color: #e8e5de !important;
        }

        /* ── Slightly larger pill on desktop ── */
        @media (min-width: 768px) {
          .btb-nav {
            bottom: 2rem;
          }
          .btb-nav-pill {
            padding: 6px;
            gap: 3px;
          }
          .btb-nav-link {
            font-size: 0.82rem;
            padding: 0.5rem 1.3rem;
          }
        }

        /* ── Tight on very small screens ── */
        @media (max-width: 380px) {
          .btb-nav-link {
            font-size: 0.72rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </>
  )
}

// Keep old export name for compatibility
export function Navigation() {
  return <BottomNav />
}
