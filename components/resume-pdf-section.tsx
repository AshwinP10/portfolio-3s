"use client"

import { useState } from "react"
import { Download, FileText, ChevronDown } from "lucide-react"

export function ResumePdfSection() {
  const [preview, setPreview] = useState(false)
  return <section className="section-shell resume-section" id="resume" aria-labelledby="resume-title"><div className="resume-bar"><FileText size={27} /><div><h2 id="resume-title">The one-page version.</h2><p>Experience, projects, and skills in a PDF.</p></div><div className="resume-actions"><button className="action action-outline" onClick={() => setPreview(!preview)} aria-expanded={preview} aria-controls="resume-preview">{preview ? "Hide preview" : "Preview résumé"} <ChevronDown size={17} /></button><a className="action action-primary" href="/resume.pdf" download="Ashwin_Prakash_Resume.pdf">Download <Download size={17} /></a></div></div><div className="resume-preview" id="resume-preview" hidden={!preview}>{preview && <><iframe src="/resume.pdf#view=FitH" title="Ashwin Prakash’s résumé PDF" /><p>Can’t see the preview? <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Open the PDF in a new tab.</a></p></>}</div></section>
}
