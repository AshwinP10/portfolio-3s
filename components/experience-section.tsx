import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      company: "Dell Technologies",
      position: "Software Engineering Intern",
      location: "Round Rock, Texas",
      duration: "June 2025 – August 2025",
      achievements: [
        "Designed and deployed an agentic AI system using LangChain, Gemma, Mistral, and Codestral, enabling Dell teams to generate analytical Jira reports via natural language queries, cutting sprint report time by 50%.",
        "Built a binary issue spillover classifier using a Random Forest Classifier trained on Jira ticket metadata; achieved a test accuracy of 91.3%, aiding proactive triage.",
        "Integrated RAG pipeline by embedding documents with bge-m3 and querying an Elasticsearch vector store using cosine similarity, boosting contextual relevance in generated insights.",
        "Containerized the backend with Docker for scalable deployment; utilized COSTAR and chain-of-thought prompting to improve model reasoning and tool usage.",
      ],
      technologies: ["LangChain", "Gemma", "Mistral", "Codestral", "Random Forest", "RAG", "Elasticsearch", "Docker"],
    },
    {
      company: "Coley GCS",
      position: "Backend Software Engineer Contractor — Texas Convergent",
      location: "Austin, TX",
      duration: "February 2025 – May 2025",
      achievements: [
        "Built an internal CRM using Supabase with PostgreSQL, implementing row-level security, authentication, and granular user permissions.",
        "Integrated a fine-tuned Gemini LLM to extract and cluster key topics from PDFs, automating contract analysis workflows.",
        "Engineered backend pipelines and document parsers for ingesting government contracts, enabling metadata tagging and searchability.",
      ],
      technologies: ["Supabase", "PostgreSQL", "Gemini LLM", "Python", "PDF Processing"],
    },
    {
      company: "Paradigm Robotics",
      position: "Software Engineer",
      location: "Austin, TX",
      duration: "January 2024 – May 2025",
      achievements: [
        "Fine-tuned YOLOv5 on a custom thermal+optical dataset using PyTorch, enabling reliable human detection in low-visibility environments for field robotics.",
        "Built Python drivers for optical and thermal sensors, streaming data to ROS nodes on containerized Docker/Ubuntu environments.",
        "Created real-time robot control GUI using OpenCV, WebSockets, and TCP/IP, deployed on embedded Linux Raspberry Pi.",
      ],
      technologies: ["YOLOv5", "PyTorch", "ROS", "Docker", "OpenCV", "WebSockets", "Raspberry Pi"],
    },
    {
      company: "Omron Robotics and Safety Technologies",
      position: "Software Engineering Intern",
      location: "Pleasanton, CA",
      duration: "June 2023 – August 2023",
      achievements: [
        "Built and deployed a FastAPI REST service on AWS EC2 with password auth, storing credentials in a NoSQL DB and testing endpoints via Postman.",
        "Enabled ROS Turtlebot and OMRON robot fleet integration by publishing real-time 2D location data to the fleet manager, supporting control of up to 10 robots.",
      ],
      technologies: ["FastAPI", "AWS EC2", "NoSQL", "ROS", "Postman"],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Professional Experience</h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          Building innovative solutions at the intersection of AI, robotics, and software engineering
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
