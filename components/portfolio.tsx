import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Box, Download, Github, MapPin, Mail, MoveUpRight } from "lucide-react"
import { Navigation } from "./navigation"
import { ProjectsSection } from "./projects-section"
import { SkillsSection } from "./skills-section"
import { ResumePdfSection } from "./resume-pdf-section"
import { CopyEmail } from "./copy-email"
import { SIGNS } from "./world/world-data"

const experience = SIGNS.filter((sign) => sign.kind === "experience")

export function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main">
        <section className="hero section-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">ASHWIN PRAKASH <span>/</span> ENGINEER &amp; BUILDER</p>
            <h1 id="hero-title">Making sense<br />of the <span>physical<br className="desktop-break" /> world.</span></h1>
            <p className="hero-description">I build systems that see, reason, and act. Machine learning, computer vision, and robotics — from a first experiment to the real world.</p>
            <div className="hero-actions">
              <a className="action action-primary" href="#projects">Explore my work <ArrowDown size={18} /></a>
              <Link className="action action-outline" href="/world" prefetch={false}><Box size={18} /> Enter the 3D world</Link>
            </div>
            <div className="hero-caption"><MapPin size={15} /><span>Austin, TX</span><span className="caption-divider">/</span><span>ECE @ UT Austin · Class of 2027</span></div>
          </div>
          <figure className="portrait-card">
            <div className="portrait-topline"><span>HELLO, I’M ASHWIN</span><span>01 / ABOUT</span></div>
            <div className="portrait-image"><Image src="/images/ashwin-headshot.jpg" alt="Ashwin Prakash" fill priority sizes="(max-width: 760px) 90vw, 38vw" /></div>
            <figcaption><span>Curious by default.<br /><strong>Engineer by practice.</strong></span><a href="#about" aria-label="More about Ashwin"><MoveUpRight size={23} /></a></figcaption>
          </figure>
        </section>
        <div className="experience-strip section-shell" aria-label="Experience highlights">
          <span className="eyebrow">BUILT &amp; LEARNED AT</span><div><span>amazon</span><span>SARONIC</span><span>DELL</span><span className="ut-wordmark">UT AUSTIN</span></div>
        </div>
        <ProjectsSection />
        <section className="section-shell section-pad" id="experience" aria-labelledby="experience-title">
          <div className="section-heading"><div><p className="eyebrow">02 / EXPERIENCE</p><h2 id="experience-title">Learning by building.</h2></div><p>From perception on real hardware<br />to systems running in the cloud.</p></div>
          <div className="experience-list">
            {experience.map((role, index) => (
              <details className="experience-row" key={role.id} open={index === 0}>
                <summary><span className="experience-date">{role.meta?.split(" · ")[0]}</span><span className="experience-role"><strong>{role.title}</strong><span>{role.subtitle}</span></span><span className="expand-mark" aria-hidden="true">+</span></summary>
                <div className="experience-body"><ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="tag-list">{role.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              </details>
            ))}
          </div>
        </section>
        <section className="about-section section-shell section-pad" id="about" aria-labelledby="about-title">
          <div><p className="eyebrow">03 / A LITTLE ABOUT ME</p><h2 id="about-title">Software meets<br /><span className="muted-title">the real world.</span></h2></div>
          <div className="about-copy"><p>I’m a senior studying Electrical &amp; Computer Engineering at UT Austin, with a minor in Robotics. My work centers on perception and machine learning: computer-vision pipelines, multimodal models, sensor fusion, and simulation.</p><p>I like taking a system all the way from data and models to evaluation and deployment on real hardware. Outside the lab, you’ll find a few of my interests tucked into the 3D plaza.</p><div className="education-card"><span className="eyebrow">THE UNIVERSITY OF TEXAS AT AUSTIN</span><h3>B.S. Electrical &amp; Computer Engineering</h3><p>Robotics minor <span>·</span> GPA 3.7 <span>·</span> May 2027</p><details><summary>Relevant coursework</summary><p>Algorithms · Software Testing · Software Design &amp; Implementation · Data Science Lab · Software Lab · Probability &amp; Random Processes · Embedded Systems · Linear Algebra · Discrete Mathematics</p></details></div></div>
        </section>
        <SkillsSection />
        <section className="world-invitation section-shell" aria-labelledby="world-title"><div><p className="eyebrow">A DIFFERENT WAY TO EXPLORE</p><h2 id="world-title">Take the scenic route.</h2><p>A robot, an Austin-inspired plaza, and the stories behind my work.<br />Walk around, visit a project, or follow the guided tour.</p></div><Link href="/world" prefetch={false} className="world-invitation-link"><Box size={30} /><span>Explore the 3D world</span><ArrowUpRight size={22} /></Link></section>
        <ResumePdfSection />
        <section className="section-shell contact-section section-pad" id="contact" aria-labelledby="contact-title"><p className="eyebrow">05 / WHAT’S NEXT?</p><h2 id="contact-title">Let’s build<br /><span>something that matters.</span></h2><p>Open to software, machine learning, and robotics roles.<br />Have an interesting problem? I’d love to hear about it.</p><div className="contact-actions"><a className="action action-primary" href="mailto:ashwinprakash@utexas.edu"><Mail size={18} /> Get in touch <ArrowUpRight size={18} /></a><CopyEmail /></div><div className="contact-links"><a href="mailto:ashwinprakash@utexas.edu">ashwinprakash@utexas.edu</a><a href="tel:+17817592993">(781) 759-2993</a><a href="https://github.com/AshwinP10" target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={15} /></a></div></section>
      </main>
      <footer className="site-footer section-shell"><a className="wordmark" href="#home">ap<span>.</span></a><span>Ashwin Prakash <span className="footer-divider">/</span> Austin, Texas</span><a href="/resume.pdf" download="Ashwin_Prakash_Resume.pdf">Résumé <Download size={15} /></a><a href="#home">Back to top <ArrowUpRight size={15} /></a></footer>
    </>
  )
}
