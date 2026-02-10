"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface AdvancedFilterDesktopProps {
  isOpen: boolean;
  priceRange: { min: string; max: string };
  onPriceChange: (value: { min: string; max: string }) => void;
  condition: string;
  onConditionChange: (value: string) => void;
  fuel: string;
  onFuelChange: (value: string) => void;
}

const CONDITION_OPTIONS = [
  { value: "all", label: "Hamısı" },
  { value: "new", label: "Yeni" },
  { value: "used", label: "İşlənmiş" },
  { value: "original", label: "Orijinal" },
];

export default function AdvancedFilterDesktop({
  isOpen,
  priceRange,
  onPriceChange,
  condition,
  onConditionChange,
  fuel,
  onFuelChange,
}: AdvancedFilterDesktopProps) {
  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out overflow-hidden",
        isOpen
          ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t"
          : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="min-h-0">
        <div className="grid grid-cols-4 gap-6">
          {/* Qiymət Aralığı */}
          <div className="space-y-3">
            <Label className="font-bold">Qiymət (AZN)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  onPriceChange({ ...priceRange, min: e.target.value })
                }
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Input
                placeholder="Max"
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  onPriceChange({ ...priceRange, max: e.target.value })
                }
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Vəziyyəti - ToggleGroup ilə */}
          <div className="space-y-3 col-span-2">
            <Label className="font-bold">Vəziyyəti</Label>
            <ToggleGroup
              type="single"
              value={condition}
              onValueChange={(val) => onConditionChange(val)}
              className="justify-start"
            >
              {CONDITION_OPTIONS.map((opt) => (
                <ToggleGroupItem
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    "rounded-xl border border-slate-200 px-5 transition-all",
                    "data-[state=on]:bg-red-600 data-[state=on]:text-white data-[state=on]:border-red-600",
                    "hover:bg-red-50 hover:text-red-600 hover:border-red-200",
                  )}
                >
                  {opt.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Yanacaq */}
          <div className="space-y-3">
            <Label className="font-bold">Yanacaq</Label>
            <Select value={fuel} onValueChange={onFuelChange}>
              <SelectTrigger className="w-full border border-slate-200 px-3 bg-white">
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
      </div>
    </div>
  );
}
