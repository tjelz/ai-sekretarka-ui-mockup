"use client"

import { OrganizationSchema, BreadcrumbSchema, WebPageSchema } from "@/components/seo"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/landing/ProductCard"
import { ComingSoonCard } from "@/components/landing/ComingSoonCard"
import { AnimatedHeroBackground } from "@/components/landing/AnimatedHeroBackground"
import { FloatingHeroIcons } from "@/components/landing/FloatingHeroIcons"
import BespokeSolutionsSection from "@/components/landing/BespokeSolutionsSection"
import { Phone, TrendingUp, Globe, BarChart3, CheckCircle2, Zap, Shield, ArrowRight, Star, Calendar, Users, Search } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden font-sans selection:bg-primary/20">
      {/* SEO */}
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Strona Główna', url: 'https://www.yieldo.pl' }
      ]} />
      <WebPageSchema
        name="Yieldo - AI Sekretarka i Rozwiązania dla Firm"
        description="Kompleksowe rozwiązania AI dla nowoczesnych firm. AI Sekretarka 24/7, automatyczne umawianie wizyt, integracje z kalendarzami."
        url="https://www.yieldo.pl"
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-white">
        <AnimatedHeroBackground />
        <FloatingHeroIcons />

        <motion.div 
          className="container mx-auto max-w-5xl text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm text-slate-600 text-sm font-semibold mb-8 hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Przyszłość Automatyzacji
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.05] drop-shadow-sm"
          >
            Twoja Firma <br/>
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-700 to-indigo-800">
                Na Autopilocie
              </span>
              {/* Techy underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-primary/10 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 L 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="10 5" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Inteligentni agenci AI, którzy <span className="text-slate-900 font-semibold">odbierają telefony</span>, <span className="text-slate-900 font-semibold">optymalizują dotacje</span> i <span className="text-slate-900 font-semibold">budują wizerunek</span>.
            Zwiększ zyski bez zatrudniania nowych pracowników.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Button size="lg" className="h-16 px-10 text-xl rounded-xl shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1 bg-slate-900 hover:bg-slate-800 text-white border-0 group" asChild>
                <Link href="#produkty">
                    Poznaj Rozwiązania
                    <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur hover:bg-slate-50 text-slate-700 hover:text-primary transition-all hover:-translate-y-1" asChild>
                <Link href="https://calendly.com/info-yieldo/ai-recepcjonistka" target="_blank">
                    <Calendar className="mr-2 w-5 h-5" />
                    Umów Demo
                </Link>
            </Button>
          </motion.div>
          
          {/* Trust / Social Proof */}
          <motion.div variants={fadeInUp} className="mt-20 pt-8 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">Zaufali nam liderzy branży</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex items-center gap-2 font-bold text-xl text-slate-700"><Globe className="w-6 h-6" /> GlobalCorp</div>
               <div className="flex items-center gap-2 font-bold text-xl text-slate-700"><Zap className="w-6 h-6" /> FastTech</div>
               <div className="flex items-center gap-2 font-bold text-xl text-slate-700"><Shield className="w-6 h-6" /> SecureNet</div>
               <div className="flex items-center gap-2 font-bold text-xl text-slate-700"><Users className="w-6 h-6" /> TeamWork</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Products Grid (Bento) - Enhanced */}
      <section id="produkty" className="py-32 px-4 relative bg-slate-50/50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="container mx-auto max-w-7xl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-20 text-center"
            >
                <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Platforma Yieldo</span>
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900">Jeden system, <br/>wiele możliwości</h2>
                <p className="text-slate-500 text-xl max-w-2xl mx-auto">Kompleksowe narzędzia do automatyzacji i rozwoju Twojego biznesu.</p>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } }
                }}
            >
                {/* Active Product - AI Sekretarka */}
                <motion.div variants={fadeInUp} className="md:col-span-2 row-span-2 h-full">
                    <ProductCard
                        className="h-full min-h-[450px] border-slate-200 bg-white hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1 group"
                        title="AI Sekretarka"
                        description="Inteligentna recepcjonistka, która odbiera każdy telefon, umawia wizyty w Twoim kalendarzu (Booksy, Google) i odpowiada na pytania klientów. Działa 24/7, nigdy nie choruje i mówi ludzkim głosem."
                        href="/ai-sekretarka"
                        icon={<Phone className="h-10 w-10" />}
                        badges={['Bestseller', 'Dostępne Teraz']}
                    />
                </motion.div>

                {/* Coming Soon Product 1: Digital Presence */}
                <motion.div variants={fadeInUp} className="h-full">
                    <ComingSoonCard
                        title="Digital Presence"
                        description="Kompleksowy pakiet: profesjonalna strona www + optymalizacja Profilu Firmy w Google."
                        icon={<Globe className="h-8 w-8" />}
                        className="h-full bg-slate-50/80 backdrop-blur-sm border-slate-200"
                    />
                </motion.div>
                
                {/* Coming Soon Product 2: Grant Automation */}
                <motion.div variants={fadeInUp} className="h-full">
                    <ComingSoonCard
                        title="Grant Automation"
                        description="Automatyczne wyszukiwanie idealnych grantów i dotacji dla Twojej firmy. Oszczędzaj czas i nie przegap okazji."
                        icon={<Search className="h-8 w-8" />}
                        className="h-full bg-slate-50/80 backdrop-blur-sm border-slate-200"
                    />
                </motion.div>
                
                {/* Placeholder/Future Product */}
                <motion.div variants={fadeInUp} className="md:col-span-3">
                    <ComingSoonCard
                        title="AI Analityka Biznesowa"
                        description="Zaawansowana analiza danych z rozmów i interakcji. Wnioski, które pomagają podejmować lepsze decyzje."
                        icon={<BarChart3 className="h-8 w-8" />}
                        className="bg-gradient-to-r from-slate-50 to-white border-slate-200"
                    />
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Bespoke Solutions Section */}
      <section id="rozwiazania">
        <BespokeSolutionsSection />
      </section>

      {/* Value Props - Horizontal Scroll / Cards */}
      <section className="py-32 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50/30 -z-10" />
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-slate-900">
                        Dlaczego <span className="text-primary">Yieldo?</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Łączymy zaawansowaną technologię z prostotą użytkowania.
                        Yieldo zmienia zasady gry, oferując rozwiązania enterprise dla każdej firmy.
                    </p>
                    <Button variant="outline" size="lg" className="rounded-xl border-2 text-slate-700">
                        Poznaj naszą technologię
                    </Button>
                </motion.div>
                <div className="grid grid-cols-2 gap-6">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                     >
                        <div className="text-4xl font-black text-slate-900 mb-2">24/7</div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Dostępność</div>
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, delay: 0.1 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                     >
                        <div className="text-4xl font-black text-slate-900 mb-2">-80%</div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Kosztów</div>
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                     >
                        <div className="text-4xl font-black text-slate-900 mb-2">5 min</div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Wdrożenie</div>
                     </motion.div>
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, delay: 0.3 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                     >
                        <div className="text-4xl font-black text-slate-900 mb-2">99%</div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Satysfakcja</div>
                     </motion.div>
                </div>
            </div>
            
            <motion.div 
                className="grid md:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                {[
                    { title: "Szybki Start", desc: "Bez skomplikowanych konfiguracji. Rejestrujesz się i działasz.", icon: Zap },
                    { title: "Technologia LLM", desc: "Wykorzystujemy najnowsze modele językowe dla naturalnej komunikacji.", icon: Star },
                    { title: "Bezpieczeństwo", desc: "Szyfrowanie danych i pełna zgodność z RODO.", icon: Shield }
                ].map((item, i) => (
                    <motion.div key={i} variants={fadeInUp} className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className={`w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* CTA Section - Tech Style */}
      <section id="kontakt" className="py-32 px-4 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.07]" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight"
            >
                Gotowy na transformację?
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, delay: 0.1 }}
                className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto"
            >
                Dołącz do firm, które zautomatyzowały obsługę klienta z Yieldo. 
                Pierwszy tydzień testów jest całkowicie darmowy.
            </motion.p>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Button size="lg" className="h-16 px-12 text-xl font-bold rounded-xl bg-primary hover:bg-blue-600 text-white transition-all shadow-lg shadow-primary/20" asChild>
                    <Link href="/ai-sekretarka">
                        Rozpocznij Darmowy Okres Próbny
                    </Link>
                </Button>
            </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
