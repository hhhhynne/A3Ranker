'use client';

import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';
import { type ComponentProps } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, X } from 'lucide-react';
import { Icons } from '../ui/icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface GenericFormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  withButtons?: boolean;
  submitText?: string;
  onCancel?: () => void;
}

const GenericForm = <T extends FieldValues>({
  form,
  onSubmit,
  onCancel,
  submitText,
  children,
  withButtons = true,
  ...props
}: GenericFormProps<T>) => {
  const isLoading = form.formState.isLoading || form.formState.isSubmitting;
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
        {withButtons && (
          <div className="mt-2.5 flex flex-row-reverse gap-x-2">
            <Button
              className="flex gap-2 disabled:cursor-not-allowed bg-primary hover:bg-orange-700 mr-3 mt-3 px-10"
              type="submit"
            >
              {submitText ?? 'Lagre'}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
            {onCancel && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onCancel();
                }}
                className="flex gap-2 mt-3 px-10"
                variant="secondary"
              >
                <X className="h-4 w-4" />
                Avbryt
              </Button>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default GenericForm;
