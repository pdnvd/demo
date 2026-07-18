import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'forma',
    number: '01',
    title: 'forma.noir',
    type: 'OBJECTS / 3D / WORLD BUILDING',
    year: '2024—NOW',
    color: '#ff5a1f',
    phrase: 'DESIGN CONTRABAND',
    description: 'Objetos raros, art toys y piezas impresas en 3D construidas como artefactos de un mismo universo.',
  },
  {
    id: 'unfc',
    number: '02',
    title: 'UNOFFICIAL FC',
    type: 'FOOTBALL / FASHION / CULTURE',
    year: '2026',
    color: '#2155ff',
    phrase: 'THE GAME AROUND THE GAME',
    description: 'Una plataforma cultural donde fútbol, moda, rituales, ciudades y nostalgia forman una nueva grada global.',
  },
  {
    id: 'ynv',
    number: '03',
    title: 'YA NO VALES',
    type: 'AI / CONTENT / EDUCATION',
    year: '2026',
    color: '#f0a12e',
    phrase: 'ADAPT OR DISAPPEAR',
    description: 'IA práctica, directa y sin humo. Una identidad editorial diseñada para convertir información en acción.',
  },
  {
    id: 'sereno',
    number: '04',
    title: 'EL SERENO',
    type: 'IP / CHARACTER / CINEMA',
    year: '2026',
    color: '#ffb24c',
    phrase: 'MADRID HAS A NIGHT WATCHMAN',
    description: 'Un vigilante nocturno nacido del folclore de Madrid, contado con lenguaje de animación 3D y cómic contemporáneo.',
  },
]

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Madrid' }).format(new Date()))
    update()
    const timer = setInterval(update, 30000)
    return () => clearInterval(timer)
  }, [])
  return time
}

function useScrollExperience() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.set('.hero h1 span', { transformOrigin: '50% 100%' })
      gsap.from('.hero h1 span', { yPercent: 115, rotate: 3, opacity: 0, duration: 1.25, stagger: .1, ease: 'power4.out', delay: .12 })
      gsap.from('.hero-kicker, .hero-intro, .scroll-link', { y: 18, opacity: 0, duration: .8, stagger: .1, delay: .65 })
      gsap.from('.hero-object', { scale: .55, rotate: -25, opacity: 0, duration: 1.5, delay: .25, ease: 'expo.out' })

      gsap.to('.hero h1 span:nth-child(1)', { xPercent: -9, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } })
      gsap.to('.hero h1 span:nth-child(2)', { xPercent: 11, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } })
      gsap.to('.hero h1 span:nth-child(3)', { xPercent: -6, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } })
      gsap.to('.hero-object', { yPercent: 48, rotate: 22, scale: .72, opacity: .35, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })

      gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: .2 } })

      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, { y: 130, opacity: 0, rotate: i % 2 ? 1.8 : -1.8, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' } })
        gsap.fromTo(card.querySelector('.art'), { clipPath: 'inset(9% 7% 9% 7%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'center center', scrub: .8 } })
        gsap.to(card.querySelector('.aura'), { yPercent: i % 2 ? -8 : 8, rotate: i % 2 ? -2 : 2, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 } })
      })

      gsap.fromTo('.manifesto > p', { scale: .74, rotate: -2, opacity: .25 }, { scale: 1, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'center center', scrub: 1 } })
      gsap.from('.agency-title span:first-child', { xPercent: -25, opacity: 0, scrollTrigger: { trigger: '.agency-title', start: 'top 85%', end: 'top 45%', scrub: 1 } })
      gsap.from('.agency-title span:last-child', { xPercent: 25, opacity: 0, scrollTrigger: { trigger: '.agency-title', start: 'top 85%', end: 'top 45%', scrub: 1 } })
      gsap.to('.agency-3d .aura', { scale: 1.3, rotate: 12, scrollTrigger: { trigger: '.agency-3d', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      gsap.from('.services > div', { xPercent: -8, opacity: 0, stagger: .08, scrollTrigger: { trigger: '.services', start: 'top 82%' } })
      gsap.from('.contact > a span:first-child', { xPercent: -18, opacity: 0, scrollTrigger: { trigger: '.contact', start: 'top 70%', end: 'center center', scrub: 1 } })
      gsap.from('.contact > a span:last-child', { xPercent: 18, opacity: 0, scrollTrigger: { trigger: '.contact', start: 'top 70%', end: 'center center', scrub: 1 } })
    })
    return () => ctx.revert()
  }, [])
}

