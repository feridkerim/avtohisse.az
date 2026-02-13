import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { AdFormValues } from "@/constants/ad-schema";
import { PatternFormat } from "react-number-format";

interface StepProps {
  form: UseFormReturn<AdFormValues>;
  onPrev: () => void;
  // onNext yoxdur, çünki bu son addımdır (Submit)
}

export const Step4Contact: React.FC<StepProps> = ({ form, onPrev }) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Icon icon="ph:phone-bold" /> 4. Əlaqə və Paylaşım
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ad Soyad */}
        <div className="space-y-2">
          <Label>Adınız</Label>
          <Input
            {...register("fullName")}
            className="rounded-xl h-11"
            placeholder="Ad və Soyad"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>

        {/* Ünvan */}
        <div className="space-y-2">
          <Label>Ünvan (Şəhər)</Label>
          <Input
            {...register("address")}
            placeholder="Məs: Bakı"
            className="rounded-xl h-11"
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>

        {/* Email */}
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

        {/* Mobil Nömrə (Maskalanmış) */}
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
                  onChange(values.value); // Form state-nə təmiz rəqəmi yazırıq (məs: 501234567)
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

      {/* Razılaşma mətni */}
      <div className="p-4 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed border">
        Elan yerləşdirərək, siz <b>avtohisse.az</b>-ın{" "}
        <span className="underline cursor-pointer hover:text-red-600">
          İstifadəçi razılaşması
        </span>{" "}
        və{" "}
        <span className="underline cursor-pointer hover:text-red-600">
          Qaydaları
        </span>{" "}
        ilə razı olduğunuzu təsdiq edirsiniz.
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
        {/* Bu düymə form-u submit edir */}
        <Button
          type="submit"
          className="flex-[2] bg-[#e73121] hover:bg-red-700 font-semibold text-white shadow-lg shadow-red-100"
        >
          Elanı yerləşdir
        </Button>
      </div>
    </div>
  );
};
