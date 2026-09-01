import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Cpu, Github } from "lucide-react"

type ProjectLink = { label: string; href: string }

type Project = {
  title: string
  subtitle?: string
  description: string
  image?: string
  technologies: string[]
  links: ProjectLink[]
}

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "VQA-Disagree",
      subtitle: "Workshop paper — DataMFM @ CVPR 2026",
      description:
        "A multi-model disagreement pipeline in PyTorch that runs four 7B vision-language models (Qwen2-VL, LLaVA-1.6, InternVL2, MiniCPM-V) on Modal to auto-stratify 1,500 VQA items into difficulty buckets with zero human annotation. Validated with a Qwen2-VL-72B oracle (4-bit QLoRA on A100), confirming a 28.3 pp Easy–Hard accuracy gap. Released as a 456-sample benchmark on Hugging Face.",
      technologies: ["PyTorch", "Vision-Language Models", "QLoRA", "Modal", "Hugging Face"],
      links: [
        { label: "Code", href: "https://github.com/AshwinP10/vqa-disagree" },
        { label: "Dataset", href: "https://huggingface.co/datasets/AshwinP10/VQA-Disagree" },
      ],
    },
    {
      title: "DAVATaR",
      subtitle: "RobIN Lab research — submitted to CoRL 2026",
      description:
        "Co-authored DAVATaR, training multimodal transformer policies via imitation learning that fuse RGB vision, tactile, and immersion-depth signals for contact-rich manipulation across the air–water interface. Designed physically-grounded visual augmentations (reflection/refraction) that raised mean real-world task success from 28% (vision-only) to 71%, and built behavior-cloning training/eval pipelines in PyTorch (ResNet-18 spatial-softmax encoder + transformer fusion).",
      technologies: ["PyTorch", "Imitation Learning", "Multimodal Transformers", "Behavior Cloning"],
      links: [{ label: "Website", href: "https://davatar-corl26.github.io/" }],
    },
    {
      title: "Silicon Prairie",
      subtitle: "Forecasting Austin–San Antonio megacity convergence",
      description:
        "Modeled 10 years of Sentinel-2 satellite imagery (pulled via Google Earth Engine) across 43,264 tiles as a latent-space forecasting problem — 512-dim embeddings from a ResNet-18 (benchmarked against a ViT) trained to 98% land-use accuracy, then a 2-layer LSTM with a residual 'delta' formulation to forecast land-use transitions (MSE 0.055). Projects a continuous high-density corridor merging Austin and San Antonio by 2030.",
      technologies: ["ResNet-18", "ViT", "LSTM", "Google Earth Engine", "PyTorch"],
      links: [
        {
          label: "Article",
          href: "https://medium.com/@ashwinprakash10/predicting-the-silicon-prairie-megacity-mapping-the-austin-san-antonio-convergence-with-deep-ad2486f133f3",
        },
        { label: "Video", href: "https://www.youtube.com/watch?v=dZCs_dmNhyU" },
      ],
    },
    {
      title: "SecondLens",
      subtitle: "HackMIT — smart-glasses memory graph",
      description:
        "A smart-glasses platform that captures real-world interactions and organizes them into a searchable memory graph. Built a Python facial-recognition service with dlib and OpenCV (detection, landmark alignment, embedding extraction), integrated with a Node.js + Supabase backend and a React PWA, and rendered identities in an interactive Three.js knowledge graph.",
      technologies: ["OpenCV", "dlib", "Claude API", "Three.js", "Supabase", "React"],
      links: [
        { label: "Project Report", href: "https://plume.hackmit.org/project/pakgt-inxow-qfdlj-ipbaa" },
        { label: "Code", href: "https://github.com/AshwinP10/mentra-photo-sender" },
      ],
    },
    {
      title: "Handheld Arcade Game",
      subtitle: "PCB design + embedded firmware",
      description:
        "Designed a PCB game controller in KiCAD for a TI microcontroller and hand-soldered 40+ components (switches, audio ports, LCD, UART), debugging UART and DAC audio with DMMs and oscilloscopes. Recreated 'Asteroids' in C, C++, and ARM Assembly using multithreading with SysTick interrupts for player input.",
      image: "/handheld-arcade-pcb.png",
      technologies: ["C", "C++", "ARM Assembly", "KiCAD", "Embedded Systems"],
      links: [
        { label: "Demo", href: "https://youtu.be/-TJatr4mJDc" },
        { label: "Code", href: "https://github.com/AshwinP10/gamelab" },
      ],
    },
    {
      title: "Stock Price Predictor",
      subtitle: "Technical-indicator forecasting on Streamlit",
      description:
        "A stock-price prediction tool in Python with 5 technical indicators across models like XGBoost, served on Streamlit. Engineered a yfinance data pipeline for real-time retrieval, processing, and visualization, with user history stored in SQLite.",
      image: "/stock-predictor-chart.png",
      technologies: ["Python", "scikit-learn", "XGBoost", "Streamlit", "SQL"],
      links: [
        { label: "Demo", href: "https://stockindex.streamlit.app" },
        { label: "Code", href: "https://github.com/AshwinP10/StockPricePredictor" },
      ],
    },
    {
      title: "Plate 'Em",
      subtitle: "Texas Convergent F24 — team of 7",
      description:
        "A dining-hall meal-planning app: scraped menu data across 3 UT dining halls with Python + BeautifulSoup into Firebase, and built a React Native UI with health metrics and goal planning. Used the GPT API for personalized meal recommendations.",
      image: "/kinsolving-dining-hall.png",
      technologies: ["React Native", "BeautifulSoup", "Firebase", "GPT API"],
      links: [],
    },
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Projects</h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Research, machine learning, and things I&apos;ve built end to end.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden group flex flex-col"
            >
              {project.image ? (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15">
                  <Cpu className="h-10 w-10 text-primary/40" />
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl text-foreground">{project.title}</CardTitle>
                {project.subtitle && (
                  <p className="text-sm font-medium text-primary">{project.subtitle}</p>
                )}
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </CardHeader>

              <CardContent className="mt-auto">
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

                {project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, i) => (
                      <Button
                        key={link.label}
                        size="sm"
                        variant={i === 0 ? "default" : "outline"}
                        className={
                          i === 0
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                        }
                        asChild
                      >
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            asChild
          >
            <a href="https://github.com/AshwinP10" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
