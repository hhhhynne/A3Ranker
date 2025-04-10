import { forwardRef } from 'react';
import { Label } from '@/components/ui/label';
import { type Root } from '@radix-ui/react-checkbox';

import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import FieldError from '../fieldError';

interface CheckboxProps {
  label: string;
  name: string;
  explainingText?: string;
}
export const FormCheckbox = forwardRef<
  React.ElementRef<typeof Root>,
  CheckboxProps
>(function Check({ label, explainingText, ...props }, ref) {
  const { formState, setValue, } = useFormContext();
  return (
    <div className="items-center flex space-x-2">
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={props.name}
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>

        {formState.errors[props.name] &&
        (formState.dirtyFields[props.name] || formState.isSubmitted) ? (
          <FieldError name={props.name} />
        ) : (
          explainingText && (
            <p className="text-sm text-muted-foreground">{explainingText}</p>
          )
        )}
      </div>
      <Checkbox
        className="h-6 w-7"
        id={props.name}
        ref={ref}
        defaultChecked={
          formState.defaultValues && formState.defaultValues[props.name] !== ''
            ? formState.defaultValues[props.name]
            : false
        }
        {...props}
        onCheckedChange={(e) => setValue(props.name, e)}
      />
    </div>
  );
});
