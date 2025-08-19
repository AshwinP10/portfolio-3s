import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, ExternalLink, Download } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Get In Touch</h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          Ready to discuss AI/ML projects, robotics innovations, or software engineering opportunities
        </p>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground mb-4">Let's Connect</CardTitle>
              <p className="text-muted-foreground">
                Available for internships, full-time opportunities, and collaborative projects
              </p>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a
                        href="mailto:ashwinprakash@utexas.edu"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        ashwinprakash@utexas.edu
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href="tel:+17817592993" className="text-muted-foreground hover:text-primary transition-colors">
                        (781) 759-2993
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-muted-foreground">Austin, Texas</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <Github className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-semibold text-foreground">GitHub</p>
                      <a
                        href="https://github.com/AshwinP10"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github.com/AshwinP10
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <ExternalLink className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <p className="font-semibold text-foreground">Portfolio</p>
                      <a
                        href="https://ashw.vercel.app/"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ashw.vercel.app
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-3">Download Resume</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Get a detailed overview of my experience, skills, and achievements
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF Resume
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
