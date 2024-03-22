/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XtYZ6r88OF1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="px-4 py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" required type="password" />
          </div>
          <Button className="w-full">Login</Button>
          <Button className="w-full" variant="outline">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {"Don't have an account? "}
          <Link className="underline" href="/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
