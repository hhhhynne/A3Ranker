import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input as InputField } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import FieldError from "../fieldError";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  name: string;
}

export const FormTextInput = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, type = "text", ...props }, ref) {
    const { formState } = useFormContext();

    return (
      <div className={cn("relative w-full", props.className)} {...props}>
        <Label htmlFor={props.name}>{label}</Label>
        <InputField
          className={
            formState.errors[props.name] &&
            (formState.dirtyFields[props.name] || formState.isSubmitted)
              ? "animate-shake border-2 border-red-500"
              : "h-10"
          }
          id={props.name}
          type={type}
          ref={ref}
          {...props}
        />
        <FieldError name={props.name} />
      </div>
    );
  }
);
