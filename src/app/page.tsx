import { ADS_DATA } from "@/constants/ads";
import Filter from "@/components/Filter/index";
import TopParts from "@/components/TopParts";
import TopCategory from "@/components/TopCategory";
import { PremiumAds, LatestAds } from "@/components/ads-sections";

export default function Home() {
  const premiumAds = ADS_DATA.filter((ad) => ad.isPremium);
  const latestAds = ADS_DATA.filter((ad) => !ad.isPremium);

  return (
    <>
      <TopCategory />
      <Filter />
      <TopParts />
      <div className="space-y-16 py-10 px-4 md:px-0">
        <PremiumAds items={premiumAds} />
        <LatestAds items={latestAds} />
      </div>
    </>
  );
}
