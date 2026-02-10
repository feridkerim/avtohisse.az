"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  date: string;
  images: string[];
  isPremium?: boolean;
}

export default function ProductCard({
  id,
  title,
  price,
  location,
  date,
  images = [],
  isPremium = false,
}: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      href={`/product/${id}`}
      className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg relative transition-all duration-300"
    >
      {isPremium && (
        <div className="absolute top-3 left-3 z-30 bg-yellow-400 text-white p-1 rounded-lg shadow-md flex items-center justify-center pointer-events-none">
          <Icon icon="mdi:crown" className="text-lg" />
        </div>
      )}

      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <Image
          src={images[currentIndex] || "/placeholder.png"}
          alt={title}
          fill
          className="object-contain p-4 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* DƏYİŞİKLİK: 'hidden md:flex' - Mobil cihazlarda bu zonalar tamamilə ləğv edilir */}
        <div className="absolute inset-0 z-10 hidden md:flex">
          {images.map((_, index) => (
            <div
              key={index}
              className="h-full flex-1 cursor-pointer"
              onMouseEnter={() => setCurrentIndex(index)}
              onMouseLeave={() => setCurrentIndex(0)}
            />
          ))}
        </div>

        {/* DƏYİŞİKLİK: İndikator xətləri də yalnız desktop-da ('md:flex') görünür */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 right-2 z-20 hidden md:flex gap-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  currentIndex === index ? "bg-[#e73121]" : "bg-slate-300/60"
                }`}
              />
            ))}
          </div>
        )}

        <div
          role="button"
          onClick={handleLike}
          className="absolute top-3 right-3 cursor-pointer p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-30"
        >
          <Icon
            icon="ph:heart"
            className="text-xl text-slate-600 hover:text-[#e73121]"
          />
        </div>
      </div>

      <div className="p-4 space-y-2 border-t border-slate-50">
        <div className="text-xl font-bold text-slate-900 font-sans">
          {price} AZN
        </div>

        <h3 className="text-sm font-medium text-slate-700 line-clamp-2 leading-snug h-10 font-sans">
          {title}
        </h3>

        <div
          className="text-[12px] text-slate-400 font-sans pt-2 border-t border-slate-50"
          suppressHydrationWarning
        >
          {location}, {date}
        </div>
      </div>
    </Link>
  );
}
