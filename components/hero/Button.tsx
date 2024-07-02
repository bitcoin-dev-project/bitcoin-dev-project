import Link from "next/link"
import clsx from "clsx"

const baseStyles = {
    solid: "group inline-flex items-center justify-center rounded-full py-3 px-5 text-md font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
    outline:
        "group inline-flex ring-1 items-center justify-center rounded-full py-3 px-5 text-md focus:outline-none"
}

const variantStyles = {
    solid: {
        slate: "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
        orange: "bg-orange-600 text-white hover:text-slate-100 hover:bg-orange-500 active:bg-orange-800 active:text-orange-100 focus-visible:outline-orange-600",
        white: "bg-white text-slate-900 hover:bg-orange-50 active:bg-orange-200 active:text-slate-600 focus-visible:outline-white"
    },
    outline: {
        slate: "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-orange-600 focus-visible:ring-slate-300",
        orange: "bg-orange-600 text-white hover:text-slate-100 hover:bg-orange-500 active:bg-orange-800 active:text-orange-100 focus-visible:outline-orange-600",
        white: "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white"
    }
}

type ButtonProps = (
    | {
          variant?: "solid"
          color?: keyof typeof variantStyles.solid
      }
    | {
          variant: "outline"
          color?: keyof typeof variantStyles.outline
      }
) &
    (
        | Omit<React.ComponentPropsWithoutRef<typeof Link>, "color">
        | (Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
              href?: undefined
          })
    )

export function Button({ className, ...props }: ButtonProps) {
    props.variant ??= "solid"
    props.color ??= "orange"

    className = clsx(
        baseStyles[props.variant],
        props.variant === "outline"
            ? variantStyles.outline[props.color]
            : props.variant === "solid"
              ? variantStyles.solid[props.color]
              : undefined,
        className
    )

    return typeof props.href === "undefined" ? (
        <button className={className} {...props} />
    ) : (
        <Link className={className} {...props} />
    )
}
