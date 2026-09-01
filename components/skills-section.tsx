import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud, Cpu, Brain, Wrench } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="h-6 w-6" />,
      skills: ["Python", "C", "C++", "Java", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "VHDL", "ARM Assembly"],
    },
    {
      title: "ML & Computer Vision",
      icon: <Brain className="h-6 w-6" />,
      skills: [
        "PyTorch",
        "TensorFlow",
        "scikit-learn",
        "OpenCV",
        "YOLO",
        "NumPy",
        "pandas",
        "LangChain",
        "Hugging Face",
        "ONNX",
        "Multimodal Transformers",
        "Imitation Learning",
      ],
    },
    {
      title: "Web & Backend",
      icon: <Database className="h-6 w-6" />,
      skills: ["React", "Next.js", "Node.js", "Express", "Django", "Flask", "FastAPI", "GraphQL", "Supabase", "PostgreSQL"],
    },
    {
      title: "Cloud & Tools",
      icon: <Cloud className="h-6 w-6" />,
      skills: ["AWS", "AWS CDK", "Docker", "Kubernetes", "Modal", "Git", "GitHub", "Postman", "Linux"],
    },
    {
      title: "Robotics & Perception",
      icon: <Cpu className="h-6 w-6" />,
      skills: [
        "ROS 2",
        "NVIDIA Isaac Sim",
        "NVIDIA Jetson",
        "Visual SLAM",
        "Sensor Fusion",
        "Behavior Cloning",
        "Real-Time Systems",
        "Embedded Linux",
      ],
    },
    {
      title: "Embedded & Hardware",
      icon: <Wrench className="h-6 w-6" />,
      skills: ["C / ARM Firmware", "KiCAD", "PCB Design", "UART", "Multithreading", "Oscilloscopes"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Skills</h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Tools and technologies I work with day to day.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-foreground">
                  <div className="text-primary mr-3">{category.icon}</div>
                  {category.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 text-xs"
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
