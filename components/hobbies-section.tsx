import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Origami, ShoppingBasketIcon as Basketball, Guitar, Code } from "lucide-react"

export function HobbiesSection() {
  const hobbies = [
    {
      title: "Origami",
      description:
        "I find peace and precision in the art of paper folding. Origami teaches patience and attention to detail - skills that translate beautifully into engineering problem-solving.",
      icon: <Origami className="h-8 w-8 text-primary" />,
    },
    {
      title: "Basketball",
      description:
        "Passionate Boston Celtics fan and recreational player. Basketball keeps me active and teaches teamwork, strategy, and perseverance under pressure.",
      icon: <Basketball className="h-8 w-8 text-primary" />,
    },
    {
      title: "Guitar",
      description:
        "Currently learning to play guitar as a creative outlet. Music provides a different kind of problem-solving and helps me approach engineering challenges with fresh perspectives.",
      icon: <Guitar className="h-8 w-8 text-primary" />,
    },
    {
      title: "Side Projects",
      description:
        "Always tinkering with new technologies and building personal projects. From web apps to embedded systems, I love exploring the intersection of hardware and software.",
      icon: <Code className="h-8 w-8 text-primary" />,
    },
  ]

  return (
    <section id="hobbies" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Beyond Engineering</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring creativity and balance outside the world of code and circuits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {hobbies.map((hobby, index) => (
            <Card
              key={index}
              className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg text-center group"
            >
              <CardHeader>
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {hobby.icon}
                </div>
                <CardTitle className="text-lg">{hobby.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{hobby.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
