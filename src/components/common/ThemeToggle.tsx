import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const {
    currentTheme,
    isDarkMode,
    setTheme,
    toggleDarkMode,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 px-0"
          aria-label="Changer de thème"
        >
          {isDarkMode ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Apparence
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Only allow light/dark toggle */}
        <DropdownMenuItem 
          onClick={toggleDarkMode}
          className="flex items-center gap-2"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4" />
              Passer en mode clair
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              Passer en mode sombre
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;