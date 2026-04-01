'use client'

import { useApp } from '@/lib/app-context'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, ClipboardList, Droplets, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

const steps = [
  {
    icon: ClipboardList,
    title: 'Take the Quiz',
    description: 'Answer a few simple questions about your hair, scalp, and goals.',
  },
  {
    icon: Sparkles,
    title: 'Get Your Profile',
    description: 'Discover your hair type, porosity, and personalized insights.',
  },
  {
    icon: Droplets,
    title: 'Follow Your Routine',
    description: 'Receive a step-by-step routine tailored to your unique hair needs.',
  },
  {
    icon: ShoppingBag,
    title: 'Shop Products',
    description: 'Browse curated product picks that work for your specific hair type.',
  },
]

export function LandingPage() {
  const { setCurrentPage } = useApp()

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:gap-12 md:px-6 md:py-24">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Personalized Hair Care
            </div>
            <h1 className="text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
              Understand Your Hair. Transform Your Routine.
            </h1>
            <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground md:text-lg">
              Take our science-backed quiz to discover your hair type, get a personalized care routine, and find the products that actually work for you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => setCurrentPage('quiz')}
              >
                Take Hair Quiz
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentPage('login')}
              >
                Log In
              </Button>
            </div>
          </div>
          <div
            className="relative mx-auto w-full max-w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-lg [height:clamp(17.5rem,min(52dvh,92vw),45rem)] md:[height:clamp(20rem,min(50dvh,45vw),46rem)]"
          >
            <Image
              src="/firstpage.jpg"
              alt="Beautiful natural hair illuminated by warm golden light"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 36rem"
              className="object-contain object-center p-2 sm:p-4 md:p-5"
              priority
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Your journey to healthier hair in four simple steps.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-24">
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            Ready to Discover Your Hair Type?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground md:text-lg">
            Join thousands who have transformed their hair care journey with personalized, science-backed recommendations.
          </p>
          <Button
            size="lg"
            className="mt-8 gap-2"
            onClick={() => setCurrentPage('quiz')}
          >
            Start the Quiz
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:px-6">
          <p>Veda Cortex. Personalized hair care, backed by science.</p>
          <p>Built with care for every curl, wave, and coil.</p>
        </div>
      </footer>
    </main>
  )
}
