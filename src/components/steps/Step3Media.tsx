import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { AdFormValues } from "@/constants/ad-schema";
import dynamic from "next/dynamic";

// ImageUpload komponentini dinamik yükləyirik (SSR xətası olmaması üçün)
const ImageUpload = dynamic(
  () => import("@/components/ImageUpload").then((mod) => mod.ImageUpload),
  { ssr: false },
);

interface StepProps {
  form: UseFormReturn<AdFormValues>;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3Media: React.FC<StepProps> = ({ form, onNext, onPrev }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Icon icon="ph:image-bold" /> 3. Media və Qiymət
      </h2>

      {/* Şəkil Yükləmə Komponenti */}
      <ImageUpload />
      {/* Qeyd: ImageUpload daxilində form state-ni idarə etmək üçün 
          setValue("images", ...) istifadə etdiyinizə əmin olun */}

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
              checked={watch("isNegotiable")}
              onCheckedChange={(v) => setValue("isNegotiable", Boolean(v))}
            />
            Razılaşma yolu ilə
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <Checkbox
              checked={watch("isBarter")}
              onCheckedChange={(v) => setValue("isBarter", Boolean(v))}
            />
            Barter mümkündür
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <Checkbox
              checked={watch("delivery")}
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
          className="rounded-xl min-h-[120px] focus-visible:ring-0"
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          className="flex-1"
        >
          Geri
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="flex-[2] bg-red-600 hover:bg-red-700 text-white"
        >
          Növbəti
        </Button>
      </div>
    </div>
  );
};
