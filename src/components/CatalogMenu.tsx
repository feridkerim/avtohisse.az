"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, X } from "lucide-react";
import { CATEGORIES } from "@/constants/menu";
import Link from "next/link";
import Image from "next/image";

export function CatalogMenu() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2 cursor-pointer">
          <Menu className="h-5 w-5" />
          Kataloq
        </Button>
      </SheetTrigger>

      {/* Menyu İçəriyi - Tam genişlik (screen size) */}
      <SheetContent side="left" className="p-0 sm:max-w-200 flex h-full">
        <div className="sr-only">
          <SheetTitle>Ehtiyat hissələri kataloqu</SheetTitle>
          <SheetDescription>
            Bütün kateqoriyalar üzrə ehtiyat hissələrinin siyahısı
          </SheetDescription>
        </div>
        {/* Sol tərəf: Əsas Kateqoriyalar */}
        <div className="relative grow">
          <div className="w-1/2 border-r p-1 h-full">
            <ul className="h-[99vh] overflow-y-auto">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat)}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors  border-b border-slate-100 ${
                    activeCategory.id === cat.id
                      ? "bg-[#e73121] text-white"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 place-content-between w-full">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Image
                        src={cat.img}
                        alt={cat.name}
                        width={24}
                        height={24}
                        className={`transition-all  ${
                          activeCategory.id === cat.id
                            ? "brightness-0 invert"
                            : ""
                        }`}
                      />
                      <h4>{cat.name}</h4>
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ tərəf: Alt Kateqoriyalar (Şəkildəki narıncı aktivlik) */}
          <div className="w-1/2 absolute left-1/2 top-0 p-1">
            {/* <h3 className="text-lg font-bold mb-4">{activeCategory.name}</h3> */}
            <ul className="h-[99vh] overflow-y-auto">
              {activeCategory.subCategories.map((sub, index) => (
                <li key={index} className="border-b border-slate-100">
                  <Link
                    href={`/category/${activeCategory.id}/${sub.toLowerCase().replace(/ /g, "-")}`}
                    className="px-4 py-3 block hover:bg-[#e73121] hover:text-white text-sm font-medium transition-all"
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
