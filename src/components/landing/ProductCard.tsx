"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  badges?: string[]
  className?: string
}

export function ProductCard({
  title,
  description,
  icon,
  href,
  badges = [],
  className,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-xl bg-blue-50 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          {icon}
        </div>
        {badges.length > 0 && (
          <div className="flex gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="mt-6 flex items-center text-sm font-medium text-primary">
        Dowiedz się więcej
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}


