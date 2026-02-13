"use client";

import React, { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // YENİ
import * as z from "zod"; // YENİ
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
} from "@/data/vehicle-data";
import { CATEGORIES } from "@/constants/menu";
import { VehicleType } from "@/types/vehicle-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PatternFormat } from "react-number-format";
import dynamic from "next/dynamic";

const ImageUpload = dynamic(
  () => import("@/components/ImageUpload").then((mod) => mod.ImageUpload),
  { ssr: false },
);

// --- 1. ZOD SCHEMA (Validasiya Qaydaları) ---
const adFormSchema = z
  .object({
    vehicleType: z.string().min(1, "Növ seçilməlidir"),
    brand: z.string().min(1, "Marka seçilməlidir"),
    model: z.string().min(1, "Model seçilməlidir"),
    year: z.string().min(1, "İl seçilməlidir"),
    banType: z.string().min(1, "Ban növü seçilməlidir"),
    engine: z.string().min(1, "Mühərrik seçilməlidir"),
    transmission: z.string().min(1, "Sürətlər qutusu seçilməlidir"),

    category: z.string().min(1, "Kateqoriya seçilməlidir"),
    subCategory: z.string().min(1, "Alt kateqoriya seçilməlidir"),
    brandPart: z.string().optional(),
    warranty: z.string().min(1, "Zəmanət seçimi edilməlidir"),
    dontKnowOem: z.boolean().default(false),
    oemCode: z.string().optional(),
    condition: z.string().min(1, "Vəziyyət seçilməlidir"),

    price: z.string().min(1, "Qiymət daxil edilməlidir"),
    currency: z.string().default("AZN"),
    isNegotiable: z.boolean().default(false),
    isBarter: z.boolean().default(false),
    delivery: z.boolean().default(false),
    description: z.string().optional(),

    fullName: z.string().min(2, "Adınız qeyd olunmalıdır"),
    address: z.string().min(2, "Ünvan qeyd olunmalıdır"),
    phone: z.string().min(10, "Mobil nömrə tam daxil edilməlidir"),
    email: z.string().email("Düzgün email daxil edin").min(1, "Email vacibdir"),
  })
  .superRefine((data, ctx) => {
    // Əgər "Bilmirəm" seçilməyibsə, OEM kodu məcburidir
    if (!data.dontKnowOem && (!data.oemCode || data.oemCode.length < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["oemCode"],
        message: "OEM kodu daxil edin və ya 'Bilmirəm' seçin",
      });
    }
  });

type AdFormValues = z.infer<typeof adFormSchema>;

