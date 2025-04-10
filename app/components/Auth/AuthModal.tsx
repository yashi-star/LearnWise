"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Login from "./Login";
import SignUp from "./SignUp";
import Verification from "./Verification";

interface AuthModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  setOpen,
  activeRoute,
  setActiveRoute,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeRoute === "Login"
              ? "Welcome Back!"
              : activeRoute === "Sign-Up"
              ? "Join LearnWise"
              : "Verify Your Account"}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {activeRoute === "Login"
              ? "Sign in to access your account"
              : activeRoute === "Sign-Up"
              ? "Create an account to get started"
              : "Complete the verification process"}
          </DialogDescription>
        </DialogHeader>

        {activeRoute === "Login" && (
          <Login setRoute={setActiveRoute} setOpen={setOpen} />
        )}

        {activeRoute === "Sign-Up" && (
          <SignUp setRoute={setActiveRoute} setOpen={setOpen} />
        )}

        {activeRoute === "Verification" && (
          <Verification setRoute={setActiveRoute} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
