"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, ExternalLink } from "lucide-react"

const RESUME_URL = "/resume.pdf"

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
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <a href={RESUME_URL} download="Ashwin_Prakash_Resume.pdf">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  asChild
                >
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in new tab
                  </a>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="w-full overflow-hidden rounded-lg border border-border bg-muted/30">
              <object
                data={`${RESUME_URL}#view=FitH`}
                type="application/pdf"
                className="w-full h-[70vh] min-h-[480px]"
                aria-label="Ashwin Prakash resume PDF"
              >
                <iframe
                  src={`${RESUME_URL}#view=FitH`}
                  title="Ashwin Prakash resume PDF"
                  className="w-full h-[70vh] min-h-[480px]"
                  loading="lazy"
                />
                <p className="p-6 text-center text-sm text-muted-foreground">
                  Your browser can&apos;t display the PDF inline.{" "}
                  <a href={RESUME_URL} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                    Open it in a new tab
                  </a>
                  .
                </p>
              </object>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
