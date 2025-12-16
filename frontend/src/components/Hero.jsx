import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function Hero({
  badge,
  title,
  subtitle,
  description,
  ctaText = "READ MORE",
  ctaLink = "#",
  backgroundImage,
  onCtaClick,
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage || "/hero-bg.jpg"}
          alt="Hero Background"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.6) contrast(1.1)",
          }}
        />
        
        {/* Gradient Overlay - Natural Tropical */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              oklch(var(--primary) / 0.5) 0%,
              oklch(var(--secondary) / 0.4) 50%,
              oklch(var(--accent) / 0.3) 100%
            )`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl">
          {/* Badge (Optional) */}
          {badge && (
            <Badge
              variant="outline"
              className="mb-6 px-6 py-2 text-sm font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              {badge}
            </Badge>
          )}

          {/* Main Title */}
          <h1
            className="font-heading text-white mb-6 leading-none"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              letterSpacing: "0.05em",
              textShadow: "2px 4px 20px rgba(0, 0, 0, 0.6)",
            }}
          >
            {title || "THE AURORAS"}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2
              className="text-white/95 mb-8 font-body max-w-2xl pl-2"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                lineHeight: "1.5",
                textShadow: "1px 2px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              {subtitle}
            </h2>
          )}

          {/* Description (Optional) */}
          {description && (
            <p
              className="text-white/90 mb-8 font-body max-w-xl"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                lineHeight: "1.6",
                textShadow: "1px 2px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              {description}
            </p>
          )}

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-background hover:bg-[#00ACC1] text-black hover:text-black font-semibold uppercase tracking-wider transition-all duration-300 group px-10 py-6 text-sm"
            onClick={onCtaClick}
            asChild={!!ctaLink}
          >
            {ctaLink ? (
              <a href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator (Optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}