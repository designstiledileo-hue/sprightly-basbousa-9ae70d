import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: StileDiLeo,
})

/* ─── Data ─── */
const PORTFOLIO_IMAGES = [
  'https://static.wixstatic.com/media/c87bb4_8fb3bbc25b404a75bbbf6907011c263d~mv2.jpg',
  'https://static.wixstatic.com/media/c87bb4_0ad93797a26144faa0bace6e4192079c~mv2.png',
  'https://static.wixstatic.com/media/c87bb4_7ac9ccd470d547689fcc34c89c88eeaf~mv2.png',
  'https://static.wixstatic.com/media/c87bb4_62790752281d42bd94ac2d411f8e283c~mv2.png',
  'https://static.wixstatic.com/media/c87bb4_2abf1e6e1a564bb1b0f42bdc581473df~mv2.png',
]

const SERVICES = [
  {
    title: 'Venetian Plaster',
    subtitle: 'Timeless Elegance',
    description:
      'Authentic Italian lime-based plaster applied by hand, creating luminous depth and movement. Each surface tells a unique story through layers of translucent color.',
  },
  {
    title: 'Stone & Rock Textures',
    subtitle: 'Natural Grandeur',
    description:
      'Meticulously crafted stone and rock-effect finishes that bring the raw beauty of natural formations into your interior spaces with stunning realism.',
  },
  {
    title: 'Metallic & Marble Finishes',
    subtitle: 'Refined Opulence',
    description:
      'Shimmering metallic veining and polished marble effects that catch light and transform walls into sculptural masterpieces of contemporary luxury.',
  },
]

const PROCESS_STEPS = [
  { letter: 'A', title: 'Consultation', desc: 'We meet to understand your vision, space, and aesthetic goals. Every project begins with listening.' },
  { letter: 'B', title: 'Samples', desc: 'Custom samples crafted on-site so you can see and feel the finish in your own lighting and environment.' },
  { letter: 'C', title: 'Craftsmanship', desc: 'Skilled artisans hand-apply each layer with precision, building depth and character into every surface.' },
  { letter: 'D', title: 'Reveal', desc: 'The final unveiling — walls transformed into works of art that will inspire for years to come.' },
]

const TESTIMONIALS = [
  { name: 'Adriana M.', location: 'West Vancouver', text: 'Stile di Leo transformed our living room into something out of an Italian palazzo. The Venetian plaster has this incredible depth — it changes with the light throughout the day. Absolutely breathtaking work.' },
  { name: 'James & Claire T.', location: 'Kitsilano', text: 'From the first consultation to the final reveal, the level of professionalism and artistry was extraordinary. Our feature wall is now the centrepiece of every conversation when guests visit.' },
  { name: 'Sofia R.', location: 'Yaletown', text: 'We hired Stile di Leo for our boutique hotel lobby and the result exceeded every expectation. The stone texture finish is so realistic that guests constantly reach out to touch it. True masters of their craft.' },
]

