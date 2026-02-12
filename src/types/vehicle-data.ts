// Marka və model strukturu
export interface VehicleBrand {
  value: string;
  label: string;
  icon: string; // /images/brands/bmw.png kimi path
}

export interface VehicleModel {
  value: string;
  label: string;
  brandValue: string; // hansı markaya aid olduğu
}

// Kateqoriya strukturu
export interface Category {
  value: string;
  label: string;
  icon: string; // /images/categories/cooling.png
}

export interface SubCategory {
  value: string;
  label: string;
  categoryValue: string; // hansı kateqoriyaya aid olduğu
}

// Növ tipləri
export type VehicleType = "minik" | "kommersiya" | "moto";
