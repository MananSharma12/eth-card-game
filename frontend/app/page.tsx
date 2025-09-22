import Link from "next/link";
import {SquareAsterisk} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ThemeToggle} from "@/components/theme-toggle";
import WalletButton from "@/components/wallet-button";

export default function Home() {
  return (
    <div>
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{animationDelay: "1s"}}
      ></div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SquareAsterisk className="h-8 w-8 text-primary"/>
            <h1 className="text-2xl font-bold text-foreground">HeroForge NFT</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle/>
            <WalletButton />
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 pb-2 text-balance"
          >
            Forge your Legendary Heroes
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Generate unique NFT hero cards with random classes and attributes. Pay 0.001 ETH and discover your next
            legendary champion!
          </p>

          <Link href="/generate">
            <Button
              size="lg"
              className="text-lg px-8 py-4 hover:scale-110 transition-all duration-300 glow relative overflow-hidden group"
            >
              <span className="relative z-10">Start Forging Heroes</span>
              <SquareAsterisk className="ml-2 h-5 w-5 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 mt-16 border-t relative z-10">
        <div className="text-center text-muted-foreground">
          <p>&copy; {(new Date()).getFullYear()} HeroForge NFT. Forge your own heroes.</p>
        </div>
      </footer>
    </div>
  );
}
