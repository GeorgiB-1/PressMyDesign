import type { ReactNode } from "react"

interface SectionProps {
  title: string
  number: string
  children: ReactNode
}

export default function Section({ title, number, children }: SectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-[10px] font-extrabold tracking-widest text-text-muted">
          {number}
        </span>
        <span className="text-sm font-semibold text-text-secondary tracking-tight">
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}
