"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { contactSchema, toFieldErrors } from "@/lib/validations";

type Errors = Record<string, string>;

const empty = { name: "", email: "", message: "" };

export function ContactForm() {
  const submitting = useRef(false);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function set(name: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
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

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error.issues));
      return;
    }
    setErrors({});

    submitting.current = true;
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      let data: {
        details?: { field: string; message: string }[];
        error?: string;
      } | null = null;
      try {
        data = await res.json();
      } catch {
        /* json na hole null */
      }

      if (res.status === 201) {
        setValues(empty);
        setSent(true);
      } else if (res.status === 400 && Array.isArray(data?.details)) {
        const serverErrors: Errors = {};
        for (const d of data.details) {
          if (!serverErrors[d.field]) serverErrors[d.field] = d.message;
        }
        setErrors(serverErrors);
      } else {
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

  if (sent) {
    return (
      <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center">
        <h2 className="text-2xl font-bold">Message sent</h2>
        <p className="mt-2 text-navy/70">
          Thank you for reaching out. We will reply to you soon.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSent(false)}
        >
          Send another message
        </Button>
      </div>
    );
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

      <Input
        label="Name"
        name="name"
        value={values.name}
        onChange={set("name")}
        error={errors.name}
        autoComplete="name"
        disabled={loading}
      />
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
      <Textarea
        label="Message"
        name="message"
        value={values.message}
        onChange={set("message")}
        error={errors.message}
        disabled={loading}
      />

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}