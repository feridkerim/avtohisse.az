"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // ToggleGroup əlavə edildi
import { cn } from "@/lib/utils";

type FilterData = Record<
  string,
  {
    value: string;
    label: string;
  }[]
>;

interface AdvancedFilterMobileProps {
  filterData: FilterData;
  selections: Record<string, string>;
  updateSelection: (key: string, value: string) => void;
  priceRange: { min: string; max: string };
  onPriceChange: (value: { min: string; max: string }) => void;
  condition: string;
  onConditionChange: (value: string) => void;
  fuel: string;
  onFuelChange: (value: string) => void;
  onReset: () => void;
  onApply: () => void;
}

const CONDITION_OPTIONS = [
  { value: "all", label: "Hamısı" },
  { value: "new", label: "Yeni" },
  { value: "used", label: "İşlənmiş" },
  { value: "original", label: "Orijinal" },
];

export default function AdvancedFilterMobile({
  filterData,
  selections,
  updateSelection,
  priceRange,
  onPriceChange,
  condition,
  onConditionChange,
  fuel,
  onFuelChange,
  onReset,
  onApply,
}: AdvancedFilterMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full md:hidden">
          <Icon icon="ph:sliders-horizontal-bold" className="text-xl" />
          Filtrlər və Axtarış
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[92vh] p-4 flex flex-col">
        <SheetHeader className=" p-0">
          <SheetTitle className="text-xl  font-black text-slate-900">
            Bütün Filtrlər
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-8 pb-32 pt-2 scrollbar-hide">
          {/* 1. Əsas Seçimlər (Marka, Model və s.) */}
          <div className="grid grid-cols-1 gap-5">
            {Object.entries(filterData).map(([key, data]) => (
              <div key={key} className="space-y-2">
                <Label className="text-sm  capitalize ">{key}</Label>
                <Select
                  value={selections[key]}
                  onValueChange={(val) => updateSelection(key, val)}
                >
                  {/* Desktop ilə eyni stil: border-slate-200 və h-11 */}
                  <SelectTrigger className="h-11 border border-slate-200 bg-white w-full">
                    <SelectValue
                      placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} seçin`}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {data.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <hr className="border-slate-100" />

          {/* 2. Qiymət Aralığı */}
          <div className="space-y-4">
            <Label className="text-sm  ">Qiymət (AZN)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                className="focus-visible:ring-0 focus-visible:ring-offset-0" // Kölgələr ləğv edildi
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  onPriceChange({ ...priceRange, min: e.target.value })
                }
              />
              <Input
                placeholder="Max"
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  onPriceChange({ ...priceRange, max: e.target.value })
                }
              />
            </div>
          </div>

          {/* 3. Vəziyyəti - ToggleGroup (Desktop ilə eyni) */}
          <div className="space-y-4">
            <Label className="text-sm  ">Məhsulun Vəziyyəti</Label>
            <ToggleGroup
              type="single"
              value={condition}
              onValueChange={(val) => onConditionChange(val)}
              className="justify-start flex-wrap"
            >
              {CONDITION_OPTIONS.map((opt) => (
                <ToggleGroupItem
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    "border border-slate-200 px-5 transition-all",
                    "data-[state=on]:bg-red-600 data-[state=on]:text-white data-[state=on]:border-red-600",
                    "hover:bg-red-50 hover:text-red-600 hover:border-red-200",
                  )}
                >
                  {opt.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* 4. Yanacaq növü */}
          <div className="space-y-4">
            <Label className="text-sm  ">Yanacaq</Label>
            <Select value={fuel} onValueChange={onFuelChange}>
              <SelectTrigger className="h-11 rounded-xl w-full border border-slate-200 bg-white">
                <SelectValue placeholder="Hamısı" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">Hamısı</SelectItem>
                <SelectItem value="petrol">Benzin</SelectItem>
                <SelectItem value="diesel">Dizel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alt Düymələr */}
        <div className="absolute bottom-6 left-6 right-6 bg-white pt-4 flex gap-3 border-t">
          <Button
            variant="outline"
            className="h-12 rounded-xl flex-1  border-slate-200"
            type="button"
            onClick={onReset}
          >
            Sıfırla
          </Button>
          <Button
            className="h-12 rounded-xl flex-2 bg-red-600 hover:bg-red-700 text-white "
            type="button"
            onClick={onApply}
          >
            Göstər
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
