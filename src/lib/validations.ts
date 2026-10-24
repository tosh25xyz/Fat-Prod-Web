import { z } from "zod";

// Form theke "" ashle undefined hishebe dhorbe
const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

export const orderSchema = z.object({
  customerName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, "Enter a valid BD phone number (01XXXXXXXXX)"),
  businessName: z.preprocess(
    emptyToUndefined,
    z.string().trim().min(2, "Business name is too short").max(150).optional()
  ),
  brief: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
  preferredDate: z.preprocess(
    emptyToUndefined,
    z.coerce
      .date()
      .refine((d) => d.getTime() > Date.now(), "Date must be in the future")
      .optional()
  ),
  items: z
    .array(
      z.object({
        serviceId: z.string().min(1, "Select a service"),
        quantity: z.number().int().min(1).max(10).default(1),
      })
    )
    .min(1, "Select at least one service")
    .max(10),
});

export type OrderInput = z.infer<typeof orderSchema>;