function Aura({ variant }) {
  return <div className={`aura aura-${variant}`} aria-hidden="true"><i /><i /><i /></div>
}

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let x = 0, y = 0, rx = 0, ry = 0, frame
    const move = e => { x = e.clientX; y = e.clientY; dot.current.style.transform = `translate(${x}px,${y}px)` }
    const loop = () => {
      rx += (x - rx) * .14; ry += (y - ry) * .14
      ring.current.style.transform = `translate(${rx}px,${ry}px)`
      frame = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move); loop()
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame) }
  }, [])
  return <><div ref={dot} className="cursor-dot"/><div ref={ring} className="cursor-ring"/></>
}

function ProjectArt({ id }) {
  if (id === 'forma') return (
    <div className="art art-forma">
      <Aura variant="forma" />
      <div className="hazard">OBJECT_004&nbsp;&nbsp; / &nbsp;&nbsp;DO NOT DUPLICATE</div>
      <div className="chrome-object"><span /></div>
      <div className="pedestal">FN<br/><small>1/1</small></div>
      <div className="art-word">NOIR</div>
    </div>
  )
  if (id === 'unfc') return (
    <div className="art art-unfc">
      <Aura variant="unfc" />
      <div className="pitch-lines" />
      <div className="ball"><i/><i/><i/></div>
      <div className="un-word">UN<br/>OFFICIAL</div>
      <div className="score">90:00&nbsp;&nbsp; CULTURE WINS</div>
    </div>
  )
  if (id === 'ynv') return (
    <div className="art art-ynv">
      <Aura variant="ynv" />
      <div className="ynv-ticker">WORK IS CHANGING — KEEP MOVING — </div>
      <div className="ynv-type">YA<br/>NO<br/><span>VALES</span></div>
      <div className="ynv-bar" />
      <div className="ynv-seal">YNV<br/><small>VOL.01</small></div>
    </div>
  )
  return (
    <div className="art art-sereno">
      <Aura variant="sereno" />
      <div className="moon" />
      <div className="city"><i/><i/><i/><i/><i/></div>
      <div className="watchman"><span className="hat"/><span className="head"/><span className="coat"/><span className="lamp"/></div>
      <div className="comic-rays" />
      <div className="sereno-type">EL<br/>SERENO</div>
    </div>
  )
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <article className={`project-card card-${project.id}`} onClick={() => onOpen(project)} tabIndex="0" onKeyDown={e => e.key === 'Enter' && onOpen(project)}>
      <div className="card-top"><span>{project.number}</span><span>{project.year}</span></div>
      <ProjectArt id={project.id} />
      <div className="card-meta">
        <div><h3>{project.title}</h3><p>{project.type}</p></div>
        <button aria-label={`Abrir ${project.title}`}>↗</button>
      </div>
      <span className="card-index">0{index + 1}</span>
    </article>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    document.body.classList.add('modal-open')
    const esc = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', esc) }
  }, [project, onClose])
  if (!project) return null
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="modal-close" onClick={onClose}>CLOSE <span>×</span></button>
      <div className="modal-art"><ProjectArt id={project.id}/></div>
      <div className="modal-copy">
        <p className="eyebrow">{project.number} / SELECTED UNIVERSE</p>
        <h2>{project.title}</h2>
        <h3>{project.phrase}</h3>
        <p>{project.description}</p>
        <div className="modal-data"><span>ROLE<br/><b>CONCEPT / ART DIRECTION</b></span><span>DISCIPLINE<br/><b>{project.type}</b></span></div>
      </div>
    </div>
  )
}

