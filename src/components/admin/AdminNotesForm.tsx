"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/Textarea";
import { updateAdminNotes } from "@/app/admin/(dashboard)/orders/actions";

type Props = { id: string; notes: string };

export function AdminNotesForm({ id, notes }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(notes);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setMsg(null);
    startTransition(async () => {
      const res = await updateAdminNotes({ id, adminNotes: value });
      if (res.ok) {
        setMsg({ ok: true, text: "Saved" });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error });
      }
    });
  }

  return (
    <div className="space-y-3">
      <Textarea
        label="Private notes (customer cannot see this)"
        name="adminNotes"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setMsg(null);
        }}
        disabled={pending}
      />
      <div className="flex items-center gap-3">
        <Button size="sm" onClick={save} disabled={pending}>
          {pending ? "Saving..." : "Save note"}
        </Button>
        {msg && (
          <span
            role="status"
            className={msg.ok ? "text-sm text-green-700" : "text-sm text-red-600"}
          >
            {msg.text}
          </span>
        )}
      </div>
    </div>
  );
}