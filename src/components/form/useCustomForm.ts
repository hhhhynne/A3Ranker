import {
    useForm,
    type ValidationMode,
    type UseFormProps,
  } from "react-hook-form";
  
  import { zodResolver } from "@hookform/resolvers/zod";
  import type * as z from "zod";
  
  interface UseCustomFormProps<T extends z.ZodSchema<any>>
    extends UseFormProps<z.TypeOf<T>> {
    schema: T;
    mode?: keyof ValidationMode;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useCustomForm = <T extends z.ZodSchema<any>>({
    schema,
    mode = "onChange",
    ...formConfig
  }: UseCustomFormProps<T>) => {
    return useForm({
      ...formConfig,
      mode,
      resolver: zodResolver(schema),
    });
  };
  
  export default useCustomForm;