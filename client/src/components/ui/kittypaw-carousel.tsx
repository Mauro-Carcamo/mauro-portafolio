
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface KittypawCarouselProps {
  showControls?: boolean;
  className?: string;
}

export const KittypawCarousel = ({ 
  showControls = true, 
  className = "w-full h-full" 
}: KittypawCarouselProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  // Array de imágenes para hacer más fácil agregar más fotos
  const kittypawImages = [
    "/attached_assets/1.jpg",
    "/attached_assets/2.jpg",
    "/attached_assets/3.jpg",
    "/attached_assets/4.jpg",
    "/attached_assets/5.jpg",
    "/attached_assets/6.jpg",
    "/attached_assets/7.jpg",
    "/attached_assets/8.jpg",
    "/attached_assets/9.jpg",
    "/attached_assets/10.jpg",

  ];

  return (
    <Carousel 
      className={className} 
      opts={{ loop: true }}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {kittypawImages.map((imageSrc, index) => (
          <CarouselItem key={index} className="flex items-center justify-center">
            <img 
              src={imageSrc} 
              alt={`Kittypaw - Vista ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {showControls && (
        <>
          <CarouselPrevious className="left-1 h-6 w-6" />
          <CarouselNext className="right-1 h-6 w-6" />
        </>
      )}
    </Carousel>
  );
};
