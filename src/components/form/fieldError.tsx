import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

const FieldError = ({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  // In order to mitigate content shifting, we'll render an empty div with some height as a placeholder for the error message
  if (!error) return <div className="h-6" />;

  return (
    <p className={cn("my-1 text-sm text-red-500", className)} role="alert">
      {error.message as string}
    </p>
  );
};

export default FieldError;