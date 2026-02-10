import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ADS_DATA } from "@/constants/ads";

export default function Home() {
  const premiumAds = ADS_DATA.filter((ad) => ad.isPremium);
  const latestAds = ADS_DATA.filter((ad) => !ad.isPremium);

  return (
    <div className="space-y-16 py-10">
      {premiumAds.length > 0 && (
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

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {premiumAds.map((ad) => (
              <ProductCard key={ad.id} {...ad} isPremium={true} />
            ))}
          </div>
        </section>
      )}

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

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
          {latestAds.map((ad) => (
            <ProductCard key={ad.id} {...ad} />
          ))}
        </div>
      </section>
    </div>
  );
}
