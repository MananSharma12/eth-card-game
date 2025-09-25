import Link from "next/link";
import {SquareAsterisk} from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle";
import WalletButton from "@/components/wallet-button";

export function Header() {
  return (
    <header className="container mx-auto px-4 py-6 relative z-10">
      <nav className="flex items-center justify-between">
        <Link className="flex items-center space-x-2" href="/">
          <SquareAsterisk className="h-8 w-8 text-primary"/>
          <h1 className="text-2xl font-bold text-foreground">HeroForge NFT</h1>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle/>
          <WalletButton/>
        </div>
      </nav>
    </header>
  );
}