"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

type Error = {
  title: string;
  description: string;
};

export default function Component() {
  const router = useRouter();
  const [error, setError] = useState("");

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: [["Content-Type", "application/json"]],
        credentials: "include",
      }
    );
    if (response.ok) {
      router.push("/");
    } else {
      const result = await response.json();
      setError(result.message);
    }
  }
  return (
    <div className="px-4 py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </p>
        </div>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
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
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <div className="space-y-4">
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
              <Button className="w-full space-y-4">Login</Button>
              <Button className="w-full" variant="outline">
                Log in with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              {"Don't have an account? "}
              <Link className="underline" href="/sign-up">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
