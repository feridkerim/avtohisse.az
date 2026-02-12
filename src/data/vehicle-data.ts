import {
  VehicleBrand,
  VehicleModel,
  Category,
  SubCategory,
} from "@/types/vehicle-data";

// MİNİK avtomobil markaları
export const MINIK_BRANDS: VehicleBrand[] = [
  {
    value: "bmw",
    label: "BMW",
    icon: "/images/brands/1200px-BMW_logo_(gray).svg@54x.png",
  },
  {
    value: "mercedes",
    label: "Mercedes-Benz",
    icon: "/images/brands/mercedes-benz-9@54x.png",
  },
  {
    value: "audi",
    label: "Audi",
    icon: "/images/brands/audi_- logo-100x62@34x.png",
  },
  {
    value: "toyota",
    label: "Toyota",
    icon: "/images/brands/toyota copy 3@54x.png",
  },
  {
    value: "hyundai",
    label: "Hyundai",
    icon: "/images/brands/hyundai-motor-company-2 copy@54x.png",
  },
];

// KOMMERSİYA avtomobil markaları
export const KOMMERSIYA_BRANDS: VehicleBrand[] = [
  {
    value: "ford-transit",
    label: "Ford Transit",
    icon: "/images/brands/ford.png",
  },
  {
    value: "mercedes-sprinter",
    label: "Mercedes Sprinter",
    icon: "/images/brands/mercedes.png",
  },
  { value: "iveco", label: "Iveco", icon: "/images/brands/iveco.png" },
  { value: "man", label: "MAN", icon: "/images/brands/man.png" },
];

// MOTO markaları
export const MOTO_BRANDS: VehicleBrand[] = [
  { value: "yamaha", label: "Yamaha", icon: "/images/brands/yamaha.png" },
  { value: "honda", label: "Honda", icon: "/images/brands/honda.png" },
  { value: "suzuki", label: "Suzuki", icon: "/images/brands/suzuki.png" },
  { value: "kawasaki", label: "Kawasaki", icon: "/images/brands/kawasaki.png" },
];

// MİNİK modelləri
export const MINIK_MODELS: VehicleModel[] = [
  { value: "3-series", label: "3 Series", brandValue: "bmw" },
  { value: "5-series", label: "5 Series", brandValue: "bmw" },
  { value: "x5", label: "X5", brandValue: "bmw" },
  { value: "c-class", label: "C-Class", brandValue: "mercedes" },
  { value: "e-class", label: "E-Class", brandValue: "mercedes" },
  { value: "a4", label: "A4", brandValue: "audi" },
  { value: "a6", label: "A6", brandValue: "audi" },
  { value: "camry", label: "Camry", brandValue: "toyota" },
  { value: "corolla", label: "Corolla", brandValue: "toyota" },
  { value: "elantra", label: "Elantra", brandValue: "hyundai" },
  { value: "sonata", label: "Sonata", brandValue: "hyundai" },
];

// KOMMERSİYA modelləri
export const KOMMERSIYA_MODELS: VehicleModel[] = [
  { value: "transit-van", label: "Transit Van", brandValue: "ford-transit" },
  {
    value: "transit-minibus",
    label: "Transit Minibus",
    brandValue: "ford-transit",
  },
  {
    value: "sprinter-313",
    label: "Sprinter 313",
    brandValue: "mercedes-sprinter",
  },
  {
    value: "sprinter-516",
    label: "Sprinter 516",
    brandValue: "mercedes-sprinter",
  },
  { value: "daily", label: "Daily", brandValue: "iveco" },
  { value: "tgx", label: "TGX", brandValue: "man" },
];

// MOTO modelləri
export const MOTO_MODELS: VehicleModel[] = [
  { value: "r1", label: "YZF-R1", brandValue: "yamaha" },
  { value: "mt07", label: "MT-07", brandValue: "yamaha" },
  { value: "cbr600", label: "CBR 600RR", brandValue: "honda" },
  { value: "gsx-r", label: "GSX-R1000", brandValue: "suzuki" },
  { value: "ninja", label: "Ninja ZX-10R", brandValue: "kawasaki" },
];

// KATEQORİYALAR
export const CATEGORIES: Category[] = [
  {
    value: "cooling",
    label: "Soyutma sistemi",
    icon: "/images/categories/cooling.png",
  },
  { value: "engine", label: "Mühərrik", icon: "/images/categories/engine.png" },
  {
    value: "suspension",
    label: "Asma",
    icon: "/images/categories/suspension.png",
  },
  {
    value: "brakes",
    label: "Əyləc sistemi",
    icon: "/images/categories/brakes.png",
  },
  {
    value: "electrical",
    label: "Elektrik",
    icon: "/images/categories/electrical.png",
  },
  {
    value: "transmission",
    label: "Ötürücü qutu",
    icon: "/images/categories/transmission.png",
  },
];

// ALT KATEQORİYALAR
export const SUBCATEGORIES: SubCategory[] = [
  // Soyutma sistemi
  { value: "water-pump", label: "Su pompası", categoryValue: "cooling" },
  { value: "radiator", label: "Radiator", categoryValue: "cooling" },
  { value: "thermostat", label: "Termostat", categoryValue: "cooling" },
  { value: "fan", label: "Ventilyator", categoryValue: "cooling" },

  // Mühərrik
  { value: "piston", label: "Piston", categoryValue: "engine" },
  { value: "oil-pump", label: "Yağ pompası", categoryValue: "engine" },
  { value: "timing-belt", label: "Qaz paylaması", categoryValue: "engine" },
  { value: "valve", label: "Klapan", categoryValue: "engine" },

  // Asma
  {
    value: "shock-absorber",
    label: "Amortizator",
    categoryValue: "suspension",
  },
  { value: "spring", label: "Yay", categoryValue: "suspension" },
  { value: "ball-joint", label: "Şar dayaq", categoryValue: "suspension" },

  // Əyləc
  { value: "brake-pad", label: "Əyləc kolodkaları", categoryValue: "brakes" },
  { value: "brake-disc", label: "Əyləc diski", categoryValue: "brakes" },
  { value: "brake-caliper", label: "Əyləc suportu", categoryValue: "brakes" },

  // Elektrik
  { value: "alternator", label: "Generator", categoryValue: "electrical" },
  { value: "starter", label: "Starter", categoryValue: "electrical" },
  { value: "battery", label: "Akkumulyator", categoryValue: "electrical" },

  // Ötürücü qutu
  { value: "clutch", label: "Mufta", categoryValue: "transmission" },
  { value: "gearbox", label: "Sürətlər qutusu", categoryValue: "transmission" },
];
