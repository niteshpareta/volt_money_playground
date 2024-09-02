import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("ygrid ygap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "yaspect-square yh-4 yw-4 yrounded-full yborder yborder-slate-200 yborder-slate-900 ytext-slate-900 yring-offset-white focus:youtline-none focus-visible:yring-2 focus-visible:yring-slate-950 focus-visible:yring-offset-2 disabled:ycursor-not-allowed disabled:yopacity-50 dark:yborder-slate-800 dark:yborder-slate-50 dark:ytext-slate-50 dark:yring-offset-slate-950 dark:focus-visible:yring-slate-300",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="yflex yitems-center yjustify-center">
        <Circle className="yh-2.5 yw-2.5 yfill-current ytext-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
