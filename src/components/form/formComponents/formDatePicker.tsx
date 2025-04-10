'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import FieldError from '../fieldError';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { z } from 'zod';
interface DatePresets {
  label: string;
  daysUntil: number;
}
interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  name: string;
  presets?: DatePresets[];
  closeAfterSelect?: boolean;
}

export function FormDatePicker({
  label,
  name,
  presets,
  closeAfterSelect = true,
  ...props
}: DatePickerProps) {
  const { setValue, formState } = useFormContext();
  const [open, setOpen] = React.useState<boolean>(false);
  const defaultValue = z
    .date()
    .safeParse(
      formState && formState.defaultValues && formState.defaultValues[name],
    );

  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue.success ? defaultValue.data : undefined,
  );

  return (
    <div className={cn('w-full', props.className)} {...props}>
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, 'PPP', {
                locale: nb,
              })
            ) : (
              <span>Velg en dato</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          {presets && (
            <Select
              onValueChange={(value) => {
                setDate(addDays(new Date(), parseInt(value)));
                setValue(name, addDays(new Date(), parseInt(value)));
                if (closeAfterSelect) setOpen(false);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Populære valg" />
              </SelectTrigger>

              <SelectContent position="popper">
                {presets.map((item) => (
                  <SelectItem
                    key={item.label}
                    value={item.daysUntil.toString()}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div className="rounded-md">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(e) => {
                setDate(e);
                setValue(name, e);
                if (closeAfterSelect) setOpen(false);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
      <FieldError name={name} />
    </div>
  );
}
