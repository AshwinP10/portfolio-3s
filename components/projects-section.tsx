import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Code } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "CDUS Lab Research Projects",
      description:
        "Implemented a pose-conditioned 3D reconstruction pipeline using PyTorch Lightning and Hydra; adapted model architecture to integrate image encoders and diffusion-based decoders, enabling accurate object generation from 2D inputs.",
      image: "/3d-reconstruction-network.png",
      technologies: ["PyTorch", "Diffusion Models", "Image Processing", "Hydra"],
      achievements: [
        "Tuned data pipelines for ShapeNet dataset ingestion, including dynamic cropping, augmentation, and batch-level prefetching; improved GPU utilization and reduced I/O bottlenecks by 30%.",
      ],
      links: {
        source: "https://github.com/autognc",
      },
    },
    {
      title: "Handheld Arcade Game",
      description:
        "Designed a PCB game controller with KiCAD for a Texas Instruments microcontroller. Soldered 40+ components like switches, audio ports, LCD screens, and UART ports. Utilized lab equipment like DMMs and oscilloscopes to debug UART and DAC speaker transmissions for game audio.",
      image: "/handheld-arcade-pcb.png",
      technologies: ["C", "C++", "ARM Assembly", "KiCAD", "Embedded Systems"],
      achievements: [
        "Recreated the old arcade game 'Asteroids' in C, C++, and ARM Assembly, using multi-threading with Systick Interrupts to read player input. Added support for multiple languages.",
      ],
      links: {
        demo: "https://youtu.be/-TJatr4mJDc",
        source: "https://github.com/AshwinP10/gamelab",
      },
    },
    {
      title: "Stock Price Predictor",
      description:
        "Developed stock price prediction tool leveraging Python, SQL, and Sci-Kit Learn, showcasing 5 technical indicators each using different models like XGBoost to predict future prices with high accuracy. Hosted on Streamlit for seamless user interaction.",
      image: "/stock-predictor-chart.png",
      technologies: ["Python", "Sci-Kit Learn", "SQL", "XGBoost", "Streamlit"],
      achievements: [
        "Engineered data pipeline using the yfinance API to retrieve, process, and visualize stock data in real-time. Stored previous user information in SQLite3 databases, allowing users to see stock data and visualization history.",
      ],
      links: {
        demo: "https://stockindex.streamlit.app",
        source: "https://github.com/AshwinP10/StockPricePredictor",
      },
    },
    {
      title: "Plate 'Em - Texas Convergent F24",
      description:
        "Developed a dining hall meal planning application leveraging Python, Beautiful Soup, and Firebase to scrape meal data across 3 dining halls on campus. Worked with team of 7 students to conduct user interviews and develop a user friendly UI built in React Native to clearly display meal data, health metrics, as well as goal planning features.",
      image: "/kinsolving-dining-hall.png",
      technologies: ["React Native", "Beautiful Soup", "Firebase", "GPT API"],
      achievements: [
        "Utilized GPT Tokens to retrieve meal data from Firebase and create personalized meal recommendations based on user metrics.",
      ],
      links: {
        source: "#",
      },
    },
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Featured Projects</h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          Showcasing innovative solutions in AI/ML, robotics, and software development
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-foreground">{project.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-6">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                      • {achievement}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.links.demo && (
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    asChild
                  >
                    <a href={project.links.source} target="_blank" rel="noopener noreferrer">
                      <Code className="h-4 w-4 mr-2" />
                      Source
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
