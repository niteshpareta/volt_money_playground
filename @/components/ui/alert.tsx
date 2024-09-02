import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "yrelative yw-full yrounded-lg yborder yborder-slate-200 yp-4 [&>svg~*]:ypl-7 [&>svg+div]:ytranslate-y-[-3px] [&>svg]:yabsolute [&>svg]:yleft-4 [&>svg]:ytop-4 [&>svg]:ytext-slate-950 dark:yborder-slate-800 dark:[&>svg]:ytext-slate-50",
  {
    variants: {
      variant: {
        default: "ybg-white ytext-slate-950 dark:ybg-slate-950 dark:ytext-slate-50",
        destructive:
          "yborder-red-500/50 ytext-red-500 dark:yborder-red-500 [&>svg]:ytext-red-500 dark:yborder-red-900/50 dark:ytext-red-900 dark:dark:yborder-red-900 dark:[&>svg]:ytext-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("ymb-1 yfont-medium yleading-none ytracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ytext-sm [&_p]:yleading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
