"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending ? true : false} onClick={() => signIn()}>
      Sign in {pending ? "..." : ""}
    </Button>
  );
}
