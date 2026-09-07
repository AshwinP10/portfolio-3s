import type { Metadata } from "next"
import { Portfolio } from "@/components/portfolio"

export const metadata: Metadata = {
  title: "Résumé | Ashwin Prakash",
  alternates: { canonical: "/cv" },
}

export default function CvPage() {
  return <Portfolio />
}
