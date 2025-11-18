const getMatch = (html: string, regex: RegExp) => {
  const match = regex.exec(html)
  return match ? match[1].trim() : null
}

const getAllMatches = (html: string, regex: RegExp) => {
  const results: string[] = []
  let match
  const globalRegex = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : `${regex.flags}g`)
  while ((match = globalRegex.exec(html)) !== null) {
    if (match[1]) {
      results.push(match[1].trim())
    }
  }
  return results
}

const stripTags = (value: string) => {
  if (!value) return ""
  
  return value
    // Remove image URLs and data URLs
    .replace(/data:image\/[\w+]+;base64,[\s\S]*?/gi, " ")
    .replace(/data:image\/[\w+]+;charset=[\s\S]*?/gi, " ")
    .replace(/data:image\/svg\+xml[^"'\s)]*/gi, " ")
    .replace(/\/_next\/image[^"'\s)]*/gi, " ")
    .replace(/src=["'][^"']*["']/gi, " ")
    .replace(/href=["'][^"']*["']/gi, " ")
    // Remove JSX/React artifacts
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<span[^>]*class=["'][^"']*jsx[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi, "$1")
    .replace(/className=["'][^"']*["']/gi, " ")
    .replace(/class=["'][^"']*["']/gi, " ")
    // Remove JavaScript code patterns
    .replace(/document\.[\s\S]*?;/g, " ")
    .replace(/querySelector[\s\S]*?\)/g, " ")
    .replace(/addEventListener[\s\S]*?\)/g, " ")
    .replace(/function[\s\S]*?\{[\s\S]*?\}/g, " ")
    .replace(/=>[\s\S]*?\)/g, " ")
    // Decode HTML entities (more comprehensive)
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x3D;/g, "=")
    .replace(/&#x3C;/g, "<")
    .replace(/&#x3E;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&#x[0-9a-f]+;/gi, " ")
    .replace(/&#[0-9]+;/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&[a-z]+;/gi, " ")
    // Remove HTML tags
    .replace(/<[^>]+>/g, " ")
    // Remove URLs
    .replace(/https?:\/\/[^\s]+/gi, " ")
    // Remove emoji and special characters that might be in URLs
    .replace(/[🇵🇱👤📅]/g, " ")
    // Clean up whitespace
    .replace(/\s+/g, " ")
    .trim()
}

const sanitizeHtml = (html: string) => {
  if (!html) return ""
  
  return html
    // Remove scripts, styles, noscript (more aggressive)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?>[\s\S]*?<\/noscript>/gi, " ")
    // Remove image URLs and data URLs
    .replace(/data:image\/[\w+]+;base64,[\s\S]*?/gi, " ")
    .replace(/data:image\/[\w+]+;charset=[\s\S]*?/gi, " ")
    .replace(/data:image\/svg\+xml[^"'\s)]*/gi, " ")
    .replace(/\/_next\/image[^"'\s)]*/gi, " ")
    .replace(/src=["'][^"']*["']/gi, " ")
    .replace(/srcset=["'][^"']*["']/gi, " ")
    .replace(/href=["'][^"']*["']/gi, " ")
    // Remove inline event handlers
    .replace(/on\w+=["'][^"']*["']/gi, " ")
    // Remove JavaScript code patterns in text content
    .replace(/document\.[\s\S]*?;/g, " ")
    .replace(/querySelector[\s\S]*?\)/g, " ")
    .replace(/addEventListener[\s\S]*?\)/g, " ")
    .replace(/forEach[\s\S]*?\)/g, " ")
    .replace(/\.appendChild[\s\S]*?\)/g, " ")
    .replace(/function[\s\S]*?\{[\s\S]*?\}/g, " ")
    .replace(/=>[\s\S]*?\)/g, " ")
    // Remove JSX/React comments
    .replace(/<!--[\s\S]*?-->/g, " ")
    // Remove React/JSX class names and attributes
    .replace(/className=["'][^"']*["']/gi, " ")
    .replace(/class=["'][^"']*["']/gi, " ")
    .replace(/jsx-[a-z0-9]+/gi, " ")
    // Remove HTML tags
    .replace(/<[^>]+>/g, " ")
    // Decode HTML entities (more comprehensive)
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x3D;/g, "=")
    .replace(/&#x3C;/g, "<")
    .replace(/&#x3E;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&#x[0-9a-f]+;/gi, " ")
    .replace(/&#[0-9]+;/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&[a-z]+;/gi, " ")
    // Remove URLs
    .replace(/https?:\/\/[^\s]+/gi, " ")
    // Remove emoji
    .replace(/[🇵🇱👤📅]/g, " ")
    // Remove specific JavaScript patterns that are clearly code
    .replace(/document\.querySelector[\s\S]*?\)/g, " ")
    .replace(/document\.querySelectorAll[\s\S]*?\)/g, " ")
    .replace(/\.forEach\([\s\S]*?\)/g, " ")
    .replace(/\.appendChild\([\s\S]*?\)/g, " ")
    // Clean up whitespace
    .replace(/\s+/g, " ")
    .trim()
}

const truncate = (text: string, maxLength: number) =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength - 3)}...`

type ScrapedSection = {
  title?: string | null
  description?: string | null
  hero?: string | null
  offerings: string[]
  productHighlights: string[]
  pricingHighlights: string[]
  faqHighlights: string[]
  text: string
  phones: string[]
  emails: string[]
  address?: string | null
  businessHours?: string | null
  sourcePath?: string
}

const fetchWithTimeout = async (url: string, timeoutMs: number = 7000) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Yieldo-Onboarding-Contextbot/1.0" },
      signal: controller.signal
    })
    return response.ok ? await response.text() : null
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

const scrapePage = async (url: string, origin: string): Promise<ScrapedSection | null> => {
  const html = await fetchWithTimeout(url)
  if (!html) {
    return null
  }

  const title =
    getMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i) ||
    getMatch(html, /<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
  const description =
    getMatch(html, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    getMatch(html, /<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
  const hero =
    getMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
    getMatch(html, /<meta[^>]+property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i)

  const headingRegex = /<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi
  const sections: Array<{ title: string; html: string }> = []
  let headingMatch
  while ((headingMatch = headingRegex.exec(html)) !== null) {
    const sectionStart = headingMatch.index + headingMatch[0].length
    const sectionEnd = headingRegex.lastIndex < html.length ? headingRegex.lastIndex : html.length
    sections.push({
      title: stripTags(headingMatch[2]),
      html: html.slice(sectionStart, sectionEnd)
    })
  }

  const headings = sections
    .map((section) => section.title)
    .filter(Boolean)
    .filter((h) => {
      const cleaned = h.toLowerCase()
      // Filter out JavaScript code, navigation items, and common non-content headings
      return (
        !cleaned.includes("document.") &&
        !cleaned.includes("queryselector") &&
        !cleaned.includes("addeventlistener") &&
        !cleaned.includes("function") &&
        !cleaned.includes("=>") &&
        !cleaned.includes("produkty") && // Navigation item
        !cleaned.includes("o nas") && // Navigation item
        !cleaned.includes("kontakt") && // Navigation item
        h.length < 100 // Reasonable length limit
      )
    })
    .slice(0, 8)

  const listItems = getAllMatches(html, /<li[^>]*>([\s\S]*?)<\/li>/gi)
    .map(stripTags)
    .filter((item) => {
      const cleaned = item.toLowerCase()
      // Filter out JavaScript, navigation, and invalid content
      return (
        item.length > 20 &&
        item.length < 200 && // Reasonable length limit
        !cleaned.includes("document.") &&
        !cleaned.includes("queryselector") &&
        !cleaned.includes("addeventlistener") &&
        !cleaned.includes("function") &&
        !cleaned.includes("=>") &&
        !cleaned.includes("produkty") &&
        !cleaned.includes("o nas") &&
        !cleaned.includes("kontakt") &&
        !cleaned.includes("rozwiązania") && // Too generic
        !cleaned.match(/^[a-z\s]+$/) || cleaned.length > 30 // Not just lowercase letters or has meaningful content
      )
    })
    .slice(0, 12)

  const text = sanitizeHtml(html)

  const phones = [...new Set((text.match(/\+?\d[\d\s-]{7,}\d/g) || []).map((s) => s.trim()))].slice(0, 3)
  const emails = [...new Set((text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []).map((s) => s.trim()))].slice(0, 2)
  const address = (() => {
    const lines = text.split(/[\.\n]/).map((line) => line.trim())
    return lines.find((line) => /ul\.|street|st\.|ave|al\./i.test(line)) || null
  })()
  
  // Extract business hours
  const businessHours = (() => {
    const hourPatterns = [
      // Polish format: Pon-Pt 9:00-17:00, Sob 10:00-14:00
      /(?:pon|wt|śr|czw|pt|sob|niedz)[\s-]*(?:pon|wt|śr|czw|pt|sob|niedz)?[\s-]*(?:pon|wt|śr|czw|pt|sob|niedz)?[\s:]*\d{1,2}:\d{2}[\s-]*-?[\s-]*\d{1,2}:\d{2}/gi,
      // English format: Mon-Fri 9:00-17:00
      /(?:mon|tue|wed|thu|fri|sat|sun)[\s-]*(?:mon|tue|wed|thu|fri|sat|sun)?[\s-]*(?:mon|tue|wed|thu|fri|sat|sun)?[\s:]*\d{1,2}:\d{2}[\s-]*-?[\s-]*\d{1,2}:\d{2}/gi,
      // Simple format: 9:00-17:00
      /\d{1,2}:\d{2}[\s-]*-?[\s-]*\d{1,2}:\d{2}/g,
      // With days: Poniedziałek-Piątek 9-17
      /(?:poniedziałek|wtorek|środa|czwartek|piątek|sobota|niedziela)[\s-]*(?:poniedziałek|wtorek|środa|czwartek|piątek|sobota|niedziela)?[\s-]*\d{1,2}[\s-]*-?[\s-]*\d{1,2}/gi
    ]
    
    for (const pattern of hourPatterns) {
      const matches = text.match(pattern)
      if (matches && matches.length > 0) {
        // Find the most complete match (longest)
        const bestMatch = matches.reduce((a, b) => (a.length > b.length ? a : b))
        // Clean up the match
        const cleaned = bestMatch
          .replace(/\s+/g, " ")
          .trim()
        if (cleaned.length > 5 && cleaned.length < 100) {
          return cleaned
        }
      }
    }
    
    // Look for common hour keywords
    const hourKeywords = ["godziny", "otwarte", "czynne", "hours", "open", "closed"]
    const hourSections = sections
      .filter((s) => hourKeywords.some((kw) => s.title.toLowerCase().includes(kw)))
      .map((s) => stripTags(s.html))
      .join(" ")
    
    if (hourSections) {
      const hourMatch = hourSections.match(/\d{1,2}:\d{2}[\s-]*-?[\s-]*\d{1,2}:\d{2}/g)
      if (hourMatch && hourMatch.length > 0) {
        return hourMatch[0].trim()
      }
    }
    
    return null
  })()

  const productKeywords = ["oferta", "usług", "produk", "plan", "pakiet", "feature", "benefit"]
  const priceKeywords = ["cennik", "price", "koszt", "pakiet", "plan", "mies", "pln", "usd", "eur", "zł"]
  const faqKeywords = ["faq", "pytania", "najczęstsze", "jak to działa", "question", "q&a"]

  const productHighlights: string[] = []
  const pricingHighlights: string[] = []
  const faqHighlights: string[] = []

  const addUnique = (arr: string[], value: string, limit: number) => {
    const normalized = value.trim()
    if (!normalized) return
    if (!arr.some((entry) => entry.toLowerCase() === normalized.toLowerCase()) && arr.length < limit) {
      arr.push(normalized)
    }
  }

  const sectionContainsPrice = (value: string) =>
    /(\d[\d\s.,]*(?:zł|pln|usd|eur|€|\$|£|mies))/i.test(value)

  sections.forEach((section) => {
    const lowerTitle = section.title.toLowerCase()
    const items = getAllMatches(section.html, /<li[^>]*>([\s\S]*?)<\/li>/gi).map(stripTags)
    const sentences = items.length
      ? items
      : stripTags(section.html)
          .split(/(?<=\.)\s+/)
          .slice(0, 6)

    if (productKeywords.some((keyword) => lowerTitle.includes(keyword)) || items.length) {
      sentences.forEach((line) => {
        if (line.length > 30) {
          addUnique(productHighlights, line, 12)
        }
      })
    }

    if (priceKeywords.some((keyword) => lowerTitle.includes(keyword)) || sentences.some(sectionContainsPrice)) {
      sentences.forEach((line) => {
        if (sectionContainsPrice(line)) {
          addUnique(pricingHighlights, line, 8)
        }
      })
    }

    if (faqKeywords.some((keyword) => lowerTitle.includes(keyword))) {
      sentences.forEach((line) => {
        const parts = line.split("?")
        if (parts.length > 1) {
          const question = `${parts[0].trim()}?`
          const answer = parts.slice(1).join("?").trim()
          addUnique(faqHighlights, `${question} ${answer}`.trim(), 8)
        } else if (line.length > 50) {
          addUnique(faqHighlights, line, 8)
        }
      })
    }
  })

  // Additional cleaning and deduplication of offerings
  const allOfferings = [...headings, ...listItems]
    .map((item) => {
      // Clean the item
      let cleaned = stripTags(item)
      // Remove any remaining patterns
      cleaned = cleaned
        .replace(/document\.[\s\S]*?/g, "")
        .replace(/querySelector[\s\S]*?/g, "")
        .replace(/addEventListener[\s\S]*?/g, "")
        .replace(/forEach[\s\S]*?/g, "")
        .replace(/\.appendChild[\s\S]*?/g, "")
        .replace(/data:image[\s\S]*?/g, "") // Remove data URLs
        .replace(/\/_next\/[\s\S]*?/g, "") // Remove Next.js paths
        .replace(/w=\d+&q=\d+/g, "") // Remove image query params
        .replace(/srcset=["'][^"']*["']/gi, "") // Remove srcset
        .replace(/[🇵🇱👤📅]/g, "") // Remove emoji
        .replace(/\s+/g, " ")
        .trim()
      return cleaned
    })
    .filter((item) => {
      const cleaned = item.toLowerCase().trim()
      // Remove duplicates, empty items, and invalid content
      return (
        cleaned.length > 10 &&
        cleaned.length < 200 && // Increased limit but will filter long ones below
        !cleaned.includes("document") &&
        !cleaned.includes("queryselector") &&
        !cleaned.includes("addeventlistener") &&
        !cleaned.includes("foreach") &&
        !cleaned.includes("appendchild") &&
        !cleaned.includes("data:image") &&
        !cleaned.includes("/_next/") &&
        !cleaned.includes("w=128") &&
        !cleaned.includes("srcset") &&
        !cleaned.includes("yieldo - rozwiązania") && // Too generic/repetitive
        !cleaned.match(/^[a-z\s\-]+$/) || cleaned.length > 30 // Has meaningful content
      )
    })
    // Filter out items that are too long (likely contain entire page content)
    .filter((item) => {
      const words = item.split(/\s+/).length
      return words < 50 // Reasonable limit for a single offering
    })
  
  // Deduplicate while preserving order
  const uniqueOfferings = Array.from(
    new Map(allOfferings.map((item) => [item.toLowerCase().trim(), item])).values()
  )
    .filter((item) => {
      // Final check: remove items that are still too long or contain suspicious patterns
      const cleaned = item.toLowerCase().trim()
      return (
        item.trim().length > 0 &&
        item.length < 200 &&
        !cleaned.includes("produkty o nas rozwiązania") &&
        !cleaned.includes("ciagle budujemy") &&
        !cleaned.includes("zobacz wiecej")
      )
    })
    .slice(0, 10)

  return {
    title: title ? stripTags(title) : null,
    description: description ? stripTags(description) : null,
    hero: hero ? stripTags(hero) : null,
    offerings: uniqueOfferings,
    productHighlights: productHighlights
      .map((item) => stripTags(item))
      .filter((item) => {
        const cleaned = item.toLowerCase()
        return (
          item.length > 20 &&
          item.length < 200 &&
          !cleaned.includes("document.") &&
          !cleaned.includes("queryselector")
        )
      }),
    pricingHighlights: pricingHighlights.map((item) => stripTags(item)),
    faqHighlights: faqHighlights.map((item) => stripTags(item)),
    text,
    phones,
    emails,
    address,
    businessHours,
    sourcePath: url.replace(origin, "")
  }
}

const fetchSitemapUrls = async (origin: string): Promise<string[]> => {
  const candidates = [`${origin}/sitemap.xml`]
  const robots = await fetchWithTimeout(`${origin}/robots.txt`)
  if (robots) {
    robots
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.toLowerCase().startsWith("sitemap:"))
      .map((line) => line.split(":")[1]?.trim())
      .filter(Boolean)
      .forEach((entry) => candidates.push(entry as string))
  }

  for (const sitemapUrl of candidates) {
    if (!sitemapUrl) continue
    const xml = await fetchWithTimeout(sitemapUrl)
    if (!xml) continue

    const urls = Array.from(xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi))
      .map((match) => match[1].trim())
      .filter(Boolean)
    if (urls.length) {
      return urls
    }
  }

  return []
}

const selectRelevantPages = (urls: string[], origin: string): string[] => {
  const keywordGroups = [
    { keywords: ["cennik", "pricing", "pakiet", "plan"], limit: 2 },
    { keywords: ["oferta", "uslug", "service", "product"], limit: 3 },
    { keywords: ["faq", "questions", "jak-to-dziala"], limit: 2 },
    { keywords: ["case", "testimonial", "klient"], limit: 1 },
    { keywords: ["kontakt", "contact"], limit: 1 }
  ]

  const normalizedUrls = urls.filter((url) => url.startsWith(origin))
  const selected = new Set<string>([origin])

  keywordGroups.forEach(({ keywords, limit }) => {
    normalizedUrls
      .filter((url) => keywords.some((keyword) => url.toLowerCase().includes(keyword)))
      .slice(0, limit)
      .forEach((url) => selected.add(url))
  })

  normalizedUrls.slice(0, 3).forEach((url) => selected.add(url))

  return Array.from(selected).slice(0, 10)
}

const buildContextFromSections = (sections: ScrapedSection[]): string => {
  const combined = sections.reduce(
    (acc, section) => {
      acc.title ??= section.title ?? undefined
      acc.description ??= section.description ?? undefined
      acc.hero ??= section.hero ?? undefined
      acc.offerings.push(...section.offerings)
      acc.productHighlights.push(
        ...section.productHighlights.map((line) =>
          section.sourcePath ? `${line} (źródło: ${section.sourcePath})` : line
        )
      )
      acc.pricingHighlights.push(
        ...section.pricingHighlights.map((line) =>
          section.sourcePath ? `${line} (źródło: ${section.sourcePath})` : line
        )
      )
      acc.faqHighlights.push(
        ...section.faqHighlights.map((line) =>
          section.sourcePath ? `${line} (źródło: ${section.sourcePath})` : line
        )
      )
      acc.text += ` ${section.text}`
      acc.phones.push(...section.phones)
      acc.emails.push(...section.emails)
      acc.address ??= section.address ?? undefined
      acc.businessHours ??= section.businessHours ?? undefined
      return acc
    },
    {
      title: undefined as string | undefined,
      description: undefined as string | undefined,
      hero: undefined as string | undefined,
      offerings: [] as string[],
      productHighlights: [] as string[],
      pricingHighlights: [] as string[],
      faqHighlights: [] as string[],
      text: "",
      phones: [] as string[],
      emails: [] as string[],
      address: undefined as string | undefined,
      businessHours: undefined as string | undefined
    }
  )

  const unique = <T,>(arr: T[], limit: number) => Array.from(new Set(arr)).slice(0, limit)

  const sectionsOutput = [
    [
      "### Brand Snapshot",
      combined.title ? `- Nazwa: ${combined.title}` : null,
      combined.description ? `- Opis: ${combined.description}` : null,
      combined.hero ? `- Główny nagłówek: ${combined.hero}` : null
    ]
      .flat()
      .filter(Boolean)
      .join("\n") || null,
    unique(combined.offerings, 10).length
      ? [
          "### Kluczowe produkty i usługi",
          ...unique(combined.offerings, 10).map((item) => `- ${item}`)
        ].join("\n")
      : null,
    unique(combined.productHighlights, 8).length
      ? [
          "### Szczegóły oferty",
          ...unique(combined.productHighlights, 8).map((line) => `- ${line}`)
        ].join("\n")
      : null,
    unique(combined.pricingHighlights, 6).length
      ? [
          "### Cennik i pakiety",
          ...unique(combined.pricingHighlights, 6).map((line) => `- ${line}`)
        ].join("\n")
      : null,
    combined.businessHours
      ? `### Godziny otwarcia\n- ${combined.businessHours}`
      : null,
    (combined.phones.length || combined.emails.length || combined.address)
      ? [
          "### Dane kontaktowe",
          combined.phones.length ? `- Telefon: ${unique(combined.phones, 3).join(", ")}` : null,
          combined.emails.length ? `- Email: ${unique(combined.emails, 2).join(", ")}` : null,
          combined.address ? `- Adres: ${combined.address}` : null
        ]
          .filter(Boolean)
          .join("\n")
      : null,
    unique(combined.faqHighlights, 6).length
      ? [
          "### FAQ i najczęstsze pytania",
          ...unique(combined.faqHighlights, 6).map((entry) => `- ${entry}`)
        ].join("\n")
      : null,
    combined.text ? `### Dodatkowe informacje z witryny\n${truncate(combined.text, 1500)}` : null
  ].filter(Boolean)

  return sectionsOutput.join("\n\n")
}

