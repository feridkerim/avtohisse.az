import React, { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboboxWithIcon } from "@/components/ComboboxWithIcon";
import { Icon } from "@iconify/react";
import { AdFormValues } from "@/lib/schemas/ad-schema";
import {
  MINIK_BRANDS,
  KOMMERSIYA_BRANDS,
  MOTO_BRANDS,
  MINIK_MODELS,
  KOMMERSIYA_MODELS,
  MOTO_MODELS,
} from "@/data/vehicle-data";
import { VehicleType } from "@/types/vehicle-data";

interface StepProps {
  form: UseFormReturn<AdFormValues>;
  onNext: () => void;
}

export const Step1Vehicle: React.FC<StepProps> = ({ form, onNext }) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const vehicleType = watch("vehicleType") as VehicleType | "";
  const selectedBrand = watch("brand");
  const currentYear = new Date().getFullYear();

  const availableBrands = useMemo(() => {
    if (vehicleType === "minik") return MINIK_BRANDS;
    if (vehicleType === "kommersiya") return KOMMERSIYA_BRANDS;
    if (vehicleType === "moto") return MOTO_BRANDS;
    return [];
  }, [vehicleType]);

  const availableModels = useMemo(() => {
    let allModels = [];
    if (vehicleType === "minik") allModels = MINIK_MODELS;
    else if (vehicleType === "kommersiya") allModels = KOMMERSIYA_MODELS;
    else if (vehicleType === "moto") allModels = MOTO_MODELS;
    return allModels.filter((model) => model.brandValue === selectedBrand);
  }, [selectedBrand, vehicleType]);

  const handleVehicleTypeChange = (val: string) => {
    setValue("vehicleType", val);
    setValue("brand", "");
    setValue("model", "");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Icon icon="ph:car-bold" /> 1. Avtomobil Uyğunluğu
      </h2>

      <div className="space-y-3">
        <Label>Növ</Label>
        <ToggleGroup
          type="single"
          value={vehicleType}
          onValueChange={(v) => v && handleVehicleTypeChange(v)}
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
          <p className="text-red-500 text-xs">{errors.vehicleType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Marka */}
        <div className="space-y-2">
          <Label>Marka</Label>
          <ComboboxWithIcon
            data={availableBrands}
            value={selectedBrand}
            onChange={(v) => {
              setValue("brand", v);
              setValue("model", "");
            }}
            placeholder="Marka seçin"
            searchPlaceholder="Axtar..."
            showIcon={true}
          />
          {errors.brand && (
            <p className="text-red-500 text-xs">{errors.brand.message}</p>
          )}
        </div>
        {/* Model */}
        <div className="space-y-2">
          <Label>Model</Label>
          <ComboboxWithIcon
            data={availableModels}
            value={watch("model")}
            onChange={(v) => setValue("model", v)}
            placeholder={selectedBrand ? "Model seçin" : "Əvvəl marka seçin"}
            searchPlaceholder="Axtar..."
            showIcon={false}
          />
          {errors.model && (
            <p className="text-red-500 text-xs">{errors.model.message}</p>
          )}
        </div>
        {/* İl */}
        <div className="space-y-2">
          <Label>İl</Label>
          <ComboboxWithIcon
            data={Array.from({ length: 30 }, (_, i) => ({
              value: (currentYear - i).toString(),
              label: (currentYear - i).toString(),
            }))}
            value={watch("year")}
            onChange={(v) => setValue("year", v)}
            placeholder="İl seçin"
            searchPlaceholder="Axtar..."
            showIcon={false}
          />
          {errors.year && (
            <p className="text-red-500 text-xs">{errors.year.message}</p>
          )}
        </div>
        {/* Digər Selectlər (Qısaldılmış) */}
        <div className="space-y-2">
          <Label>Ban növü</Label>
          <Select
            value={watch("banType")}
            onValueChange={(v) => setValue("banType", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent>
              {["sedan", "suv", "hatchback", "universal"].map((b) => (
                <SelectItem key={b} value={b}>
                  {b.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.banType && (
            <p className="text-red-500 text-xs">{errors.banType.message}</p>
          )}
        </div>
        {/* Mühərrik və Sürətlər qutusu kodlarını buraya eyni məntiqlə əlavə edin... */}
      </div>

      <Button
        type="button"
        onClick={onNext}
        className="w-full bg-red-600 hover:bg-red-700 text-white"
      >
        Növbəti
      </Button>
    </div>
  );
};
