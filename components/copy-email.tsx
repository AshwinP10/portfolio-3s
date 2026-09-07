"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"

export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const copy = async () => {
    try { await navigator.clipboard.writeText("ashwinprakash@utexas.edu"); setStatus("copied") }
    catch { setStatus("error") }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus("idle"), 3500)
  }
  return <div className="copy-email"><button className="action action-outline" onClick={copy}>{status === "copied" ? <Check size={17} /> : <Copy size={17} />}{status === "copied" ? "Email copied" : "Copy email"}</button><span className={status === "error" ? "copy-error" : "sr-only"} role="status">{status === "error" ? "Couldn’t copy. Use the email link below." : status === "copied" ? "Email address copied to clipboard." : ""}</span></div>
}
