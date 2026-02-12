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
}

export function ComboboxWithIcon({
  data,
  value,
  onChange,
  placeholder,
  searchPlaceholder = "Axtar...",
  emptyText = "Tapılmadı.",
  showIcon = true,
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
          className="w-full justify-between font-sans border-slate-200 hover:bg-slate-50"
        >
          <div className="flex items-center gap-2">
            {selectedItem?.icon && showIcon && (
              <Image
                src={selectedItem.icon}
                alt={selectedItem.label}
                width={20}
                height={20}
                className="object-contain"
              />
            )}
            <span className={cn(!selectedItem && "text-muted-foreground")}>
              {selectedItem ? selectedItem.label : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
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
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer",
                    value === item.value && "bg-accent",
                  )}
                >
                  {item.icon && showIcon && (
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                      className="mr-2 object-contain"
                    />
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
