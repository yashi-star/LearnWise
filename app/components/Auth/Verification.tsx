/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";
import axios from "axios";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  token: string; // Pass token directly as prop instead of from Redux
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute, setOpen, token }) => {
  const [loading, setLoading] = useState(false);
  const [invalidError, setInvalidError] = useState(false);

  // Refs for the OTP inputs
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // State for verification code
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Create a new verification code object
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    // If input has a value and it's not the last input, focus the next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle key down events (for backspace navigation)
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !verifyNumber[index as keyof VerifyNumber] &&
      index > 0
    ) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = Object.values(verifyNumber).join("");

    if (verificationCode.length !== 4) {
      setInvalidError(true);
      return;
    }

    setLoading(true);
    try {
      // Direct API call instead of Redux mutation
      await axios.post("/api/auth/activate", {
        activation_token: token,
        activation_code: verificationCode,
      });

      toast.success("Account activated successfully");
      setRoute("Login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Activation failed");
      setInvalidError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col items-center justify-center">
        <ShieldCheck className="w-16 h-16 text-primary mb-4" />
        <p className="text-sm text-center text-muted-foreground max-w-sm">
          A verification code has been sent to your email. Please enter the code
          to activate your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-center space-x-2">
          {[0, 1, 2, 3].map(index => (
            <Input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={verifyNumber[index as keyof VerifyNumber]}
              onChange={e => handleInputChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className={`w-12 h-12 text-center text-lg ${
                invalidError ? "border-red-500" : ""
              }`}
            />
          ))}
        </div>

        {invalidError && (
          <p className="text-red-500 text-sm text-center">
            Invalid verification code. Please try again.
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?
        </p>
        <Button variant="link" className="text-primary text-sm">
          Resend Code
        </Button>
      </div>

      <div className="text-center">
        <Button
          variant="link"
          className="text-sm"
          onClick={() => setRoute("Login")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default Verification;
