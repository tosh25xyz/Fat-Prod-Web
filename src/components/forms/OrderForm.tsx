"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type ServiceOption = { id: string; name: string; price: number };

type Props = {
  services: ServiceOption[];
  defaultServiceId?: string;
};

type Errors = Record<string, string>;

const BD_PHONE = /^(?:\+?88)?01[3-9]\d{8}$/;

export function OrderForm({ services, defaultServiceId }: Props) {
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
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  function set(name: keyof typeof values) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => setValues((v) => ({ ...v, [name]: e.target.value }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!values.serviceId) e.serviceId = "Select a service";
    if (values.customerName.trim().length < 2) e.customerName = "Enter your name";
    if (!BD_PHONE.test(values.phone.trim()))
      e.phone = "Enter a valid BD phone number (01XXXXXXXXX)";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
      e.email = "Enter a valid email";
    if (values.brief.trim().length < 10)
      e.brief = "Please write at least 10 characters";
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const clientErrors = validate();
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: values.customerName,
          email: values.email,
          phone: values.phone,
          businessName: values.businessName,
          brief: values.brief,
          preferredDate: values.preferredDate,
          items: [{ serviceId: values.serviceId, quantity: 1 }],
        }),
      });
      const data = await res.json();

      if (res.status === 201) {
        setOrderNumber(data.order.orderNumber);
        return;
      }

      if (res.status === 400 && Array.isArray(data.details)) {
        const serverErrors: Errors = {};
        for (const d of data.details as { field: string; message: string }[]) {
          const key = d.field.startsWith("items") ? "serviceId" : d.field;
          serverErrors[key] = d.message;
        }
        setErrors(serverErrors);
        return;
      }

      setFormError(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (orderNumber) {
    return (
      <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center">
        <h2 className="text-2xl font-bold">Request received</h2>
        <p className="mt-2 text-navy/70">
          Thank you. We will contact you soon to discuss your project.
        </p>
        <p className="mt-6 text-sm text-navy/60">Your order number</p>
        <p className="text-xl font-semibold text-brand">{orderNumber}</p>
        <Link href="/" className="mt-8 inline-block">
          <Button variant="outline">Back to home</Button>
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-navy/10 bg-white p-6 sm:p-8"
    >
      <Select
        label="Service"
        name="serviceId"
        value={values.serviceId}
        onChange={set("serviceId")}
        error={errors.serviceId}
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
      />

      <Input
        label="Business name (optional)"
        name="businessName"
        value={values.businessName}
        onChange={set("businessName")}
        error={errors.businessName}
      />

      <Textarea
        label="Project brief"
        name="brief"
        placeholder="Tell us what you need, your goals and any ideas."
        value={values.brief}
        onChange={set("brief")}
        error={errors.brief}
      />

      <Input
        label="Preferred date (optional)"
        name="preferredDate"
        type="date"
        value={values.preferredDate}
        onChange={set("preferredDate")}
        error={errors.preferredDate}
      />

      {formError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send request"}
      </Button>
    </form>
  );
}