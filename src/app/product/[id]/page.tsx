import Image from "next/image";
import { ADS_DATA } from "@/constants/ads";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function ProductDetail({ params }: PageProps) {
  // Əsas məqam buradadır: params-ı gözləmək lazımdır
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const product = ADS_DATA.find((p) => String(p.id) === id);

  if (!product) {
    notFound(); // Elan tapılmasa 404 səhifəsinə göndər
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Sol Tərəf: Şəkil Qalereyası */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl border border-slate-100 overflow-hidden bg-slate-50">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
            />
          </div>
          {/* Kiçik şəkillər (Thumbnail) gələcəkdə bura əlavə oluna bilər */}
        </div>

        {/* Sağ Tərəf: Məlumat Paneli */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1">
                <Icon icon="ph:map-pin" /> {product.location}
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="ph:calendar" /> {product.date}
              </span>
            </div>
          </div>

          <div className="text-4xl font-extrabold text-red-600">
            {product.price} AZN
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white h-14 text-lg gap-2"
            >
              <Icon icon="ph:phone-call" className="text-xl" />
              Zəng et
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 text-lg gap-2 border-slate-200"
            >
              <Icon icon="ph:chat-circle" className="text-xl" />
              Mesaj yaz
            </Button>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-bold text-lg">Təsvir</h3>
            <p className="text-slate-600 leading-relaxed">
              Bu məhsul üçün hələ ki ətraflı təsvir əlavə edilməyib. Lakin
              məhsulun keyfiyyətinə və orijinallığına zəmanət verilir. Əlavə
              məlumat üçün satıcı ilə əlaqə saxlaya bilərsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
