import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const VISIBLE_COUNT = 3

const Carousel = ({ data = [], getLink }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const maxIndex = Math.max(0, data.length - VISIBLE_COUNT)

  const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1))
  const handleNext = () => setActiveIndex((prev) => Math.min(maxIndex, prev + 1))

  const visibleItems = data.slice(activeIndex, activeIndex + VISIBLE_COUNT)

  return (
    <div className="flex items-center gap-4 py-6">
      <button
        onClick={handlePrev}
        disabled={activeIndex === 0}
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                   bg-primary text-primary-foreground
                   transition-all duration-200
                   disabled:opacity-30 disabled:cursor-not-allowed
                   hover:bg-accent hover:text-accent-foreground"
        aria-label="Sebelumnya"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {visibleItems.map((item, i) => (
          <ArticleCard
            key={item.id ?? i}
            item={item}
            link={getLink ? getLink(item) : null}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={activeIndex >= maxIndex}
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                   bg-primary text-primary-foreground
                   transition-all duration-200
                   disabled:opacity-30 disabled:cursor-not-allowed
                   hover:bg-accent hover:text-accent-foreground"
        aria-label="Berikutnya"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

const ArticleCard = ({ item, link }) => {
  const navigate = useNavigate()
  const image = item.hero?.url

  return (
    <Card
      onClick={() => link && navigate(link)}
      className="relative flex-1 min-w-0 overflow-hidden rounded-2xl border-0
                 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl select-none"
      style={{
        aspectRatio: "9 / 14",
        cursor: link ? "pointer" : "default",
      }}
    >
      <img
        src={image}
        alt={item.title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1.5">
        {item.category && (
          <span className="self-start text-[10px] font-bold uppercase tracking-widest
                           bg-accent text-accent-foreground px-2 py-0.5 rounded">
            {item.category}
          </span>
        )}
        <p className="text-white font-semibold text-sm leading-snug line-clamp-3 drop-shadow-md">
          {item.title}
        </p>
      </div>
    </Card>
  )
}

export default Carousel