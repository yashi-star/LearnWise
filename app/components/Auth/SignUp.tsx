/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Github } from "lucide-react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid Email!!")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password!").min(8),
});

const Signup: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      try {
        setIsLoading(true);

        // Call our API to register
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Registration failed");
          return;
        }

        toast.success("Registration successful!");

        // Immediately sign in the user
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          toast.error(
            "Registration successful, but couldn't log in automatically"
          );
          setRoute("Login");
        } else {
          setOpen(false);
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An error occurred during registration");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="John Doe"
            className={errors.name && touched.name ? "border-red-500" : ""}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="example@email.com"
            className={errors.email && touched.email ? "border-red-500" : ""}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="••••••••"
              className={
                errors.password && touched.password
                  ? "border-red-500 pr-10"
                  : "pr-10"
              }
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => signIn("google")}
        >
          <FcGoogle className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => signIn("github")}
        >
          <Github className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          className="text-primary font-medium hover:underline"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Signup;
