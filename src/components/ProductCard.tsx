"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  date: string;
  image: string;
  isPremium?: boolean;
}

export default function ProductCard({
  id,
  title,
  price,
  location,
  date,
  image,
  isPremium = false,
}: ProductCardProps) {
  // Düyməyə klikləyəndə linkin (id-yə keçidin) işləməməsi üçün
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Linkə keçidi dayandırır
    e.stopPropagation(); // Hadisənin yuxarı yayılmasını dayandırır
    // Bura bəyənmə funksiyasını əlavə edə bilərsən
  };

  return (
    <Link
      href={`/product/${id}`}
      className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg relative transition-all duration-300"
    >
      {isPremium && (
        <div className="absolute top-3 left-3 z-20 bg-yellow-400 text-white p-1 rounded-lg shadow-md flex items-center justify-center pointer-events-none">
          <Icon icon="mdi:crown" className="text-lg" />
        </div>
      )}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* DƏYİŞİKLİK: 'button' teqi 'div' ilə əvəz olundu (Dizayn eynidir) */}
        <div
          role="button"
          onClick={handleLike}
          className="absolute top-3 right-3 cursor-pointer p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-20"
        >
          <Icon
            icon="ph:heart"
            className="text-xl text-slate-600 hover:text-red-500"
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

        {/* DƏYİŞİKLİK: suppressHydrationWarning əlavə olundu */}
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
