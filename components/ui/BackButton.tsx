"use client";

import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "./button";

interface BackButtonProps {
  to: string;
}

export default function BackButton({ to }: BackButtonProps) {
  return (
    <Button
      className="cursor-pointer"
      onClick={() => redirect(to)}
      variant="secondary"
    >
      <ArrowLeft className="h-4 w-4" /> Back
    </Button>
  );
}
