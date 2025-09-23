import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Sparkles} from "lucide-react";

export function HomepageHero() {
  return (
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
          <Sparkles className="ml-2 h-5 w-5 relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Button>
      </Link>
    </div>
  );
}