// Format phone number for TTS (e.g., "+48 123 456 789" -> "+ czterdzieści osiem... jeden dwa trzy... czterysta pięćdziesiąt sześć... siedemset osiemdziesiąt dziewięć")
const formatPhoneForTTS = (phone: string): string => {
  // For now, just add pauses between groups
  return phone.replace(/(\d{3})/g, "$1... ").trim()
}

// Format email for TTS (e.g., "info@example.com" -> "info at example dot com")
const formatEmailForTTS = (email: string): string => {
  return email
    .replace(/@/g, " at ")
    .replace(/\./g, " kropka ")
    .replace(/_/g, " podkreślenie ")
    .replace(/-/g, " myślnik ")
}

// Build receptionist-focused knowledge context with TTS-friendly formatting
export const buildReceptionistKnowledgeContext = (
  title: string | undefined,
  description: string | undefined,
  hero: string | undefined,
  offerings: string[],
  productHighlights: string[],
  pricingHighlights: string[],
  faqHighlights: string[],
  phones: string[],
  emails: string[],
  address: string | undefined,
  businessHours: string | undefined
): string => {
  const sections: string[] = []

  // Company Overview
  const companyInfo: string[] = []
  if (title) companyInfo.push(`Nazwa firmy: ${title}`)
  if (description) companyInfo.push(`Opis: ${description}`)
  if (hero) companyInfo.push(`Główny przekaz: ${hero}`)
  
  if (companyInfo.length > 0) {
    sections.push(`## Przegląd firmy\n\n${companyInfo.join("\n")}`)
  }

  // Services & Offerings
  if (offerings.length > 0) {
    // Additional filtering for clean, meaningful offerings
    const cleanOfferings = Array.from(new Set(offerings))
      .map((item) => {
        // Final cleanup pass
        return item
          .replace(/data:image[\s\S]*?/g, "")
          .replace(/\/_next\/[\s\S]*?/g, "")
          .replace(/w=\d+&q=\d+/g, "")
          .replace(/srcset=["'][^"']*["']/gi, "")
          .replace(/[🇵🇱👤📅]/g, "")
          .replace(/\s+/g, " ")
          .trim()
      })
      .filter((item) => {
        const cleaned = item.toLowerCase().trim()
        const words = item.split(/\s+/).length
        return (
          cleaned.length > 10 &&
          cleaned.length < 200 &&
          words < 50 && // Not too many words
          !cleaned.includes("document") &&
          !cleaned.includes("queryselector") &&
          !cleaned.includes("data:image") &&
          !cleaned.includes("/_next/") &&
          !cleaned.includes("w=128") &&
          !cleaned.includes("srcset") &&
          !cleaned.includes("yieldo - rozwiązania") && // Too generic
          !cleaned.includes("produkty o nas") &&
          !cleaned.includes("ciagle budujemy") &&
          !cleaned.match(/^[a-z\s\-]+$/) || cleaned.length > 30 // Has meaningful content
        )
      })
      .slice(0, 10)
    
    if (cleanOfferings.length > 0) {
      sections.push(
        `## Usługi i oferta\n\n${cleanOfferings.map((item) => `- ${item}`).join("\n")}`
      )
    }
  }

  // Product Details
  if (productHighlights.length > 0) {
    const uniqueHighlights = Array.from(new Set(productHighlights)).slice(0, 8)
    sections.push(
      `## Szczegóły oferty\n\n${uniqueHighlights.map((item) => `- ${item}`).join("\n")}`
    )
  }

  // Pricing & Packages
  if (pricingHighlights.length > 0) {
    const uniquePricing = Array.from(new Set(pricingHighlights)).slice(0, 6)
    sections.push(
      `## Cennik i pakiety\n\n${uniquePricing.map((item) => `- ${item}`).join("\n")}`
    )
  }

  // Business Hours & Availability
  if (businessHours) {
    sections.push(`## Godziny otwarcia\n\n- ${businessHours}`)
  }

  // Contact Information (TTS-formatted)
  const contactInfo: string[] = []
  if (phones.length > 0) {
    const uniquePhones = Array.from(new Set(phones)).slice(0, 3)
    contactInfo.push(
      `Telefon: ${uniquePhones.map((p) => formatPhoneForTTS(p)).join(" lub ")}`
    )
  }
  if (emails.length > 0) {
    const uniqueEmails = Array.from(new Set(emails)).slice(0, 2)
    contactInfo.push(
      `Email: ${uniqueEmails.map((e) => formatEmailForTTS(e)).join(" lub ")}`
    )
  }
  if (address) {
    contactInfo.push(`Adres: ${address}`)
  }
  
  if (contactInfo.length > 0) {
    sections.push(`## Informacje kontaktowe\n\n${contactInfo.join("\n")}`)
  }

  // Location & Directions
  if (address) {
    sections.push(`## Lokalizacja\n\n- ${address}`)
  }

  // Common Questions
  if (faqHighlights.length > 0) {
    const uniqueFAQs = Array.from(new Set(faqHighlights)).slice(0, 6)
    sections.push(
      `## Najczęściej zadawane pytania\n\n${uniqueFAQs.map((item) => `- ${item}`).join("\n")}`
    )
  }

  return sections.join("\n\n")
}

