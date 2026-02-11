import * as z from "zod";

export const adSchema = z.object({
  // Addım 1: Avtomobil
  vehicleType: z.string().min(1, "Növ seçin"),
  brand: z.string().min(1, "Marka vacibdir"),
  model: z.string().min(1, "Model vacibdir"),
  year: z.string().min(1, "İl vacibdir"),
  banType: z.string().min(1, "Ban növü vacibdir"),
  engine: z.string().min(1, "Mühərrik vacibdir"),
  driveTrain: z.string().min(1, "Ötürücü vacibdir"),
  transmission: z.string().min(1, "Sürətlər qutusu vacibdir"),
  modification: z.string().optional(),
  seatsCount: z.string().optional(),
  color: z.string().min(1, "Rəng seçin"),
  market: z.string().min(1, "Bazar seçin"),

  // Addım 2: Detal
  category: z.string().min(1, "Kateqoriya seçin"),
  subCategory: z.string().min(1, "Alt kateqoriya seçin"),
  brandPart: z.string().min(1, "Brend seçin"),
  condition: z.string().min(1, "Vəziyyət seçin"),
  oemCode: z.string().optional(),
  dontKnowOem: z.boolean().default(false),
  warranty: z.string().min(1, "Zəmanət seçin"),

  // Addım 3: Media və Təsvir
  description: z.string().min(10, "Minimum 10 simvol yazın"),
  address: z.string().min(1, "Ünvan vacibdir"),
  price: z.string().min(1, "Qiymət vacibdir"),
  currency: z.string().default("AZN"),
  isBarter: z.boolean().default(false),
  isNegotiable: z.boolean().default(false),

  // Addım 4: Əlaqə
  fullName: z.string().min(2, "Ad vacibdir"),
  phone: z.string().min(7, "Nömrə düzgün deyil"),
  email: z.string().email("Düzgün email yazın").optional().or(z.literal("")),
});

export type AdFormValues = z.infer<typeof adSchema>;
