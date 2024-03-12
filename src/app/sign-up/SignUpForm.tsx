"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth/authActions";
import { useFormState, useFormStatus } from "react-dom";

export function SignUpForm() {
  const { pending } = useFormStatus();

  const [formState, action] = useFormState(signUp, {
    errors: {},
  });

  return (
    <form action={action}>
      <div className="flex flex-col gap-y-2">
        <Label>Email</Label>
        <Input name="email" type="email" placeholder="name@example.com" />
        {formState?.errors.email && (
          <div className="text-sm text-red-500">
            {formState.errors.email.join(", ")}
          </div>
        )}
        <Label>Password</Label>
        <Input name="password" type="password" />
        {formState?.errors.password && (
          <div className="text-sm text-red-500">
            {formState.errors.password.join(", ")}
          </div>
        )}
        <Button disabled={pending ? true : false}>
          Sign in {pending ? "..." : ""}
        </Button>
      </div>
    </form>
  );
}