export type StructuredWebsiteData = {
  title?: string
  description?: string
  hero?: string
  offerings: string[]
  productHighlights: string[]
  pricingHighlights: string[]
  faqHighlights: string[]
  phones: string[]
  emails: string[]
  address?: string
  businessHours?: string
}

export const buildWebsiteContext = async (url: string): Promise<string | null> => {
  const parsed = new URL(url)
  const origin = `${parsed.protocol}//${parsed.host}`

  const sitemapUrls = await fetchSitemapUrls(origin)
  const pages = sitemapUrls.length ? selectRelevantPages(sitemapUrls, origin) : [origin]

  const sections: ScrapedSection[] = []
  for (const page of pages) {
    const section = await scrapePage(page, origin)
    if (section) {
      sections.push(section)
    }
  }

  if (sections.length === 0) {
    const fallback = await scrapePage(url, origin)
    if (!fallback) {
      return null
    }
    sections.push(fallback)
  }

  return buildContextFromSections(sections)
}

export const getStructuredWebsiteData = async (url: string): Promise<StructuredWebsiteData | null> => {
  const parsed = new URL(url)
  const origin = `${parsed.protocol}//${parsed.host}`

  const sitemapUrls = await fetchSitemapUrls(origin)
  const pages = sitemapUrls.length ? selectRelevantPages(sitemapUrls, origin) : [origin]

  const sections: ScrapedSection[] = []
  for (const page of pages) {
    const section = await scrapePage(page, origin)
    if (section) {
      sections.push(section)
    }
  }

  if (sections.length === 0) {
    const fallback = await scrapePage(url, origin)
    if (!fallback) {
      return null
    }
    sections.push(fallback)
  }

  const combined = sections.reduce(
    (acc, section) => {
      acc.title ??= section.title ?? undefined
      acc.description ??= section.description ?? undefined
      acc.hero ??= section.hero ?? undefined
      acc.offerings.push(...section.offerings)
      acc.productHighlights.push(...section.productHighlights)
      acc.pricingHighlights.push(...section.pricingHighlights)
      acc.faqHighlights.push(...section.faqHighlights)
      acc.phones.push(...section.phones)
      acc.emails.push(...section.emails)
      acc.address ??= section.address ?? undefined
      acc.businessHours ??= section.businessHours ?? undefined
      return acc
    },
    {
      title: undefined as string | undefined,
      description: undefined as string | undefined,
      hero: undefined as string | undefined,
      offerings: [] as string[],
      productHighlights: [] as string[],
      pricingHighlights: [] as string[],
      faqHighlights: [] as string[],
      phones: [] as string[],
      emails: [] as string[],
      address: undefined as string | undefined,
      businessHours: undefined as string | undefined
    }
  )

  const unique = <T,>(arr: T[], limit: number) => Array.from(new Set(arr)).slice(0, limit)

  return {
    title: combined.title,
    description: combined.description,
    hero: combined.hero,
    offerings: unique(combined.offerings, 10),
    productHighlights: unique(combined.productHighlights, 8),
    pricingHighlights: unique(combined.pricingHighlights, 6),
    faqHighlights: unique(combined.faqHighlights, 6),
    phones: unique(combined.phones, 3),
    emails: unique(combined.emails, 2),
    address: combined.address,
    businessHours: combined.businessHours
  }
}

