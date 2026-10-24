import { cn } from "@/lib/cn";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export function Select({
  label,
  error,
  id,
  className,
  children,
  ...props
}: Props) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-navy">
          {label}
        </label>
      )}
      <select
        id={inputId}
        aria-invalid={!!error}
        className={cn(
          "h-11 rounded-lg border bg-white px-3 text-navy",
          "focus:outline-2 focus:outline-offset-0 focus:outline-brand",
          error ? "border-red-500" : "border-navy/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}