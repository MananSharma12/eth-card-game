import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Brain, Heart, Sword, Zap} from "lucide-react";

export function ShowcaseCards() {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        Hero Classes & Rarities
      </h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Mage Card */}
        <Card className="relative overflow-hidden hover:scale-105 transition-all duration-500 float group">
          <div className="absolute inset-0 bg-gradient-to-br from-rare/20 via-rare/10 to-rare/5 group-hover:from-rare/30 group-hover:via-rare/20 group-hover:to-rare/10 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-rare text-white shadow-lg">
                Rare
              </Badge>
              <Brain className="h-6 w-6 text-rare" />
            </div>
            <CardTitle className="text-xl">Arcane Mage</CardTitle>
            <CardDescription>Master of mystical arts</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="aspect-square bg-gradient-to-br from-rare/10 to-rare/30 rounded-lg mb-4 flex items-center justify-center group-hover:from-rare/20 group-hover:to-rare/40 transition-all duration-500">
              <Zap className="h-16 w-16 text-rare group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Strength:</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between">
                <span>Health:</span>
                <span className="font-semibold">70</span>
              </div>
              <div className="flex justify-between">
                <span>Dexterity:</span>
                <span className="font-semibold">60</span>
              </div>
              <div className="flex justify-between">
                <span>Intellect:</span>
                <span className="font-semibold">95</span>
              </div>
              <div className="flex justify-between">
                <span>Magic:</span>
                <span className="font-semibold">90</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Healer Card */}
        <Card
          className="relative overflow-hidden hover:scale-105 transition-all duration-500 float group"
          style={{ animationDelay: "1s" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-uncommon/20 via-uncommon/10 to-uncommon/5 group-hover:from-uncommon/30 group-hover:via-uncommon/20 group-hover:to-uncommon/10 transition-all duration-500"></div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            style={{ transitionDelay: "200ms" }}
          ></div>

          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-uncommon text-white shadow-lg">
                Uncommon
              </Badge>
              <Heart className="h-6 w-6 text-uncommon" />
            </div>
            <CardTitle className="text-xl">Divine Healer</CardTitle>
            <CardDescription>Blessed with healing powers</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="aspect-square bg-gradient-to-br from-uncommon/10 to-uncommon/30 rounded-lg mb-4 flex items-center justify-center group-hover:from-uncommon/20 group-hover:to-uncommon/40 transition-all duration-500">
              <Heart className="h-16 w-16 text-uncommon group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Strength:</span>
                <span className="font-semibold">35</span>
              </div>
              <div className="flex justify-between">
                <span>Health:</span>
                <span className="font-semibold">85</span>
              </div>
              <div className="flex justify-between">
                <span>Dexterity:</span>
                <span className="font-semibold">55</span>
              </div>
              <div className="flex justify-between">
                <span>Intellect:</span>
                <span className="font-semibold">80</span>
              </div>
              <div className="flex justify-between">
                <span>Magic:</span>
                <span className="font-semibold">75</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Barbarian Card */}
        <Card
          className="relative overflow-hidden hover:scale-105 transition-all duration-500 float group"
          style={{ animationDelay: "2s" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-legendary/20 via-legendary/10 to-legendary/5 group-hover:from-legendary/30 group-hover:via-legendary/20 group-hover:to-legendary/10 transition-all duration-500"></div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            style={{ transitionDelay: "400ms" }}
          ></div>
          <div className="legendary-particles"></div>

          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-legendary text-white shadow-lg legendary-glow">
                Legendary
              </Badge>
              <Sword className="h-6 w-6 text-legendary" />
            </div>
            <CardTitle className="text-xl">Berserker King</CardTitle>
            <CardDescription>Unstoppable warrior</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="aspect-square bg-gradient-to-br from-legendary/10 to-legendary/30 rounded-lg mb-4 flex items-center justify-center group-hover:from-legendary/20 group-hover:to-legendary/40 transition-all duration-500">
              <Sword className="h-16 w-16 text-legendary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Strength:</span>
                <span className="font-semibold">98</span>
              </div>
              <div className="flex justify-between">
                <span>Health:</span>
                <span className="font-semibold">95</span>
              </div>
              <div className="flex justify-between">
                <span>Dexterity:</span>
                <span className="font-semibold">75</span>
              </div>
              <div className="flex justify-between">
                <span>Intellect:</span>
                <span className="font-semibold">40</span>
              </div>
              <div className="flex justify-between">
                <span>Magic:</span>
                <span className="font-semibold">25</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}