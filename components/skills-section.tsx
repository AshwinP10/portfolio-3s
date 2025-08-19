import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud, Cpu, Brain, Wrench } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      skills: ["Python", "Java", "JavaScript", "C", "C++", "SQL", "HTML5", "CSS", "VHDL", "ARM Assembly"],
    },
    {
      title: "AI/ML & Data Science",
      icon: <Brain className="h-6 w-6" />,
      skills: [
        "PyTorch",
        "TensorFlow",
        "LangChain",
        "OpenCV",
        "NumPy",
        "pandas",
        "Scikit-Learn",
        "YOLOv5",
        "RAG",
        "Diffusion Models",
      ],
    },
    {
      title: "Web Development",
      icon: <Database className="h-6 w-6" />,
      skills: ["React.js", "Node.js", "FastAPI", "Flask", ".NET", "Supabase", "PostgreSQL", "NoSQL", "SQLite3"],
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      skills: ["AWS EC2", "Docker", "Kubernetes", "Git", "GitHub", "Postman", "Linux", "Windows"],
    },
    {
      title: "Robotics & Embedded",
      icon: <Cpu className="h-6 w-6" />,
      skills: ["ROS", "Raspberry Pi", "Embedded Systems", "WebSockets", "TCP/IP", "UART", "KiCAD", "Oscilloscopes"],
    },
    {
      title: "Tools & Frameworks",
      icon: <Wrench className="h-6 w-6" />,
      skills: ["Selenium", "Elasticsearch", "Hydra", "PyTorch Lightning", "Gemini", "Mistral", "Codestral"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30 crt-effect">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary arcade-glow font-mono">SKILL INVENTORY</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow arcade-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-primary font-mono arcade-glow">
                  <div className="text-primary mr-3">{category.icon}</div>
                  {category.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-accent/20 text-accent hover:bg-accent/30 font-mono border border-accent text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
