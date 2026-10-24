import { cn } from "@/lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, id, className, ...props }: Props) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-navy">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        className={cn(
          "h-11 rounded-lg border bg-white px-3 text-navy placeholder:text-navy/40",
          "focus:outline-2 focus:outline-offset-0 focus:outline-brand",
          error ? "border-red-500" : "border-navy/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}