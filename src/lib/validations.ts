import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().trim().min(2, "Naam kombe 2 okkhor").max(100),
  email: z.string().trim().email("Valid email din"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, "Valid BD phone number din"),
  businessName: z.string().trim().min(2, "Business name din").max(150),
  brief: z.string().trim().min(10, "Kombe 10 okkhor likhun").max(2000),
  preferredDate: z.coerce
    .date()
    .refine((d) => d.getTime() > Date.now(), "Date ta future e hote hobe"),
  items: z
    .array(
      z.object({
        serviceId: z.string().min(1),
        quantity: z.number().int().min(1).max(10).default(1),
      })
    )
    .min(1, "Kombe ekta service select korun")
    .max(10),
});

export type OrderInput = z.infer<typeof orderSchema>;