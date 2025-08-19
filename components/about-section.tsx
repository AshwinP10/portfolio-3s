import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, MapPin, Phone, Mail, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <img
            src="/images/ashwin-headshot.jpg"
            alt="Ashwin Prakash"
            className="w-56 h-56 rounded-full border-4 border-primary/20 shadow-2xl tech-glow object-cover object-[center_20%]"
          />
        </div>

        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">About Me</h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          A UT Austin student passionate about AI, machine learning, and robotics
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-center md:text-left">
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                Hi! I'm currently studying Electrical and Computer Engineering with a Robotics minor at UT Austin. I'm
                really interested in machine learning, AI, computer vision, and image processing. Through my internships
                and research, I've gotten to work on some cool projects involving intelligent systems and robotics.
              </p>

              <p className="text-lg text-foreground mb-6 leading-relaxed">
                I love building things that can see and understand the world around them. Whether it's training computer
                vision models, working with AI systems, or developing robotics applications, I'm always excited to
                tackle new challenges and learn something new.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center text-primary">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="font-medium">(781) 759-2993</span>
                </div>
                <div className="flex items-center text-primary">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="font-medium">ashwinprakash@utexas.edu</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Education</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">University of Texas at Austin</h4>
                  <p className="text-muted-foreground">BS Electrical and Computer Engineering</p>
                  <p className="text-muted-foreground">Minor: Robotics</p>
                  <div className="flex items-center mt-2 flex-wrap gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-secondary mr-1" />
                      <span className="text-sm text-muted-foreground">Austin, TX</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-secondary mr-1" />
                      <span className="text-sm text-muted-foreground">GPA: 3.6</span>
                    </div>
                    <span className="text-sm text-primary font-medium">Graduating May 2027</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-3">Relevant Coursework</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Algorithms",
                    "Software Design",
                    "Probability",
                    "Embedded Systems",
                    "Linear Algebra",
                    "Discrete Mathematics",
                  ].map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
