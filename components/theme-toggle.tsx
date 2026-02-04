"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-12 w-12 rounded-full bg-transparent"
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {theme === "dark" ? (
        <Sun className="w-20 h-20" strokeWidth={2.5} />
      ) : (
        <Moon className="w-20 h-20" strokeWidth={2.5} />
      )}
    </Button>
  );
}
