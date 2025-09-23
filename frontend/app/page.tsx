import {RaritySystem} from "@/components/rarity-system";
import {ShowcaseCards} from "@/components/showcase-cards";
import {Header} from "@/components/header";
import {HomepageHero} from "@/components/homepage-hero";

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

      <Header/>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <HomepageHero/>
        <ShowcaseCards/>
        <RaritySystem/>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 border-t relative z-10">
        <div className="text-center text-muted-foreground my-4">
          <p>&copy; {(new Date()).getFullYear()} HeroForge NFT. Forge your own heroes.</p>
        </div>
      </footer>
    </div>
  );
}
