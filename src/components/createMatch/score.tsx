"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface ScoreProps {
  value: string;
  onChange: (value: string) => void;
}

export function Score({ value, onChange }: ScoreProps) {
  const inputChange = (value: string) => {
    onChange(value);
  };
  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => inputChange(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
          <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {!value || value.length < 3 ? (
          <>Enter the score.</>
        ) : (
          <>
            You entered: {value.slice(0, 2)} - {value.slice(2, 4)}
          </>
        )}
      </div>
    </div>
  );
}
