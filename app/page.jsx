"use client";
import { Sky, Cursor, Progress, Clock, Scramble, Magnetic, Line, Fade, Portrait } from "../components/fx";
import CvRequest from "../components/CvRequest";
import Mobs from "../components/Mobs";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const skills = ["Python", "JavaScript", "React", "PHP", "ASP.NET", "SQL", "Computer Vision", "Machine Learning", "Test Design"];
const work = [
  { n: "01", t: "Web dev", d: "Created website Internal for PT. Testindo.", g: "React, CodeIgniter, SQL" },
  { n: "02", t: "AI Chatbot", d: "EDIT: what it does, who it was for, the stack, and the result.", g: "Python / AI" },
  { n: "03", t: "Final Year Project", d: "Developed an operational dashboard for water filter installation, maintenance, and repair management. Contributed as a Frontend Developer using React, backend using Laravel and SQL integration.", g: "React / SQL" },
];
const path = [
  { n: "Now", t: "Web Dev Intern - maganghub - PT Testindo", d: "Developing internal website", g: "" },
  { n: "—", t: "Internships", d: "Web developer at PT Testindo, AI chatbot at Ministry of cooperation, Web Developer roles at OJK, IT support at Global Onkolab Farma, Web Developer at Toya Bumi Bersih.", g: "" },
  { n: "—", t: "B.Sc. in IT", d: "President University, Cikarang. Studied Informatics with AI specialization", g: "" },
  { n: "—", t: "PT Toya Bumi Bersih - Final Year Project", d: "Developed an operational dashboard for water filter installation, maintenance, and repair management. Contributed as a Frontend Developer using React, with Laravel and SQL integration, including technician scheduling, complaint management, and QR Code workflows.", g: "" },
];

const Row = ({ r }) => (
  <article className="row" data-hover>
    <span className="mono">{r.n}</span>
    <h3>{r.t}</h3>
    <p>{r.d}</p>
    <span className="mono g">{r.g}</span>
  </article>
);

export default function Home() {
  return (
    <>
      <Progress /><Sky /><Mobs /><Cursor /><div className="grain" />

      <header className="top mono">
        <a href="#top">Rafli</a>
        <span className="clk"><Clock /></span>
        <nav><a href="#about">About</a><a href="#work">Work</a><a href="#cv">CV</a><a href="#contact">Contact</a></nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-txt">
            <Fade><p className="mono">Based in Indonesia</p></Fade>
            <h1><Line>Rafli<i>.</i></Line></h1>
            <div className="stmt">
              <Line delay={0.2}><span>Web dev with a background in</span></Line>
              <Line delay={0.32}><em><Scramble text="Informatics - AI." /></em></Line>
            </div>
          </div>
          <Portrait src={`${base}/rafli.webp`} />
        </section>

        <div className="mq"><div>{[...skills, ...skills].map((s, i) => <span key={i}>{s} /&nbsp;</span>)}</div></div>

        <section className="sec" id="about">
          <div className="mono lab">(01) About</div>
          <Fade>
            <p className="big">Hi, I’m Yahya Rafli Hidayah, an <em>IT graduate specializing in Artificial Intelligence.</em></p>
            <p className="sm">I studied IT at President University with a focus on AI and machine learning. These days I write test suites for a living, and I'm preparing applications for a Master's in Informatics.</p>
          </Fade>
        </section>

        <section className="sec" id="work">
          <div className="mono lab">(02) Selected work</div>
          <div className="rows">{work.map((r) => <Fade key={r.n}><Row r={r} /></Fade>)}</div>
        </section>

        <section className="sec">
          <div className="mono lab">(03) Path</div>
          <div className="rows">{path.map((r) => <Fade key={r.t}><Row r={r} /></Fade>)}</div>
        </section>

        <section className="sec" id="contact">
          <div className="mono lab">(04) Contact</div>
          <Fade>
            <p className="sm">Open to work and collaboration. Say hello:</p>
            <Magnetic><a className="mail" href="mailto:yahyarafli.hidayah04@gmail.com">yahyarafli.hidayah04@gmail.com</a></Magnetic>
            <div id="cv"><CvRequest /></div>
            <p className="mono links"><a href="https://www.linkedin.com/in/yahyahidayah77">LinkedIn ↗</a> <a href="https://github.com/Renjuo">GitHub ↗</a><a href="https://wa.me/6282277212285" >Whatsapp ↗</a></p>
          </Fade>
        </section>
      </main>
      <footer className="foot mono">© 2026 Rafli</footer>
    </>
  );
}
