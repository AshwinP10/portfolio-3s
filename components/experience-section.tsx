import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      company: "Saronic Technologies",
      position: "Software Engineering Intern — Texas Convergent",
      location: "Austin, TX",
      duration: "August 2026 – Present",
      achievements: [
        "Building a Python Gym-style API (reset, step, observe) around NVIDIA Isaac Sim to create a closed-loop virtual ocean environment for testing autonomous boat software without a boat in the water.",
        "Integrating a boat dynamics model with Isaac Sim so autonomy control inputs update boat state and the simulator renders camera observations back to the stack in real time, with configurable scenarios for RL-based navigation training.",
      ],
      technologies: ["Python", "NVIDIA Isaac Sim", "Reinforcement Learning", "Simulation", "Autonomy"],
    },
    {
      company: "Amazon",
      position: "SDE Intern — Computer Vision (Amazon Key, Devices)",
      location: "Austin, TX",
      duration: "June 2026 – Present",
      achievements: [
        "Building computer-vision pipelines to automate the installation-audit workflow for Amazon Key smart-access devices, parsing electrical schematics and field imagery to replace manual review.",
        "Training and fine-tuning detection and classification models (YOLO, ResNet) in PyTorch to verify correct device installation and flag wiring and component anomalies from real-world captures.",
        "Applying transfer learning, targeted data augmentation, and rigorous evaluation to harden perception accuracy under noisy conditions.",
      ],
      technologies: ["PyTorch", "YOLO", "ResNet", "Computer Vision", "Transfer Learning"],
    },
    {
      company: "Autonomous Mobile Robotics Laboratory",
      position: "Robotics Software Engineer — Sensor Fusion & Perception",
      location: "Austin, TX",
      duration: "September 2025 – May 2026",
      achievements: [
        "Implemented sensor-fusion pipelines combining LiDAR, IMU, and camera data to improve localization accuracy by 27%.",
        "Implemented open-source visual SLAM and object-tracking modules in ROS 2, reducing pose-estimation drift by 18%.",
        "Deployed real-time perception and control modules on NVIDIA Jetson for onboard autonomous navigation and obstacle avoidance.",
      ],
      technologies: ["ROS 2", "Sensor Fusion", "Visual SLAM", "NVIDIA Jetson", "C++"],
    },
    {
      company: "Dell Technologies",
      position: "Software Engineering Intern",
      location: "Round Rock, TX",
      duration: "June 2025 – August 2025",
      achievements: [
        "Developed an AI-powered sprint reporting system using LangChain and Gemma, automating Jira analytics and reducing report generation time by 50%.",
        "Built and deployed a Random Forest classifier achieving 91% accuracy for issue-spillover prediction, improving triage efficiency.",
      ],
      technologies: ["LangChain", "Gemma", "Random Forest", "Python", "Docker"],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Experience</h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Software, machine learning, and robotics roles across industry and research.
        </p>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-foreground">{exp.position}</CardTitle>
                    <div className="flex items-center text-primary font-semibold mt-1">
                      <Building className="h-4 w-4 mr-2" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-foreground leading-relaxed">
                      • {achievement}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                    >
                      {tech}
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
