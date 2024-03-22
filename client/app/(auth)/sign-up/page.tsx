import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="px-4 py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to sign up a new account
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
            </div>
            <Input id="password" required type="password" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Confirm Password</Label>
            </div>
            <Input id="confirmPassword" required type="password" />
          </div>
          <Button className="w-full">Sign up</Button>
          <Button className="w-full" variant="outline">
            Sign up with Google
          </Button>
        </div>
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
