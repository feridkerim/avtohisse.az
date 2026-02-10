"use client";

import { useState, use } from "react";
import Image from "next/image";
import { ADS_DATA } from "@/constants/ads";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { notFound } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const product = ADS_DATA.find((p) => String(p.id) === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [userOffer, setUserOffer] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (!product) notFound();

  const handleSendOffer = () => {
    // Burada gələcəkdə WhatsApp-a yönləndirmə edə bilərik
    console.log(`Təklif edildi: ${userOffer} AZN`);
    setIsOpen(false);
    setUserOffer("");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* SOL TƏRƏF: Şəkil Qalereyası */}
        <div className="space-y-4">
          {/* Əsas Böyük Şəkil */}
          <div className="relative aspect-square rounded-3xl border border-slate-100 overflow-hidden bg-white shadow-sm transition-all duration-500">
            <Image
              src={product.images[selectedImage] || "/placeholder.png"}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
            />
          </div>

          {/* Kiçik Şəkillər (Thumbnails) - Hover effekti ilə */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setSelectedImage(index)}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 h-24 rounded-xl border-2 overflow-hidden shrink-0 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-red-500 shadow-md scale-105"
                      : "border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - ${index}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SAĞ TƏRƏF: Məlumat Paneli */}
        <div className="flex flex-col space-y-8">
          {/* Başlıq və Məkan/Tarix */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-6 text-slate-500 text-sm">
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                <Icon icon="ph:map-pin-bold" className="text-red-500" />
                {product.location}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                <Icon icon="ph:calendar-blank-bold" className="text-blue-500" />
                {product.date}
              </span>
            </div>
          </div>

          {/* Qiymət Bloku */}
          <div className="bg-slate-50 p-6 rounded-3xl flex items-center justify-between">
            <div className="text-4xl font-black text-red-600">
              {product.price} <span className="text-2xl font-bold">AZN</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white hover:text-red-500 transition-all shadow-sm"
              >
                <Icon icon="ph:heart" className="text-2xl" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white transition-all shadow-sm"
              >
                <Icon icon="ph:share-network" className="text-2xl" />
              </Button>
            </div>
          </div>

          {/* Əsas Əlaqə Düymələri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white h-16 text-xl font-bold rounded-2xl gap-3 shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              <Icon icon="ph:phone-call-fill" className="text-2xl" />
              Zəng et
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 text-xl font-bold rounded-2xl gap-3 border-2 border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
            >
              <Icon
                icon="ph:whatsapp-logo-fill"
                className="text-2xl text-green-500"
              />
              WhatsApp
            </Button>
          </div>

          {/* Qiymət Təklifi (shadcn Dialog) */}
          <div className="pt-4 border-t border-slate-100 mt-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-2xl transition-all group text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500 p-2 rounded-xl text-white">
                      <Icon icon="ph:tag-bold" className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-800 font-medium tracking-tight">
                        Qiymət sənə uyğun deyil?
                      </p>
                      <p className="text-lg font-bold text-orange-950">
                        Öz təklifini göndər
                      </p>
                    </div>
                  </div>
                  <Icon
                    icon="ph:caret-right-bold"
                    className="text-orange-400 group-hover:translate-x-1 transition-all"
                  />
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    <Icon
                      icon="ph:hand-coins-bold"
                      className="text-orange-500"
                    />
                    Qiymət təklifi et
                  </DialogTitle>
                  <DialogDescription className="text-slate-500">
                    Hazırkı qiymət:{" "}
                    <b className="text-slate-900">{product.price} AZN</b>.
                    Satıcıya nə qədər təklif edirsiniz?
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="price"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Sizin təklifiniz
                    </Label>
                    <div className="relative">
                      <Input
                        id="price"
                        type="number"
                        value={userOffer}
                        onChange={(e) => setUserOffer(e.target.value)}
                        placeholder="Məsələn: 45"
                        className="h-14 text-xl font-bold pl-4 pr-14 rounded-xl focus-visible:ring-orange-500 border-2"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                        AZN
                      </span>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex-col">
                  <Button
                    className=" h-12 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-white order-2 sm:order-1"
                    onClick={handleSendOffer}
                    disabled={!userOffer}
                  >
                    Təklifi göndər
                  </Button>
                  <Button
                    variant="ghost"
                    className=" h-12 rounded-xl order-1 sm:order-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Ləğv et
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Təsvir Bölməsi */}
          <div className="border-t border-slate-100 pt-8 space-y-4">
            <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
              <Icon icon="ph:info-bold" className="text-blue-600" />
              Məhsul haqqında
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
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
