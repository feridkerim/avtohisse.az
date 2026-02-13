import * as z from "zod";

export const adFormSchema = z
  .object({
    vehicleType: z.string().min(1, "Növ seçilməlidir"),
    brand: z.string().min(1, "Marka seçilməlidir"),
    model: z.string().min(1, "Model seçilməlidir"),
    year: z.string().min(1, "İl seçilməlidir"),
    banType: z.string().min(1, "Ban növü seçilməlidir"),
    engine: z.string().min(1, "Mühərrik seçilməlidir"),
    transmission: z.string().min(1, "Sürətlər qutusu seçilməlidir"),

    category: z.string().min(1, "Kateqoriya seçilməlidir"),
    subCategory: z.string().min(1, "Alt kateqoriya seçilməlidir"),
    brandPart: z.string().optional(),
    warranty: z.string().min(1, "Zəmanət seçimi edilməlidir"),
    dontKnowOem: z.boolean().default(false),
    oemCode: z.string().optional(),
    condition: z.string().min(1, "Vəziyyət seçilməlidir"),

    price: z.string().min(1, "Qiymət daxil edilməlidir"),
    currency: z.string().default("AZN"),
    isNegotiable: z.boolean().default(false),
    isBarter: z.boolean().default(false),
    delivery: z.boolean().default(false),
    description: z.string().optional(),

    fullName: z.string().min(2, "Adınız qeyd olunmalıdır"),
    address: z.string().min(2, "Ünvan qeyd olunmalıdır"),
    phone: z.string().min(10, "Mobil nömrə tam daxil edilməlidir"),
    email: z.string().email("Düzgün email daxil edin").min(1, "Email vacibdir"),
  })
  .superRefine((data, ctx) => {
    if (!data.dontKnowOem && (!data.oemCode || data.oemCode.length < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["oemCode"],
        message: "OEM kodu daxil edin və ya 'Bilmirəm' seçin",
      });
    }
  });

export type AdFormValues = z.infer<typeof adFormSchema>;
