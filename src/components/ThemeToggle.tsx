import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-xl hover:bg-secondary/70 transition-all duration-200 group"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px] text-[hsl(var(--warning))] transition-transform group-hover:rotate-45 duration-300" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-primary transition-transform group-hover:-rotate-12 duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
