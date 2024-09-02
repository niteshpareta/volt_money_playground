import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "ypeer yinline-flex yh-6 yw-11 yshrink-0 ycursor-pointer yitems-center yrounded-full yborder-2 yborder-transparent ytransition-colors focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-slate-950 focus-visible:yring-offset-2 focus-visible:yring-offset-white disabled:ycursor-not-allowed disabled:yopacity-50 data-[state=checked]:ybg-slate-900 data-[state=unchecked]:ybg-slate-200 dark:focus-visible:yring-slate-300 dark:focus-visible:yring-offset-slate-950 dark:data-[state=checked]:ybg-slate-50 dark:data-[state=unchecked]:ybg-slate-800",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "ypointer-events-none yblock yh-5 yw-5 yrounded-full ybg-white yshadow-lg yring-0 ytransition-transform data-[state=checked]:ytranslate-x-5 data-[state=unchecked]:ytranslate-x-0 dark:ybg-slate-950"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
