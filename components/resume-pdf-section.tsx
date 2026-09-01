"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

export function ResumePdfSection() {
  return (
    <section id="resume" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Resume</h2>
        <p className="text-lg text-muted-foreground text-center mb-12">One page, PDF.</p>

        <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Ashwin Prakash — Resume</CardTitle>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}
