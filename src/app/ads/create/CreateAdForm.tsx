"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { ComboboxWithIcon } from "@/components/ComboboxWithIcon";
import {
  MINIK_BRANDS,
  KOMMERSIYA_BRANDS,
  MOTO_BRANDS,
  MINIK_MODELS,
  KOMMERSIYA_MODELS,
  MOTO_MODELS,
  CATEGORIES,
  SUBCATEGORIES,
} from "@/data/vehicle-data";
import { VehicleType } from "@/types/vehicle-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import dynamic from "next/dynamic";
const ImageUpload = dynamic(
  () => import("@/components/ImageUpload").then((mod) => mod.ImageUpload),
  {
    ssr: false,
  },
);

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
      vehicleType: "minik",
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

  const vehicleType = watch("vehicleType") as VehicleType | "";
  const selectedBrand = watch("brand");
  const selectedCategory = watch("category");

  // Növə görə markaları filtrlə
  const availableBrands = useMemo(() => {
    if (!vehicleType) return [];
    if (vehicleType === "minik") return MINIK_BRANDS;
    if (vehicleType === "kommersiya") return KOMMERSIYA_BRANDS;
    if (vehicleType === "moto") return MOTO_BRANDS;
    return [];
  }, [vehicleType]);

  // Seçilmiş markaya görə modelləri filtrlə
  const availableModels = useMemo(() => {
    if (!selectedBrand || !vehicleType) return [];

    let allModels;
    if (vehicleType === "minik") allModels = MINIK_MODELS;
    else if (vehicleType === "kommersiya") allModels = KOMMERSIYA_MODELS;
    else if (vehicleType === "moto") allModels = MOTO_MODELS;
    else return [];

    return allModels.filter((model) => model.brandValue === selectedBrand);
  }, [selectedBrand, vehicleType]);

  // Seçilmiş kateqoriyaya görə alt kateqoriyaları filtrlə
  const availableSubCategories = useMemo(() => {
    if (!selectedCategory) return [];
    return SUBCATEGORIES.filter(
      (sub) => sub.categoryValue === selectedCategory,
    );
  }, [selectedCategory]);

  // Növ dəyişəndə marka və modeli sıfırla
  const handleVehicleTypeChange = (newType: string) => {
    setValue("vehicleType", newType);
    setValue("brand", "");
    setValue("model", "");
  };

  // Marka dəyişəndə modeli sıfırla
  const handleBrandChange = (newBrand: string) => {
    setValue("brand", newBrand);
    setValue("model", "");
  };

  // Kateqoriya dəyişəndə alt kateqoriyanı sıfırla
  const handleCategoryChange = (newCategory: string) => {
    setValue("category", newCategory);
    setValue("subCategory", "");
  };

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
        {/* ADDIM 1: Avtomobil Texniki Göstəriciləri */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="ph:car-bold" /> 1. Avtomobil Uyğunluğu
            </h2>

            <div className="space-y-3">
              <Label className="font-semibold">Növ</Label>
              <ToggleGroup
                type="single"
                value={vehicleType}
                onValueChange={handleVehicleTypeChange}
                className="justify-start"
              >
                {["Minik", "Kommersiya", "Moto"].map((t) => (
                  <ToggleGroupItem
                    key={t}
                    value={t.toLowerCase()}
                    className="px-6 border cursor-pointer"
                  >
                    {t}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Marka</Label>
                <ComboboxWithIcon
                  data={availableBrands}
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  placeholder="Marka seçin"
                  searchPlaceholder="Marka axtar..."
                  showIcon={true}
                />
              </div>

              <div className="space-y-2">
                <Label>Model</Label>
                <ComboboxWithIcon
                  data={availableModels}
                  value={watch("model")}
                  onChange={(value) => setValue("model", value)}
                  placeholder={
                    selectedBrand ? "Model seçin" : "Əvvəl marka seçin"
                  }
                  searchPlaceholder="Model axtar..."
                  showIcon={false}
                />
              </div>

              <div className="space-y-2">
                <Label>İl</Label>
                <ComboboxWithIcon
                  data={Array.from({ length: 30 }, (_, i) => ({
                    value: (2025 - i).toString(),
                    label: (2025 - i).toString(),
                  }))}
                  value={watch("year")}
                  onChange={(value) => setValue("year", value)}
                  placeholder="İl seçin"
                  searchPlaceholder="İl axtar..."
                  showIcon={false}
                />
              </div>

              <div className="space-y-2">
                <Label>Ban növü</Label>
                <Select
                  value={watch("banType")}
                  onValueChange={(value) => setValue("banType", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="universal">Universal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Mühərrik (L)</Label>
                <Select
                  value={watch("engine")}
                  onValueChange={(value) => setValue("engine", value)}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.0">1.0</SelectItem>
                    <SelectItem value="1.2">1.2</SelectItem>
                    <SelectItem value="1.4">1.4</SelectItem>
                    <SelectItem value="1.6">1.6</SelectItem>
                    <SelectItem value="1.8">1.8</SelectItem>
                    <SelectItem value="2.0">2.0</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3.0">3.0</SelectItem>
                    <SelectItem value="3.5">3.5</SelectItem>
                    <SelectItem value="4.0">4.0</SelectItem>
                    <SelectItem value="5.0">5.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sürətlər qutusu</Label>
                <Select
                  value={watch("transmission")}
                  onValueChange={(value) => setValue("transmission", value)}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Avtomat</SelectItem>
                    <SelectItem value="manual">Mexanika</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="button"
              onClick={nextStep}
              className="w-full cursor-pointer"
            >
              Növbəti
            </Button>
          </div>
        )}

        {/* ADDIM 2: Detal və Kateqoriya */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="ph:wrench-bold" /> 2. Detal Məlumatları
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kateqoriya</Label>
                <ComboboxWithIcon
                  data={CATEGORIES}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  placeholder="Kateqoriya seçin"
                  searchPlaceholder="Kateqoriya axtar..."
                  showIcon={true}
                />
              </div>

              <div className="space-y-2">
                <Label>Alt Kateqoriya</Label>
                <ComboboxWithIcon
                  data={availableSubCategories}
                  value={watch("subCategory")}
                  onChange={(value) => setValue("subCategory", value)}
                  placeholder={
                    selectedCategory
                      ? "Alt kateqoriya seçin"
                      : "Əvvəl kateqoriya seçin"
                  }
                  searchPlaceholder="Alt kateqoriya axtar..."
                  showIcon={false}
                />
              </div>

              <div className="space-y-2">
                <Label>Brend (Hissənin)</Label>
                <Input
                  {...register("brandPart")}
                  placeholder="Məs: Febi"
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="space-y-2">
                <Label>Zəmanət</Label>
                <Select
                  value={watch("warranty")}
                  onValueChange={(value) => setValue("warranty", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3days">3 gün</SelectItem>
                    <SelectItem value="1week">1 həftə</SelectItem>
                    <SelectItem value="1month">1 ay</SelectItem>
                    <SelectItem value="3months">3 ay</SelectItem>
                    <SelectItem value="6months">6 ay</SelectItem>
                    <SelectItem value="1year">1 il</SelectItem>
                    <SelectItem value="none">Yoxdur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed space-y-3">
              <div className="flex justify-between items-center">
                <Label className="font-bold">OEM Kodu (VİN Kod)</Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="bg-white"
                    id="no-oem"
                    onCheckedChange={(v) => setValue("dontKnowOem", Boolean(v))}
                  />
                  <label
                    htmlFor="no-oem"
                    className="text-xs  font-medium cursor-pointer"
                  >
                    Bilmirəm
                  </label>
                </div>
              </div>
              <Input
                disabled={watch("dontKnowOem")}
                placeholder="Məs: 11517527910"
                className="h-12 bg-white rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                {...register("oemCode")}
              />
            </div>

            <div className="space-y-3">
              <Label className="font-bold">Vəziyyəti</Label>
              <ToggleGroup
                type="single"
                onValueChange={(v) => setValue("condition", v || "")}
                className="justify-start"
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
                className="flex-1"
              >
                Geri
              </Button>
              <Button type="button" onClick={nextStep} className="flex-2">
                Növbəti
              </Button>
            </div>
          </div>
        )}

        {/* ADDIM 3: Media, Qiymət, Təsvir */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon icon="ph:image-bold" /> 3. Media və Qiymət
            </h2>

            <ImageUpload />

            <div className="space-y-3">
              <Label className="font-bold">Qiymət</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="0.00"
                  className=" flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...register("price")}
                />
                <Select
                  value={watch("currency")}
                  onValueChange={(value) => setValue("currency", value)}
                >
                  <SelectTrigger className="w-24 font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AZN">AZN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
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
                className="rounded-xl min-h-25"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="flex-1"
              >
                Geri
              </Button>
              <Button type="button" onClick={nextStep} className="flex-2">
                Növbəti
              </Button>
            </div>
          </div>
        )}

        {/* ADDIM 4: Əlaqə və Təsdiq */}
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
                className="flex-1"
              >
                Geri
              </Button>
              <Button
                type="submit"
                className="flex-2 bg-[#e73121] hover:bg-red-700  font-semibold text-white shadow-lg shadow-red-100"
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