function App() {
  useScrollExperience()
  const time = useClock()
  const [project, setProject] = useState(null)
  const [menu, setMenu] = useState(false)
  const year = new Date().getFullYear()
  return (
    <>
      <div className="scroll-progress" />
      <Cursor />
      <header className="nav">
        <a className="logo" href="#top" aria-label="P.DNVD inicio">P.<span>DNVD</span><sup>®</sup></a>
        <div className="nav-center">INDEPENDENT CREATIVE STUDIO<br/>MADRID — {time}</div>
        <nav className={menu ? 'open' : ''}>
          <a href="#work" onClick={() => setMenu(false)}>WORK</a>
          <a href="#about" onClick={() => setMenu(false)}>ABOUT</a>
          <a href="#contact" onClick={() => setMenu(false)}>CONTACT</a>
        </nav>
        <button className="menu-button" onClick={() => setMenu(!menu)}>{menu ? 'CLOSE' : 'MENU'}</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-kicker"><span>ONE-PERSON CREATIVE AGENCY</span><span>FILM + 3D + CULTURE</span></div>
          <h1><span>BUILDING</span><span>WORLDS</span><span>NOT <em>NOISE.</em></span></h1>
          <div className="hero-object"><Aura variant="hero"/><span className="object-label">LIGHT STUDY / 001</span></div>
          <p className="hero-intro">Concepto, diseño y movimiento para ideas que necesitan convertirse en <b>universos.</b></p>
          <a className="scroll-link" href="#work"><i/> SCROLL TO EXPLORE</a>
        </section>

        <div className="studio-ticker"><div>P.DNVD STUDIO — CREATIVE DIRECTION — CGI — FILM — BRAND WORLDS — AI ART DIRECTION — P.DNVD STUDIO — CREATIVE DIRECTION — CGI — FILM — BRAND WORLDS —&nbsp;</div></div>

        <section id="work" className="work">
          <div className="section-head"><p>SELECTED WORLDS <sup>04</sup></p><p>2024—2026</p></div>
          <div className="project-grid">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={setProject}/>) }
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-side">( APPROACH )</div>
          <p>I DON'T JUST MAKE<br/>THINGS <span>LOOK GOOD.</span><br/>I MAKE THEM <em>MEAN</em><br/>SOMETHING.</p>
          <div className="manifesto-note">Strategy before styling.<br/>Culture before trend.<br/>World before asset.</div>
        </section>

        <section className="agency">
          <div className="section-head"><p>THE STUDIO</p><p>SMALL STRUCTURE / BIG OUTPUT</p></div>
          <div className="agency-title"><span>A CREATIVE AGENCY</span><span>BUILT AROUND <em>ONE</em> VISION.</span></div>
          <div className="agency-grid">
            <div className="agency-3d"><Aura variant="agency"/><b>P/D</b><small>PERMANENTLY<br/>IN DEVELOPMENT</small></div>
            <div className="agency-copy"><p>P.DNVD funciona como una agencia creativa independiente: una dirección clara y una red de colaboradores que escala según cada proyecto.</p><p>Sin capas innecesarias. Del concepto a la pieza final sin perder la intención por el camino.</p></div>
            <ol><li><span>01</span>DISCOVER<br/><small>Context, tension, opportunity.</small></li><li><span>02</span>DEFINE<br/><small>One sharp creative territory.</small></li><li><span>03</span>BUILD<br/><small>Identity, image, motion, world.</small></li></ol>
          </div>
        </section>

        <section id="about" className="about">
          <div className="section-head inverse"><p>PROFILE</p><p>MADRID / AVAILABLE WORLDWIDE</p></div>
          <div className="about-grid">
            <h2>P.DNVD IS AN INDEPENDENT<br/>CREATIVE FOCUSED ON<br/><span>VISUAL CULTURE.</span></h2>
            <div className="about-copy">
              <p>Trabajo entre dirección creativa, audiovisual, diseño, 3D e inteligencia artificial. Construyo marcas, campañas e historias con una identidad que se reconoce antes de leer el logo.</p>
              <p>Mi terreno natural es donde chocan moda, deporte, cine, cultura digital y objetos.</p>
            </div>
          </div>
          <div className="services">
            {['CREATIVE DIRECTION','BRAND WORLDS','FILM & MOTION','3D / CGI','AI ART DIRECTION'].map((s, i) => <div key={s}><span>0{i+1}</span><b>{s}</b><i>↗</i></div>)}
          </div>
        </section>

        <section id="contact" className="contact">
          <p className="eyebrow">HAVE A PROJECT OR A STRANGE IDEA?</p>
          <a href="mailto:hello@pdnvd.com"><span>LET'S MAKE</span><span>SOMETHING <em>REAL.</em></span></a>
          <div className="contact-foot"><p>MADRID, SPAIN<br/>OPEN FOR SELECTED PROJECTS</p><p><a href="https://instagram.com/p.dnvd" target="_blank" rel="noreferrer">INSTAGRAM ↗</a><br/><a href="mailto:hello@pdnvd.com">EMAIL ↗</a></p></div>
        </section>
      </main>
      <footer><span>© {year} P.DNVD</span><span>DESIGNED TO EVOLVE</span><a href="#top">BACK TO TOP ↑</a></footer>
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
