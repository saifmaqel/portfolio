"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Toaster } from "./ui/sonner";

export function ThemeProvider({
  children
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      enableSystem
      attribute={`class`}
      defaultTheme="system"
      disableTransitionOnChange
    >
      {children}
      <ToasterProvider />
    </NextThemesProvider>
  );
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