/* ─── Main Component ─── */
function StileDiLeo() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  /* Scroll reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Navbar scroll effect */
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 80) {
          navRef.current.classList.add('nav-scrolled')
        } else {
          navRef.current.classList.remove('nav-scrolled')
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Custom cursor */
  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`
        cursorRef.current.style.top = `${mouseY}px`
      }
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringX}px`
        cursorRingRef.current.style.top = `${ringY}px`
      }
      requestAnimationFrame(animateRing)
    }

    const handleEnterInteractive = () => {
      cursorRef.current?.classList.add('cursor-hover')
      cursorRingRef.current?.classList.add('cursor-ring-hover')
    }
    const handleLeaveInteractive = () => {
      cursorRef.current?.classList.remove('cursor-hover')
      cursorRingRef.current?.classList.remove('cursor-ring-hover')
    }

    window.addEventListener('mousemove', moveCursor)
    const frameId = requestAnimationFrame(animateRing)

    const interactives = document.querySelectorAll('a, button, .service-card, .gallery-item, .testimonial-card')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnterInteractive)
      el.addEventListener('mouseleave', handleLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(frameId)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnterInteractive)
        el.removeEventListener('mouseleave', handleLeaveInteractive)
      })
    }
  }, [])

  /* Parallax hero */
  useEffect(() => {
    const hero = document.getElementById('hero-bg')
    const handleScroll = () => {
      if (hero) {
        const scrolled = window.scrollY
        hero.style.transform = `scale(1) translateY(${scrolled * 0.35}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* 3D card tilt */
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / centerY * -8
    const rotateY = (x - centerX) / centerX * 8
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }, [])

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page-wrapper">
      {/* Custom Cursor */}
      <div ref={cursorRef} style={{
        position: 'fixed', width: '8px', height: '8px', background: '#b8965a',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%, -50%)', transition: 'width 0.3s, height 0.3s, background 0.3s',
      }} className="cursor-dot hidden md:block" />
      <div ref={cursorRingRef} style={{
        position: 'fixed', width: '36px', height: '36px', border: '1.5px solid rgba(184,150,90,0.5)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%, -50%)', transition: 'width 0.3s, height 0.3s, border-color 0.3s',
      }} className="cursor-ring hidden md:block" />

      <style>{`
        .cursor-hover { width: 14px !important; height: 14px !important; background: rgba(184,150,90,0.6) !important; }
        .cursor-ring-hover { width: 50px !important; height: 50px !important; border-color: rgba(184,150,90,0.8) !important; }
        .nav-scrolled { background: rgba(20,18,16,0.85) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(184,150,90,0.1) !important; }

        .service-card { position: relative; overflow: hidden; transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .service-card .service-overlay {
          position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(20,18,16,0.95) 100%);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem;
          opacity: 0; transition: opacity 0.5s ease;
        }
        .service-card:hover .service-overlay { opacity: 1; }
        .service-card .service-title-bar {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem 2rem;
          background: linear-gradient(transparent, rgba(20,18,16,0.9));
          transition: opacity 0.5s ease;
        }
        .service-card:hover .service-title-bar { opacity: 0; }

        .gallery-item { flex: 1; min-width: 0; transition: flex 0.6s cubic-bezier(0.16,1,0.3,1); overflow: hidden; }
        .gallery-item:hover { flex: 2.5; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .gallery-item:hover img { transform: scale(1.05); }

        .testimonial-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease; }
        .testimonial-card:hover { transform: translateY(-12px); box-shadow: 0 20px 60px rgba(184,150,90,0.1); }

        .hero-image { animation: heroZoom 2s cubic-bezier(0.16,1,0.3,1) forwards; }

        .gold-gradient {
          background: linear-gradient(90deg, #8a6f3e, #b8965a, #d4b07a, #b8965a, #8a6f3e);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .marquee-strip {
          display: flex;
          animation: marqueeScroll 25s linear infinite;
        }

        .mosaic-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(2, 280px);
          gap: 12px;
        }
        .mosaic-grid .mosaic-item:nth-child(1) { grid-column: span 5; }
        .mosaic-grid .mosaic-item:nth-child(2) { grid-column: span 4; }
        .mosaic-grid .mosaic-item:nth-child(3) { grid-column: span 3; }
        .mosaic-grid .mosaic-item:nth-child(4) { grid-column: span 7; }
        .mosaic-grid .mosaic-item:nth-child(5) { grid-column: span 5; }
        .mosaic-item { overflow: hidden; border-radius: 8px; position: relative; }
        .mosaic-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .mosaic-item:hover img { transform: scale(1.08); }

        @media (max-width: 768px) {
          .mosaic-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
          .mosaic-grid .mosaic-item { grid-column: span 1 !important; height: 220px; }
          .mosaic-grid .mosaic-item:last-child { grid-column: span 2 !important; }
          .gallery-strip { flex-direction: column !important; height: auto !important; }
          .gallery-item { height: 200px !important; flex: none !important; }
          .gallery-item:hover { flex: none !important; }
          * { cursor: auto !important; }
        }

        .process-line { position: relative; }
        .process-line::before {
          content: ''; position: absolute; top: 32px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(184,150,90,0.3), transparent);
        }
      `}</style>

      {/* ─── Fixed Navigation ─── */}
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.25rem 2rem', transition: 'all 0.4s ease',
        background: 'transparent', borderBottom: '1px solid transparent',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
            background: 'none', border: 'none', color: '#b8965a', fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.05em', padding: 0,
          }}>
            Stile di Leo
          </button>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden md:flex">
            {[
              ['about', 'About'],
              ['services', 'Services'],
              ['portfolio', 'Portfolio'],
              ['process', 'Process'],
              ['testimonials', 'Testimonials'],
              ['contact', 'Contact'],
            ].map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)} style={{
                background: 'none', border: 'none', color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 400,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                transition: 'color 0.3s', padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#b8965a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div id="hero-bg" className="hero-image" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${PORTFOLIO_IMAGES[0]})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,18,16,0.5) 0%, rgba(20,18,16,0.7) 50%, rgba(20,18,16,0.95) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem', maxWidth: '900px' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.5rem',
            animation: 'fadeInUp 1s ease 0.3s both',
          }}>
            Venetian Plaster Artisans — Vancouver, BC
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 300, lineHeight: 1.1, margin: '0 0 1.5rem',
            animation: 'fadeInUp 1s ease 0.5s both',
          }}>
            Walls Become<br />
            <span className="gold-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>Works of Art</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 300,
            color: 'var(--color-text-muted)', maxWidth: '550px', margin: '0 auto 2.5rem',
            lineHeight: 1.8, animation: 'fadeInUp 1s ease 0.7s both',
          }}>
            Handcrafted decorative plaster finishes that transform Vancouver's finest
            interiors into timeless works of art.
          </p>
          <button onClick={() => scrollToSection('contact')} style={{
            animation: 'fadeInUp 1s ease 0.9s both',
            background: 'transparent', border: '1px solid #b8965a', color: '#b8965a',
            fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.25em', textTransform: 'uppercase', padding: '1rem 2.5rem',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#b8965a'; e.currentTarget.style.color = '#141210'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b8965a'; }}
          >
            Start Your Project
          </button>
        </div>
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          animation: 'fadeIn 1s ease 1.5s both',
        }}>
          <div style={{
            width: '1px', height: '60px', background: 'linear-gradient(180deg, #b8965a, transparent)',
            margin: '0 auto',
          }} />
        </div>
      </section>

      {/* ─── Gold Marquee Strip ─── */}
      <section style={{ overflow: 'hidden', padding: '1.25rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="marquee-strip">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '0' }}>
              {['Venetian Plaster', 'Stone Textures', 'Marble Finishes', 'Vancouver BC'].map((text, j) => (
                <span key={j} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 400,
                    color: '#b8965a', letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '0 1rem',
                  }}>{text}</span>
                  <span style={{ color: 'rgba(184,150,90,0.3)', fontSize: '0.5rem', padding: '0 0.5rem' }}>&#9670;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" style={{ padding: 'clamp(5rem, 10vw, 10rem) 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center' }}>
          <div className="reveal" style={{ flex: '1 1 400px', minWidth: '300px' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '3/4', position: 'relative' }}>
              <img src={PORTFOLIO_IMAGES[1]} alt="Stile di Leo craftsman at work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 60%, rgba(20,18,16,0.4) 100%)',
              }} />
            </div>
          </div>
          <div className="reveal" style={{ flex: '1 1 400px', minWidth: '300px' }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#b8965a', marginBottom: '1rem',
            }}>About Stile di Leo</p>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300, lineHeight: 1.2, marginBottom: '1.5rem',
            }}>
              Where Italian Tradition Meets<br />
              <span style={{ fontStyle: 'italic', color: '#b8965a' }}>Vancouver Vision</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Stile di Leo brings generations of Italian plaster craftsmanship to the Pacific Northwest.
              Every surface we create is a collaboration between time-honoured techniques and contemporary
              design sensibility — applied entirely by hand, layer by luminous layer.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, fontSize: '0.95rem' }}>
              Based in Vancouver, BC, we work with homeowners, designers, and architects
              who refuse to settle for ordinary walls. Our artisans transform spaces into immersive
              experiences — surfaces that don't just decorate, but captivate.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '3rem' }}>
              {[['10+', 'Years Experience'], ['200+', 'Projects Completed'], ['100%', 'Handcrafted']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#b8965a', fontWeight: 300 }}>{num}</div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '0.25rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="services" style={{ padding: 'clamp(5rem, 10vw, 10rem) 2rem', background: 'var(--color-bg-light)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1rem' }}>
              Our Services
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300 }}>
              Artistry in Every <span style={{ fontStyle: 'italic', color: '#b8965a' }}>Finish</span>
            </h2>
          </div>
          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {SERVICES.map((service, i) => (
              <div key={i} className="reveal service-card" style={{
                height: '420px', borderRadius: '8px', background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              >
                <div style={{
                  width: '100%', height: '100%',
                  backgroundImage: `url(${PORTFOLIO_IMAGES[i + 2]})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  borderRadius: '8px',
                }} />
                <div className="service-title-bar">
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '0.5rem' }}>
                    {service.subtitle}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 400, margin: 0 }}>
                    {service.title}
                  </h3>
                </div>
                <div className="service-overlay">
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '0.5rem' }}>
                    {service.subtitle}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.75rem' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Portfolio Mosaic ─── */}
      <section id="portfolio" style={{ padding: 'clamp(5rem, 10vw, 10rem) 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1rem' }}>
            Portfolio
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300 }}>
            A Gallery of <span style={{ fontStyle: 'italic', color: '#b8965a' }}>Distinction</span>
          </h2>
        </div>
        <div className="reveal mosaic-grid">
          {PORTFOLIO_IMAGES.map((img, i) => (
            <div key={i} className="mosaic-item">
              <img src={img} alt={`Stile di Leo portfolio piece ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Horizontal Gallery Strip ─── */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto 0' }}>
        <div className="reveal gallery-strip" style={{ display: 'flex', height: '350px', gap: '6px', borderRadius: '8px', overflow: 'hidden' }}>
          {[...PORTFOLIO_IMAGES, PORTFOLIO_IMAGES[0]].map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img} alt={`Gallery image ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Process Section ─── */}
      <section id="process" style={{ padding: 'clamp(5rem, 10vw, 10rem) 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1rem' }}>
            Our Process
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300 }}>
            From Vision to <span style={{ fontStyle: 'italic', color: '#b8965a' }}>Masterpiece</span>
          </h2>
        </div>
        <div className="stagger-children process-line" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="reveal" style={{ textAlign: 'center', padding: '0 1rem' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%', border: '1px solid rgba(184,150,90,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#b8965a', fontWeight: 300,
                background: 'var(--color-bg)',
                position: 'relative', zIndex: 1,
              }}>{step.letter}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.75rem' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" style={{ padding: 'clamp(5rem, 10vw, 10rem) 2rem', background: 'var(--color-bg-light)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1rem' }}>
              Testimonials
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300 }}>
              Words from Our <span style={{ fontStyle: 'italic', color: '#b8965a' }}>Clients</span>
            </h2>
          </div>
          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal testimonial-card" style={{
                padding: '2.5rem', borderRadius: '8px', background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{ color: '#b8965a', fontFamily: 'var(--font-heading)', fontSize: '3rem', lineHeight: 1, marginBottom: '1rem' }}>"</div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  {t.text}
                </p>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.25rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#b8965a', letterSpacing: '0.1em' }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section id="contact" style={{
        position: 'relative', padding: 'clamp(6rem, 12vw, 12rem) 2rem', textAlign: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${PORTFOLIO_IMAGES[4]})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,16,0.85)' }} />
        <div className="reveal" style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1rem' }}>
            Begin Your Transformation
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Let's Create Something{' '}
            <span style={{ fontStyle: 'italic', color: '#b8965a' }}>Extraordinary</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Every masterpiece starts with a conversation. Tell us about your space,
            your vision, and let us bring it to life.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="tel:+16047732298" style={{
              background: '#b8965a', color: '#141210', fontFamily: 'var(--font-body)',
              fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '1rem 2.5rem', textDecoration: 'none', transition: 'all 0.4s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#d4b07a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#b8965a'; }}
            >
              Call Now
            </a>
            <a href="mailto:designstiledileo@gmail.com" style={{
              background: 'transparent', border: '1px solid #b8965a', color: '#b8965a',
              fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase', padding: '1rem 2.5rem',
              textDecoration: 'none', transition: 'all 0.4s ease', display: 'inline-block',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#b8965a'; e.currentTarget.style.color = '#141210'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b8965a'; }}
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ padding: '5rem 2rem 3rem', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', marginBottom: '4rem' }}>
            {/* Brand */}
            <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#b8965a', fontWeight: 400, marginBottom: '1rem' }}>
                Stile di Leo
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '350px' }}>
                Luxury decorative plaster and Venetian plaster artisans, serving Vancouver, BC and the surrounding areas.
              </p>
            </div>
            {/* Quick Links */}
            <div style={{ flex: '0 1 auto' }}>
              <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.25rem' }}>Navigate</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['About', 'Services', 'Portfolio', 'Process', 'Testimonials'].map((link) => (
                  <button key={link} onClick={() => scrollToSection(link.toLowerCase())} style={{
                    background: 'none', border: 'none', color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300,
                    textAlign: 'left', padding: 0, transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#b8965a')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            {/* Services */}
            <div style={{ flex: '0 1 auto' }}>
              <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.25rem' }}>Services</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Venetian Plaster', 'Stone Textures', 'Marble Finishes', 'Metallic Effects', 'Custom Finishes'].map((s) => (
                  <span key={s} style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 300 }}>{s}</span>
                ))}
              </div>
            </div>
            {/* Contact */}
            <div style={{ flex: '0 1 auto' }}>
              <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '1.25rem' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="tel:+16047732298" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#b8965a')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  +1 (604) 773-2298
                </a>
                <a href="mailto:designstiledileo@gmail.com" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#b8965a')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  designstiledileo@gmail.com
                </a>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 300 }}>
                  Vancouver, BC, Canada
                </span>
              </div>
            </div>
          </div>
          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid var(--color-border)', paddingTop: '2rem',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
          }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 300 }}>
              &copy; {new Date().getFullYear()} Stile di Leo. All rights reserved.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 300, fontStyle: 'italic' }}>
              Crafted with passion in Vancouver, BC
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
