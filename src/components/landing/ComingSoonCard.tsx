"use client"

import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"

interface ComingSoonCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

export function ComingSoonCard({
  title,
  description,
  icon,
  className,
}: ComingSoonCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-secondary/30 p-6 opacity-80 grayscale-[0.5] transition-all hover:opacity-100 hover:grayscale-0 hover:bg-white hover:shadow-sm",
        className
      )}
    >
      <div className="absolute right-4 top-4 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        Wkrótce
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-xl bg-gray-100 p-3 text-gray-500 transition-colors group-hover:bg-blue-50 group-hover:text-primary">
          {icon}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-700 group-hover:text-foreground transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="mt-6 flex items-center text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">
        <Clock className="mr-2 h-4 w-4" />
        Dostępne Q4 2025
      </div>
    </div>
  )
}


