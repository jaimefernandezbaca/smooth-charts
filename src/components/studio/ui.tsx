import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-surface-2 px-3 text-base text-fg outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/25 sm:text-sm";

export function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block text-sm font-medium text-fg">{children}</span>;
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      />
    </label>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          className={cn(fieldClass, "appearance-none pr-10")}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
      </span>
    </label>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span>
        <span className="block text-sm text-fg">{label}</span>
        {hint ? <span className="mt-0.5 block text-xs text-muted">{hint}</span> : null}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition",
          checked ? "bg-primary" : "bg-border",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-6 rounded-full bg-knob shadow transition",
            checked ? "left-5" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}

export function IconButton({
  label,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl text-muted transition hover:bg-surface-2 hover:text-fg disabled:cursor-not-allowed disabled:opacity-30",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-fg transition hover:bg-surface-2 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
