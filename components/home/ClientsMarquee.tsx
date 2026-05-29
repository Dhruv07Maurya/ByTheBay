'use client'

// Infinite marquee strip — "Brands we've worked with"
// Uses pure CSS animation (no JS), so it never jitters.

const CLIENTS = [
  { name: 'Hakkasan', type: 'text' },
  { name: 'Estafeta', type: 'text' },
  { name: 'T-Mobile', type: 'text' },
  { name: 'Sental Filmworks', type: 'text' },
  { name: 'Perry Homes', type: 'text' },
  { name: 'Clear Channel', type: 'text' },
  { name: 'Lion Roads', type: 'text' },
  { name: 'AT&T', type: 'text' },
  { name: 'Whiteline', type: 'text' },
  { name: 'Verve Studio', type: 'text' },
  { name: 'Nomad & Co.', type: 'text' },
  { name: 'Dusk Agency', type: 'text' },
]

// Separator glyph between each name
const SEP = '✦'

export function ClientsMarquee() {
  // Duplicate items so the marquee looks seamless
  const items = [...CLIENTS, ...CLIENTS]

  return (
    <div
      style={{
        backgroundColor: '#111111',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '1.25rem',
        paddingBottom: '1.25rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Edge fades */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background:
            'linear-gradient(to right, #111111 0%, transparent 8%, transparent 92%, #111111 100%)',
        }}
      />

      {/* Eyebrow label */}
      {/* <p
        style={{
          position: 'absolute',
          top: '50%',
          left: '1.5rem',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-outfit)',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.85)',
          zIndex: 3,
          whiteSpace: 'nowrap',
        }}
      >
        Trusted by
      </p> */}

      {/* Scrolling track */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '0',
          width: 'max-content',
          animation: 'marquee-scroll 32s linear infinite',
          willChange: 'transform',
        }}
      >
        {items.map((client, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2rem',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              fontFamily: 'var(--font-outfit)',
              fontWeight: 600,
              fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
              letterSpacing: '0.04em',
              color: 'rgba(240,237,230,0.35)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {client.name}
            <span style={{ color: 'rgba(116,79,58,0.5)', fontSize: '0.55rem' }}>{SEP}</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
