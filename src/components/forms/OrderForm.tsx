"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { orderSchema, toFieldErrors } from "@/lib/validations";

type ServiceOption = { id: string; name: string; price: number };

type Props = {
  services: ServiceOption[];
  defaultServiceId?: string;
};

type Errors = Record<string, string>;

export function OrderForm({ services, defaultServiceId }: Props) {
  const router = useRouter();
  const submitting = useRef(false); // double click guard (state er cheye fast)
  const [values, setValues] = useState({
    serviceId: defaultServiceId ?? "",
    customerName: "",
    phone: "",
    email: "",
    businessName: "",
    brief: "",
    preferredDate: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(name: keyof typeof values) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      // user type korle oi field er error shoriye dao
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const next = { ...prev };
        delete next[name];
        return next;
      });
    };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting.current) return;

    setFormError("");

    const payload = {
      customerName: values.customerName,
      email: values.email,
      phone: values.phone,
      businessName: values.businessName,
      brief: values.brief,
      preferredDate: values.preferredDate,
      items: [{ serviceId: values.serviceId, quantity: 1 }],
    };

    // 1. Client validation (server er shoman schema)
    const parsed = orderSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error.issues));
      return;
    }
    setErrors({});

    submitting.current = true;
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: {
  order?: { orderNumber?: string };
  details?: { field: string; message: string }[];
  error?: string;
} | null = null;
      try {
        data = await res.json();
      } catch {
        /* json na hole data null thakbe */
      }

      // 2. Success: redirect (loading true thakbe, jate abar na chape)
      if (res.status === 201 && data?.order?.orderNumber) {
        router.push(
          `/order/success?order=${encodeURIComponent(data.order.orderNumber)}`
        );
        return;
      }

      // 3. Server validation error
      if (res.status === 400 && Array.isArray(data?.details)) {
        const serverErrors: Errors = {};
        for (const d of data.details as { field: string; message: string }[]) {
          const key = d.field.startsWith("items") ? "serviceId" : d.field;
          if (!serverErrors[key]) serverErrors[key] = d.message;
        }
        setErrors(serverErrors);
      } else if (res.status === 400 && data?.error) {
        setFormError(data.error);
      } else {
        // 4. 500 ba onno error
        setFormError(
          "Something went wrong on our side. Please try again in a moment."
        );
      }
    } catch {
      setFormError(
        "Network error. Please check your internet connection and try again."
      );
    }

    submitting.current = false;
    setLoading(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-navy/10 bg-white p-6 sm:p-8"
    >
      {formError && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {formError}
        </p>
      )}

      <Select
        label="Service"
        name="serviceId"
        value={values.serviceId}
        onChange={set("serviceId")}
        error={errors.serviceId}
        disabled={loading}
      >
        <option value="">Select a service</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} (from {s.price.toLocaleString("en-US")} Tk)
          </option>
        ))}
      </Select>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Name"
          name="customerName"
          value={values.customerName}
          onChange={set("customerName")}
          error={errors.customerName}
          autoComplete="name"
          disabled={loading}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          placeholder="01XXXXXXXXX"
          value={values.phone}
          onChange={set("phone")}
          error={errors.phone}
          autoComplete="tel"
          disabled={loading}
        />
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={set("email")}
        error={errors.email}
        autoComplete="email"
        disabled={loading}
      />

      <Input
        label="Business name (optional)"
        name="businessName"
        value={values.businessName}
        onChange={set("businessName")}
        error={errors.businessName}
        disabled={loading}
      />

      <Textarea
        label="Project brief"
        name="brief"
        placeholder="Tell us what you need, your goals and any ideas."
        value={values.brief}
        onChange={set("brief")}
        error={errors.brief}
        disabled={loading}
      />

      <Input
        label="Preferred date (optional)"
        name="preferredDate"
        type="date"
        value={values.preferredDate}
        onChange={set("preferredDate")}
        error={errors.preferredDate}
        disabled={loading}
      />

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send request"}
      </Button>
    </form>
  );
}