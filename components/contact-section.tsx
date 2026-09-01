import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Download } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Contact</h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Open to software, ML, and robotics roles. The fastest way to reach me is email.
        </p>

        <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Let&apos;s connect</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="mailto:ashwinprakash@utexas.edu"
                className="flex items-center group"
              >
                <Mail className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    ashwinprakash@utexas.edu
                  </span>
                </div>
              </a>

              <a href="tel:+17817592993" className="flex items-center group">
                <Phone className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    (781) 759-2993
                  </span>
                </div>
              </a>

              <a
                href="https://github.com/AshwinP10"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group"
              >
                <Github className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-semibold text-foreground">GitHub</p>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    github.com/AshwinP10
                  </span>
                </div>
              </a>

              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-primary mr-4" />
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground">Austin, Texas</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume (PDF)
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
