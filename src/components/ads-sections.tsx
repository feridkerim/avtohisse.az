import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types/product";

interface AdsSectionProps {
  items: Product[];
}

// Premium Elanlar Bölməsi
export function PremiumAds({ items }: AdsSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-sans text-slate-900">
          Premium elanlar
        </h2>
        <Button size="sm" asChild>
          <Link href="/all-ads">
            <span>Hamısını gör</span>
            <ChevronRight />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((ad) => (
          <ProductCard key={ad.id} {...ad} isPremium={true} />
        ))}
      </div>
    </section>
  );
}

// Son Elanlar Bölməsi
export function LatestAds({ items }: AdsSectionProps) {
  return (
    <section className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-sans">Son elanlar</h2>
        <Button size="sm" asChild>
          <Link href="/all-ads">
            <span>Hamısını gör</span>
            <ChevronRight />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
        {items.map((ad) => (
          <ProductCard key={ad.id} {...ad} />
        ))}
      </div>
    </section>
  );
}
