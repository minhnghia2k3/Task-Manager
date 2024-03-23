"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Component() {
  const [errorEmail, setErrorEmail] = useState<string>("");
  const router = useRouter();
  const formSchema = z
    .object({
      email: z.string({ required_error: "Email is required." }).email(),
      password: z
        .string()
        .min(8, "The password must be at least 8 characters long")
        .regex(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
          "The password must contain symbols, numbers, uppercase letters"
        ),
      confirmPassword: z.string({
        required_error: "Confirm password is required.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Check is email exist?
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: [["Content-type", "application/json"]],
    });

    if (response.ok) {
      router.push("/login");
    }

    const result = await response.json();
    if (result.statusCode === 409) {
      setErrorEmail(result.message);
    }
  }
  return (
    <div className="px-4 py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to sign up a new account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  {
                    <p className="text-sm font-medium text-destructive">
                      {errorEmail}
                    </p>
                  }
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* {error.title && error.description && (
              <p className="text-destructive text-sm">{error.description}</p>
            )} */}

            <div className="space-y-4">
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
              <Button className="w-full space-y-4">Sign up</Button>
              <Button className="w-full" variant="outline">
                Sign up with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {"Already have an account? "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
