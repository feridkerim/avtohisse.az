"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { FilterItem } from "./filter-item";
import AdvancedFilterMobile from "./advanced-filter-mobile";
import AdvancedFilterDesktop from "./advanced-filter-desktop";
import { cn } from "@/lib/utils";

const filterData: Record<string, { value: string; label: string }[]> = {
  marka: [
    { value: "bmw", label: "BMW" },
    { value: "mercedes", label: "Mercedes" },
  ],
  model: [
    { value: "g30", label: "G30" },
    { value: "f10", label: "F10" },
  ],
  il: Array.from({ length: 26 }, (_, i) => ({
    value: (2026 - i).toString(),
    label: (2026 - i).toString(),
  })),
  muherrik: [
    { value: "2.0", label: "2.0 L" },
    { value: "3.0", label: "3.0 L" },
  ],
};

export default function Filter() {
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);
  const [selections, setSelections] = React.useState<Record<string, string>>({
    marka: "",
    model: "",
    il: "",
    muherrik: "",
  });

  const [priceRange, setPriceRange] = React.useState({
    min: "",
    max: "",
  });

  const [condition, setCondition] = React.useState<string>("");
  const [fuel, setFuel] = React.useState<string>("all");

  const updateSelection = (type: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  const handleResetFilters = () => {
    setSelections({
      marka: "",
      model: "",
      il: "",
      muherrik: "",
    });
    setPriceRange({ min: "", max: "" });
    setCondition("");
    setFuel("all");
  };

  const handleSearch = () => {
    // Burada gələcəkdə server sorğusu və ya URL query parametrləri ilə inteqrasiya edilə bilər
    console.log("Filtrlər:", {
      selections,
      priceRange,
      condition,
      fuel,
    });
  };

  return (
    <div className="container mx-auto px-4 mt-6">
      {/* MOBIL VERSIYA: Yalnız bir düymə */}
      <div className="md:hidden w-full">
        <AdvancedFilterMobile
          filterData={filterData}
          selections={selections}
          updateSelection={updateSelection}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          condition={condition}
          onConditionChange={setCondition}
          fuel={fuel}
          onFuelChange={setFuel}
          onReset={handleResetFilters}
          onApply={handleSearch}
        />
      </div>

      {/* DESKTOP VERSIYA: Klassik geniş görünüş */}
      <div className="hidden md:block bg-white p-4 rounded-xl border border-slate-100">
        <div className="flex flex-row gap-4 items-center">
          <div className="grid grid-cols-4 gap-3 w-full">
            {Object.keys(filterData).map((key) => (
              <FilterItem
                key={key}
                type={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                data={filterData[key]}
                value={selections[key]}
                onSelect={updateSelection}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="w-32 bg-[#e73121] cursor-pointer hover:bg-red-700"
              onClick={handleSearch}
            >
              Axtar
            </Button>
            <Button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={cn(
                "cursor-pointer transition-all",
                isAdvancedOpen && "",
              )}
            >
              <Icon icon="ph:sliders-horizontal-bold" className="text-xl" />
              <span>Ətraflı</span>
              <Icon
                icon="ph:caret-down-bold"
                className={cn(
                  "transition-transform",
                  isAdvancedOpen && "rotate-180",
                )}
              />
            </Button>
          </div>
        </div>

        <AdvancedFilterDesktop
          isOpen={isAdvancedOpen}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          condition={condition}
          onConditionChange={setCondition}
          fuel={fuel}
          onFuelChange={setFuel}
        />
      </div>
    </div>
  );
}
