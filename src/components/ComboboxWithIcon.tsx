"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
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

interface ComboboxItem {
  value: string;
  label: string;
  icon?: string;
}

interface ComboboxWithIconProps {
  data: ComboboxItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
  emptyText?: string;
  showIcon?: boolean;
  className?: string;
}

export function ComboboxWithIcon({
  data,
  value,
  onChange,
  placeholder,
  searchPlaceholder = "Axtar...",
  emptyText = "Tapılmadı.",
  showIcon = true,
  className,
}: ComboboxWithIconProps) {
  const [open, setOpen] = React.useState(false);

  const selectedItem = data.find((item) => item.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-sans border-slate-200 hover:bg-slate-50",
            className, // <--- YENİ: Gələn class-ları bura əlavə edirik
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {selectedItem?.icon && showIcon && (
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src={selectedItem.icon}
                  alt={selectedItem.label}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span
              className={cn(
                "truncate",
                !selectedItem && "text-muted-foreground",
              )}
            >
              {selectedItem ? selectedItem.label : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0" // Və ya w-[--radix-popover-trigger-width]
        style={{ width: "var(--radix-popover-trigger-width)" }} // Eyni eni saxlamaq üçün
        align="start"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label} // Axtarışın düzgün işləməsi üçün label istifadə etmək daha yaxşıdır
                  onSelect={() => {
                    onChange(item.value === value ? "" : item.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer",
                    value === item.value && "bg-accent",
                  )}
                >
                  {item.icon && showIcon && (
                    <div className="relative w-5 h-5 mr-2 shrink-0">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
