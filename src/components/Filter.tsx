"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FilterItemProps = {
  type: "marka" | "model" | "il" | "muherrik";
  label: string;
  data: { value: string; label: string }[];
  selections: Record<"marka" | "model" | "il" | "muherrik", string>;
  openStates: Record<"marka" | "model" | "il" | "muherrik", boolean>;
  setSelections: React.Dispatch<
    React.SetStateAction<Record<"marka" | "model" | "il" | "muherrik", string>>
  >;
  setOpenStates: React.Dispatch<
    React.SetStateAction<Record<"marka" | "model" | "il" | "muherrik", boolean>>
  >;
};

const FilterItem = ({
  type,
  label,
  data,
  selections,
  openStates,
  setSelections,
  setOpenStates,
}: FilterItemProps) => {
  const handleSelect = (value: string) => {
    setSelections((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
    setOpenStates((prev) => ({ ...prev, [type]: false }));
  };

  return (
    <div className="flex flex-col gap-1">
      <Popover
        open={openStates[type]}
        onOpenChange={(val) =>
          setOpenStates((prev) => ({ ...prev, [type]: val }))
        }
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between font-sans border border-slate-200"
          >
            {selections[type]
              ? data.find((item) => item.value === selections[type])?.label
              : label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-75 p-0" align="start">
          <Command>
            <CommandInput
              placeholder={`${label} axtar...`}
              className="font-sans"
            />
            <CommandList>
              <CommandEmpty>Tapılmadı.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelect(item.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selections[type] === item.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Filtrlər üçün data strukturu
const filterData = {
  marka: [
    { value: "bmw", label: "BMW" },
    { value: "mercedes", label: "Mercedes" },
    { value: "audi", label: "Audi" },
  ],
  model: [
    { value: "g30", label: "G30" },
    { value: "f10", label: "F10" },
    { value: "e-class", label: "E-Class" },
  ],
  il: Array.from({ length: 26 }, (_, i) => ({
    value: (2026 - i).toString(),
    label: (2026 - i).toString(),
  })),
  muherrik: [
    { value: "2.0", label: "2.0 L" },
    { value: "3.0", label: "3.0 L" },
    { value: "4.4", label: "4.4 L" },
  ],
};

export default function Filter() {
  const [selections, setSelections] = React.useState({
    marka: "",
    model: "",
    il: "",
    muherrik: "",
  });

  const [openStates, setOpenStates] = React.useState({
    marka: false,
    model: false,
    il: false,
    muherrik: false,
  });

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <FilterItem
          type="marka"
          label="Marka"
          data={filterData.marka}
          selections={selections}
          openStates={openStates}
          setSelections={setSelections}
          setOpenStates={setOpenStates}
        />
        <FilterItem
          type="model"
          label="Model"
          data={filterData.model}
          selections={selections}
          openStates={openStates}
          setSelections={setSelections}
          setOpenStates={setOpenStates}
        />
        <FilterItem
          type="il"
          label="İl"
          data={filterData.il}
          selections={selections}
          openStates={openStates}
          setSelections={setSelections}
          setOpenStates={setOpenStates}
        />
        <FilterItem
          type="muherrik"
          label="Mühərrik"
          data={filterData.muherrik}
          selections={selections}
          openStates={openStates}
          setSelections={setSelections}
          setOpenStates={setOpenStates}
        />
      </div>
    </div>
  );
}
