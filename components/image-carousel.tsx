"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageCarouselProps {
  images: string[]
  alt: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function ImageCarousel({ images, alt, autoPlay = false, autoPlayInterval = 3000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKpT8S9WAAAAABJRU5ErkJggg=="

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, images.length])

  useEffect(() => {
    setIsLoading(true)
  }, [currentIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  return (
    <div className="group relative w-full h-full">
      <div className="relative h-full bg-muted overflow-hidden">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-muted"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${alt} - Imagen ${currentIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "w-full h-full object-contain transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-flex"
              onClick={goToPrevious}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-flex"
              onClick={goToNext}
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Ir a imagen ${index + 1}`}
              className={[
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-background/70",
              ].join(" ")}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