export default function CreateAdForm() {
  const [step, setStep] = useState(1);
  const currentYear = new Date().getFullYear(); // Cari ili dinamik alırıq

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger, // Validasiya üçün vacibdir
    control,
    formState: { errors },
  } = useForm<AdFormValues>({
    resolver: zodResolver(adFormSchema),
    mode: "onChange",
    defaultValues: {
      currency: "AZN",
      dontKnowOem: false,
      isNegotiable: false,
      isBarter: false,
      delivery: false,
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
      oemCode: "",
      fullName: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const vehicleType = watch("vehicleType") as VehicleType | "";
  const selectedBrand = watch("brand");
  const selectedCategory = watch("category");
  const dontKnowOem = watch("dontKnowOem");

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

    const categoryData = CATEGORIES.find((cat) => cat.id === selectedCategory);

    if (!categoryData || !categoryData.subCategories) return [];

    return categoryData.subCategories.map((subName) => ({
      value: subName.toLowerCase().trim().replace(/\s+/g, "-"),
      label: subName,
    }));
  }, [selectedCategory]);

  const categoryOptions = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      value: cat.id, // 'fasteners' -> value
      label: cat.name, // 'Fasteners' -> label
      icon: cat.img, // img -> icon (əgər şəkliniz varsa)
    }));
  }, []);

  // Dəyişiklik hadisələri
  const handleVehicleTypeChange = (newType: string) => {
    setValue("vehicleType", newType);
    setValue("brand", "");
    setValue("model", "");
  };

  const handleBrandChange = (newBrand: string) => {
    setValue("brand", newBrand);
    setValue("model", "");
  };

  const handleCategoryChange = (newCategory: string) => {
    setValue("category", newCategory);
    setValue("subCategory", "");
  };

  // Validasiya ilə Növbəti Addıma Keçid
  const nextStep = async () => {
    let fieldsToValidate: (keyof AdFormValues)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = [
          "vehicleType",
          "brand",
          "model",
          "year",
          "banType",
          "engine",
          "transmission",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "category",
          "subCategory",
          "brandPart",
          "warranty",
          "condition",
          "oemCode", // Schema-da superRefine ilə yoxlanılır
        ];
        break;
      case 3:
        fieldsToValidate = ["price", "currency", "description"];
        break;
      default:
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data: AdFormValues) => {
    console.log("Form Successfully Submitted:", data);
    // Burada API sorğusu göndərə bilərsiniz
    alert("Elan uğurla yaradıldı! (Konsola baxın)");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl border shadow-sm">
      {/* Step Indicator */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
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
                onValueChange={(val) => val && handleVehicleTypeChange(val)}
                className="justify-start"
              >
                {["Minik", "Kommersiya", "Moto"].map((t) => (
                  <ToggleGroupItem
                    key={t}
                    value={t.toLowerCase()}
                    className="px-6 border cursor-pointer data-[state=on]:bg-red-50 data-[state=on]:text-red-600 data-[state=on]:border-red-200"
                  >
                    {t}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {errors.vehicleType && (
                <p className="text-red-500 text-xs">
                  {errors.vehicleType.message}
                </p>
              )}
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
                  className={cn(
                    errors.brand &&
                      "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                  )}
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs">{errors.brand.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Model</Label>
                <ComboboxWithIcon
                  data={availableModels}
                  value={watch("model")}
                  onChange={(value) =>
                    setValue("model", value, { shouldValidate: true })
                  }
                  className={cn(
                    errors.brand &&
                      "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                  )}
                  placeholder={
                    selectedBrand ? "Model seçin" : "Əvvəl marka seçin"
                  }
                  searchPlaceholder="Model axtar..."
                  showIcon={false}
                />
                {errors.model && (
                  <p className="text-red-500 text-xs">{errors.model.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>İl</Label>
                <ComboboxWithIcon
                  data={Array.from({ length: 30 }, (_, i) => ({
                    value: (currentYear - i).toString(),
                    label: (currentYear - i).toString(),
                  }))}
                  value={watch("year")}
                  onChange={(value) =>
                    setValue("year", value, { shouldValidate: true })
                  }
                  placeholder="İl seçin"
                  searchPlaceholder="İl axtar..."
                  showIcon={false}
                  className={cn(
                    errors.model &&
                      "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                  )}
                />
                {errors.year && (
                  <p className="text-red-500 text-xs">{errors.year.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Ban növü</Label>
                <Select
                  value={watch("banType")}
                  onValueChange={(value) =>
                    setValue("banType", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      errors.banType &&
                        "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                    )}
                  >
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="universal">Universal</SelectItem>
                  </SelectContent>
                </Select>
                {errors.banType && (
                  <p className="text-red-500 text-xs">
                    {errors.banType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Mühərrik (L)</Label>
                <Select
                  value={watch("engine")}
                  onValueChange={(value) =>
                    setValue("engine", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      errors.engine &&
                        "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                    )}
                  >
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "1.0",
                      "1.2",
                      "1.4",
                      "1.6",
                      "1.8",
                      "2.0",
                      "2.5",
                      "3.0",
                      "3.5",
                      "4.0",
                      "5.0",
                    ].map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.engine && (
                  <p className="text-red-500 text-xs">
                    {errors.engine.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Sürətlər qutusu</Label>
                <Select
                  value={watch("transmission")}
                  onValueChange={(value) =>
                    setValue("transmission", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      errors.transmission &&
                        "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                    )}
                  >
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Avtomat</SelectItem>
                    <SelectItem value="manual">Mexanika</SelectItem>
                  </SelectContent>
                </Select>
                {errors.transmission && (
                  <p className="text-red-500 text-xs">
                    {errors.transmission.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="button"
              onClick={nextStep}
              className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white"
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
                  data={categoryOptions}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  placeholder="Kateqoriya seçin"
                  searchPlaceholder="Kateqoriya axtar..."
                  showIcon={true}
                  className={cn(
                    errors.category &&
                      "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-xs">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Alt Kateqoriya</Label>
                <ComboboxWithIcon
                  data={availableSubCategories}
                  value={watch("subCategory")}
                  onChange={(value) =>
                    setValue("subCategory", value, { shouldValidate: true })
                  }
                  placeholder={
                    selectedCategory
                      ? "Alt kateqoriya seçin"
                      : "Əvvəl kateqoriya seçin"
                  }
                  searchPlaceholder="Alt kateqoriya axtar..."
                  showIcon={false}
                  className={cn(
                    errors.subCategory &&
                      "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                  )}
                />
                {errors.subCategory && (
                  <p className="text-red-500 text-xs">
                    {errors.subCategory.message}
                  </p>
                )}
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
                  onValueChange={(value) =>
                    setValue("warranty", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "w-full",
                      errors.subCategory &&
                        "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                    )}
                  >
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
                {errors.warranty && (
                  <p className="text-red-500 text-xs">
                    {errors.warranty.message}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-dashed space-y-3">
              <div className="flex justify-between items-center">
                <Label className="font-bold">OEM Kodu (VİN Kod)</Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="bg-white"
                    id="no-oem"
                    checked={dontKnowOem}
                    onCheckedChange={(v) => {
                      const isChecked = Boolean(v);
                      setValue("dontKnowOem", isChecked);
                      if (isChecked) {
                        setValue("oemCode", ""); // Təmizlə
                        trigger("oemCode"); // Validasiyanı yenilə
                      }
                    }}
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
                disabled={dontKnowOem}
                placeholder="Məs: 11517527910"
                className={cn(
                  "h-12 bg-white rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0",
                  errors.oemCode && "border-red-500 focus-visible:ring-red-500",
                )}
                {...register("oemCode")}
              />
              {errors.oemCode && (
                <p className="text-red-500 text-xs">{errors.oemCode.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="font-bold">Vəziyyəti</Label>
              <ToggleGroup
                type="single"
                value={watch("condition")}
                onValueChange={(v) =>
                  v && setValue("condition", v, { shouldValidate: true })
                }
                className="justify-start"
              >
                {["Teze", "Islenmis", "Orginal"].map((c) => (
                  <ToggleGroupItem
                    key={c}
                    value={c.toLowerCase()}
                    className={cn(
                      "px-5 rounded-xl border data-[state=on]:bg-red-50 data-[state=on]:text-red-600 data-[state=on]:border-red-200",
                      errors.condition &&
                        "border-red-500 focus:ring-red-500 hover:bg-white text-red-900",
                    )}
                  >
                    {c}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {errors.condition && (
                <p className="text-red-500 text-xs">
                  {errors.condition.message}
                </p>
              )}
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
                type="button"
                onClick={nextStep}
                className="flex-[2] bg-red-600 hover:bg-red-700 text-white"
              >
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
                  type="number"
                  placeholder="0.00"
                  className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
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
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price.message}</p>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <Checkbox
                    onCheckedChange={(v) =>
                      setValue("isNegotiable", Boolean(v))
                    }
                  />
                  Razılaşma yolu ilə
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <Checkbox
                    onCheckedChange={(v) => setValue("isBarter", Boolean(v))}
                  />
                  Barter mümkündür
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <Checkbox
                    onCheckedChange={(v) => setValue("delivery", Boolean(v))}
                  />
                  Çatdırılma var
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Əlavə məlumat</Label>
              <Textarea
                {...register("description")}
                placeholder="Məsələn: Pompa yenidir, qutusundadır."
                className="rounded-xl min-h-25 focus-visible:ring-0"
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
              <Button
                type="button"
                onClick={nextStep}
                className="flex-2 bg-red-600 hover:bg-red-700 text-white"
              >
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
                <Input
                  {...register("fullName")}
                  className="rounded-xl h-11"
                  placeholder="Ad və Soyad"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Ünvan (Şəhər)</Label>
                <Input
                  {...register("address")}
                  placeholder="Bakı"
                  className="rounded-xl h-11"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  {...register("email")}
                  placeholder="email@address.com"
                  className="rounded-xl h-11"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Mobil nömrə</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { onChange, name, value } }) => (
                    <PatternFormat
                      format="+994 (##) ### ## ##"
                      mask="_"
                      allowEmptyFormatting
                      customInput={Input}
                      name={name}
                      value={value}
                      onValueChange={(values) => {
                        onChange(values.value); // Form state-inə təmiz rəqəmi yazır
                      }}
                      placeholder="+994 (50) 000 00 00"
                      className="rounded-xl h-11 focus-visible:ring-0"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed border">
              Elan yerləşdirərək, siz <b>avtohisse.az</b>-ın{" "}
              <span className="underline cursor-pointer">
                İstifadəçi razılaşması
              </span>{" "}
              və <span className="underline cursor-pointer">Qaydaları</span> ilə
              razı olduğunuzu təsdiq edirsiniz.
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
                className="flex-2 bg-[#e73121] hover:bg-red-700 font-semibold text-white shadow-lg shadow-red-100"
              >
                Elanı yerləşdir
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
