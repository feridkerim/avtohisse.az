"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

interface AdFormValues {
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  banType: string;
  engine: string;
  transmission: string;
  category: string;
  subCategory: string;
  brandPart: string;
  warranty: string;
  dontKnowOem: boolean;
  oemCode?: string;
  condition: string;
  price: string;
  currency: string;
  isNegotiable: boolean;
  isBarter: boolean;
  description?: string;
  fullName: string;
  address: string;
  phone: string;
}

export default function CreateAdForm() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AdFormValues>({
    defaultValues: {
      currency: "AZN",
      dontKnowOem: false,
      isNegotiable: false,
      isBarter: false,
      vehicleType: "",
      brand: "",
      model: "",
      year: "",
      banType: "",
      engine: "",
      transmission: "",
      category: "",
      subCategory: "",
      brandPart: "",
      warranty: "",
      condition: "",
      price: "",
      fullName: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = (data: AdFormValues) => {
    console.log("Final Data:", data);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-[2.5rem] border shadow-sm">
      {/* Step Indicator */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i <= step ? "bg-red-600" : "bg-slate-100",
            )}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ADDIM 1: Avtomobil Texniki Göstəriciləri (1-12 bəndlər) */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="ph:car-bold" /> 1. Avtomobil Uyğunluğu
            </h2>

            <div className="space-y-3">
              <Label className="font-bold">Növ</Label>
              <ToggleGroup
                type="single"
                onValueChange={(v) => setValue("vehicleType", v || "")}
                className="justify-start gap-3"
              >
                {["Minik", "Kommersiya", "Moto"].map((t) => (
                  <ToggleGroupItem
                    key={t}
                    value={t.toLowerCase()}
                    className="px-6 rounded-xl border"
                  >
                    {t}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Marka</Label>
                <select
                  {...register("brand")}
                  className="w-full h-11 rounded-xl border px-3"
                >
                  <option value="">Marka seçin</option>
                  <option value="bmw">BMW</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <select
                  {...register("model")}
                  className="w-full h-11 rounded-xl border px-3"
                >
                  <option value="">Model seçin</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>İl</Label>
                <select
                  {...register("year")}
                  className="w-full h-11 rounded-xl border px-3"
                >
                  <option value="">İl seçin</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Ban növü</Label>
                <select
                  {...register("banType")}
                  className="w-full h-11 rounded-xl border px-3"
                >
                  <option value="">Seçin</option>
                  <option value="sedan">Sedan</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Mühərrik (L)</Label>
                <Input
                  {...register("engine")}
                  placeholder="Məs: 2.0"
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Sürətlər qutusu</Label>
                <select
                  {...register("transmission")}
                  className="w-full h-11 rounded-xl border px-3"
                >
                  <option value="auto">Avtomat</option>
                  <option value="manual">Mexanika</option>
                </select>
              </div>
            </div>
            <Button
              type="button"
              onClick={nextStep}
              className="w-full bg-slate-900 h-12 rounded-xl"
            >
              Növbəti
            </Button>
          </div>
        )}

        {/* ADDIM 2: Detal və Kateqoriya (13-16, 18 bəndlər) */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="ph:wrench-bold" /> 2. Detal Məlumatları
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kateqoriya</Label>
                <select
                  {...register("category")}
                  className="w-full h-11 rounded-xl border px-3"
                >
                  <option value="">Seçin</option>
                  <option value="cooling">Soyutma sistemi</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Alt Kateqoriya</Label>
                <select
                  {...register("subCategory")}
                  className="w-full h-11 rounded-xl border px-3"
                >
                  <option value="">Seçin</option>
                  <option value="pump">Su pompası</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Brend (Hissənin)</Label>
                <Input
                  {...register("brandPart")}
                  placeholder="Məs: Febi"
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Zəmanət</Label>
                <select
                  {...register("warranty")}
                  className="w-full h-11 rounded-xl border px-3"
                >
                  <option value="3days">3 gün</option>
                  <option value="none">Yoxdur</option>
                </select>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed space-y-3">
              <div className="flex justify-between items-center">
                <Label className="font-bold">OEM Kodu (VİN Kod)</Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="no-oem"
                    onCheckedChange={(v) => setValue("dontKnowOem", Boolean(v))}
                  />
                  <label
                    htmlFor="no-oem"
                    className="text-xs font-medium cursor-pointer"
                  >
                    Bilmirəm
                  </label>
                </div>
              </div>
              <Input
                disabled={watch("dontKnowOem")}
                placeholder="Məs: 11517527910"
                className="h-12 bg-white rounded-xl"
                {...register("oemCode")}
              />
            </div>

            <div className="space-y-3">
              <Label className="font-bold">Vəziyyəti</Label>
              <ToggleGroup
                type="single"
                onValueChange={(v) => setValue("condition", v || "")}
                className="justify-start gap-2"
              >
                {["Teze", "Islenmis", "Orginal"].map((c) => (
                  <ToggleGroupItem
                    key={c}
                    value={c.toLowerCase()}
                    className="px-5 rounded-xl border"
                  >
                    {c}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                Geri
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="flex-[2] bg-slate-900 h-12 rounded-xl"
              >
                Növbəti
              </Button>
            </div>
          </div>
        )}

        {/* ADDIM 3: Media, Qiymət, Təsvir (17, 19-22 bəndlər) */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="ph:image-bold" /> 3. Media və Qiymət
            </h2>

            <div className="space-y-3">
              <Label className="font-bold text-orange-600 flex items-center gap-1">
                <Icon icon="ph:info-bold" /> Foto İpucu
              </Label>
              <p className="text-xs text-slate-500 bg-orange-50 p-3 rounded-xl border border-orange-100">
                Hissənin hər iki tərəfini və üzərindəki <b>kodu</b> mütləq
                çəkin.
              </p>
              <div className="h-32 border-2 border-dashed rounded-2xl flex items-center justify-center border-slate-200 hover:border-red-500 cursor-pointer transition-all">
                <Icon
                  icon="ph:camera-plus-bold"
                  className="text-3xl text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-bold">Qiymət</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="0.00"
                  className="h-12 rounded-xl flex-1"
                  {...register("price")}
                />
                <select
                  className="w-24 h-12 rounded-xl border px-2 font-bold"
                  {...register("currency")}
                >
                  <option value="AZN">AZN</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox
                    onCheckedChange={(v) =>
                      setValue("isNegotiable", Boolean(v))
                    }
                  />{" "}
                  Razılaşma yolu ilə
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox
                    onCheckedChange={(v) => setValue("isBarter", Boolean(v))}
                  />{" "}
                  Barter mümkündür
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Əlavə məlumat</Label>
              <Textarea
                {...register("description")}
                placeholder="Məsələn: Pompa yenidir, qutusundadır."
                className="rounded-xl min-h-[100px]"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                Geri
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="flex-[2] bg-slate-900 h-12 rounded-xl"
              >
                Növbəti
              </Button>
            </div>
          </div>
        )}

        {/* ADDIM 4: Əlaqə və Təsdiq (23-25 bəndlər) */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="ph:phone-bold" /> 4. Əlaqə və Paylaşım
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Adınız</Label>
                <Input {...register("fullName")} className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label>Ünvan (Şəhər)</Label>
                <Input
                  {...register("address")}
                  placeholder="Bakı"
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Mobil nömrə</Label>
                <Input
                  {...register("phone")}
                  placeholder="050 000 00 00"
                  className="rounded-xl h-11"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed border">
              Elan yerləşdirərək, siz <b>avtohisse.az</b>-ın{" "}
              <span className="underline">İstifadəçi razılaşması</span> və{" "}
              <span className="underline">Qaydaları</span> ilə razı olduğunuzu
              təsdiq edirsiniz.
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                Geri
              </Button>
              <Button
                type="submit"
                className="flex-[2] bg-red-600 hover:bg-red-700 h-12 rounded-xl font-bold text-white shadow-lg shadow-red-100"
              >
                Davam et
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
