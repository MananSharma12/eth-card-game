import Link from "next/link";
import {Shield} from "lucide-react";

export function RaritySystem() {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        Rarity System
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
        <div className="text-center p-4 rounded-lg bg-card/80 backdrop-blur-sm border hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-common/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-muted-foreground" />
          </div>
          <h4 className="font-semibold text-muted-foreground">Common</h4>
          <p className="text-sm text-muted-foreground">60-75%</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-card/80 backdrop-blur-sm border hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-uncommon/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-uncommon" />
          </div>
          <h4 className="font-semibold text-uncommon">Uncommon</h4>
          <p className="text-sm text-muted-foreground">15-25%</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-card/80 backdrop-blur-sm border hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-rare/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-rare" />
          </div>
          <h4 className="font-semibold text-rare">Rare</h4>
          <p className="text-sm text-muted-foreground">5-10%</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-card/80 backdrop-blur-sm border hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-epic/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-epic" />
          </div>
          <h4 className="font-semibold text-epic">Epic</h4>
          <p className="text-sm text-muted-foreground">1-3%</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-card/80 backdrop-blur-sm border hover:scale-105 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-legendary/20 flex items-center justify-center glow">
            <Shield className="h-6 w-6 text-legendary" />
          </div>
          <h4 className="font-semibold text-legendary">Legendary</h4>
          <p className="text-sm text-muted-foreground">0.1-1%</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <Link
          className="font-semibold underline uppercase"
          href="/rarity"
        >
          Learn more about rarity
        </Link>
      </div>
    </div>
  );
}