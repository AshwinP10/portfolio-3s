export function ResumeSection() {
  return (
    <section id="resume" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 gradient-text">Resume</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Download my complete resume or view it below
        </p>

        <div className="bg-card border-2 border-primary/10 rounded-lg p-8 shadow-lg">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ashwin Prakash</h3>
            <div className="text-center mb-6">
              <p className="text-muted-foreground">(781) 759-2993 • ashwinprakash@utexas.edu</p>
              <p className="text-muted-foreground">github.com/AshwinP10 • ashw.vercel.app</p>
            </div>
          </div>

          <div className="text-left space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">Education</h4>
              <div className="border-l-2 border-primary/20 pl-4">
                <p className="font-medium">University of Texas at Austin</p>
                <p className="text-muted-foreground">Major: BS Electrical and Computer Engineering, Minor: Robotics</p>
                <p className="text-muted-foreground">
                  Relevant Coursework: Algorithms, Software Design and Implementation, Probability and Random Processes,
                  Embedded Systems, Linear Algebra, Discrete Mathematics — GPA: 3.6
                </p>
                <p className="text-sm text-primary">May 2027 • Austin, TX</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">Work Experience</h4>
              <div className="space-y-4">
                <div className="border-l-2 border-primary/20 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium">Dell Technologies</h5>
                    <span className="text-sm text-muted-foreground">June 2025 – August 2025</span>
                  </div>
                  <p className="text-sm text-primary mb-2">Software Engineering Intern • Round Rock, Texas</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • Designed and deployed an agentic AI system using LangChain, Gemma, Mistral, and Codestral,
                      enabling Dell teams to generate analytical Jira reports via natural language queries, cutting
                      sprint report time by 50%.
                    </li>
                    <li>
                      • Built a binary issue spillover classifier using a Random Forest Classifier trained on Jira
                      ticket metadata; achieved a test accuracy of 91.3%, aiding proactive triage.
                    </li>
                    <li>
                      • Integrated RAG pipeline by embedding documents with bge-m3 and querying an Elasticsearch vector
                      store using cosine similarity, boosting contextual relevance in generated insights.
                    </li>
                    <li>
                      • Containerized the backend with Docker for scalable deployment; utilized COSTAR and
                      chain-of-thought prompting to improve model reasoning and tool usage.
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-primary/20 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium">Coley GCS</h5>
                    <span className="text-sm text-muted-foreground">February 2025 – May 2025</span>
                  </div>
                  <p className="text-sm text-primary mb-2">
                    Backend Software Engineer Contractor — Texas Convergent • Austin, TX
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • Built an internal CRM using Supabase with PostgreSQL, implementing row-level security,
                      authentication, and granular user permissions.
                    </li>
                    <li>
                      • Integrated a fine-tuned Gemini LLM to extract and cluster key topics from PDFs, automating
                      contract analysis workflows.
                    </li>
                    <li>
                      • Engineered backend pipelines and document parsers for ingesting government contracts, enabling
                      metadata tagging and searchability.
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-primary/20 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium">Paradigm Robotics</h5>
                    <span className="text-sm text-muted-foreground">January 2024 – May 2025</span>
                  </div>
                  <p className="text-sm text-primary mb-2">Software Engineer • Austin, TX</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • Fine-tuned YOLOv5 on a custom thermal+optical dataset using PyTorch, enabling reliable human
                      detection in low-visibility environments for field robotics.
                    </li>
                    <li>
                      • Built Python drivers for optical and thermal sensors, streaming data to ROS nodes on
                      containerized Docker/Ubuntu environments.
                    </li>
                    <li>
                      • Created real-time robot control GUI using OpenCV, WebSockets, and TCP/IP, deployed on embedded
                      Linux Raspberry Pi.
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-primary/20 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium">Omron Robotics and Safety Technologies</h5>
                    <span className="text-sm text-muted-foreground">June 2023 – August 2023</span>
                  </div>
                  <p className="text-sm text-primary mb-2">Software Engineering Intern • Pleasanton, CA</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • Built and deployed a FastAPI REST service on AWS EC2 with password auth, storing credentials in
                      a NoSQL DB and testing endpoints via Postman.
                    </li>
                    <li>
                      • Enabled ROS Turtlebot and OMRON robot fleet integration by publishing real-time 2D location data
                      to the fleet manager, supporting control of up to 10 robots.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
