import { Code, Database, Cloud, Cpu, Brain, Wrench } from "lucide-react"

const skills = [
  { title: "Languages", icon: Code, items: ["Python", "C", "C++", "Java", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "VHDL", "ARM Assembly"] },
  { title: "ML & Computer Vision", icon: Brain, items: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "YOLO", "DINOv2", "Claude API", "LangChain", "Hugging Face", "Google Earth Engine", "Multimodal Transformers", "Imitation Learning"] },
  { title: "Web & Backend", icon: Database, items: ["React", "Next.js", "Node.js", "Express", "Django", "Flask", "FastAPI", "GraphQL", "Supabase", "PostgreSQL"] },
  { title: "Cloud & Tools", icon: Cloud, items: ["AWS Lambda", "AWS EventBridge", "AWS API Gateway", "AWS S3", "AWS CDK", "Docker", "Kubernetes", "Modal", "Git", "GitHub", "Postman", "Linux"] },
  { title: "Robotics & Perception", icon: Cpu, items: ["ROS 2", "NVIDIA Isaac Sim", "NVIDIA Jetson", "Visual SLAM", "Sensor Fusion", "Behavior Cloning", "Real-Time Systems", "Embedded Linux"] },
  { title: "Embedded & Hardware", icon: Wrench, items: ["C / ARM Firmware", "KiCAD", "PCB Design", "UART", "Multithreading", "Oscilloscopes"] },
]

export function SkillsSection() {
  return <section className="section-shell section-pad skills-section" id="skills" aria-labelledby="skills-title"><div className="section-heading"><div><p className="eyebrow">04 / SKILLS</p><h2 id="skills-title">Skills</h2></div><p>Tools I&apos;ve worked with.</p></div><div className="skills-grid">{skills.map(({ title, icon: Icon, items }) => <div className="skill-group" key={title}><Icon size={23} /><h3>{title}</h3><div className="tag-list">{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></section>
}
