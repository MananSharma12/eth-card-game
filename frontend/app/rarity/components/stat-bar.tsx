import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress";

export const StatBar = ({label, value, max, delay}: { label: string; value: number; max: number; delay: number }) => {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {value}/{max}
        </span>
      </div>
      <Progress value={(animatedValue / max) * 100} className="h-2"/>
    </div>
  )
}