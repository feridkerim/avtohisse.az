import React, { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { AdFormValues } from "@/constants/ad-schema";
import { CATEGORIES, SUBCATEGORIES } from "@/data/vehicle-data";
import { cn } from "@/lib/utils";

interface StepProps {
  form: UseFormReturn<AdFormValues>;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Details: React.FC<StepProps> = ({ form, onNext, onPrev }) => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;
  const selectedCategory = watch("category");
  const dontKnowOem = watch("dontKnowOem");

  const availableSubCategories = useMemo(() => {
    return SUBCATEGORIES.filter(
      (sub) => sub.categoryValue === selectedCategory,
    );
  }, [selectedCategory]);

  return (
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
            onChange={(v) => {
              setValue("category", v);
              setValue("subCategory", "");
            }}
            placeholder="Kateqoriya"
            searchPlaceholder="Axtar..."
            showIcon={true}
          />
          {errors.category && (
            <p className="text-red-500 text-xs">{errors.category.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Alt Kateqoriya</Label>
          <ComboboxWithIcon
            data={availableSubCategories}
            value={watch("subCategory")}
            onChange={(v) => setValue("subCategory", v)}
            placeholder={
              selectedCategory ? "Alt kateqoriya" : "Əvvəl kateqoriya seçin"
            }
            searchPlaceholder="Axtar..."
            showIcon={false}
          />
          {errors.subCategory && (
            <p className="text-red-500 text-xs">{errors.subCategory.message}</p>
          )}
        </div>
        {/* Brand Part, Warranty və s. */}
        <div className="space-y-2">
          <Label>Zəmanət</Label>
          <Select
            value={watch("warranty")}
            onValueChange={(v) => setValue("warranty", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Yoxdur</SelectItem>
              <SelectItem value="1month">1 ay</SelectItem>
              <SelectItem value="1year">1 il</SelectItem>
            </SelectContent>
          </Select>
          {errors.warranty && (
            <p className="text-red-500 text-xs">{errors.warranty.message}</p>
          )}
        </div>
      </div>

      <div className="p-5 bg-slate-50 rounded-2xl border-dashed border-2 space-y-3">
        <div className="flex justify-between items-center">
          <Label className="font-bold">OEM Kodu</Label>
          <div className="flex items-center gap-2">
            <Checkbox
              id="no-oem"
              checked={dontKnowOem}
              onCheckedChange={(v) => {
                setValue("dontKnowOem", !!v);
                if (v) {
                  setValue("oemCode", "");
                  trigger("oemCode");
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
          {...register("oemCode")}
          placeholder="Məs: 11517527910"
          className={cn("bg-white", errors.oemCode && "border-red-500")}
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
          onValueChange={(v) => v && setValue("condition", v)}
          className="justify-start"
        >
          {["Teze", "Islenmis", "Orginal"].map((c) => (
            <ToggleGroupItem
              key={c}
              value={c.toLowerCase()}
              className="px-5 border"
            >
              {c}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {errors.condition && (
          <p className="text-red-500 text-xs">{errors.condition.message}</p>
        )}
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
          className="flex-[2] bg-red-600 text-white"
        >
          Növbəti
        </Button>
      </div>
    </div>
  );
};
