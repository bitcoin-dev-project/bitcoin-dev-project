import Link from "next/link"
import clsx from "clsx"

const baseStyles = {
    solid: "group inline-flex items-center justify-center rounded-full py-3 px-5 text-md font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
    outline:
        "group inline-flex ring-1 items-center justify-center rounded-full py-3 px-5 text-md focus:outline-none"
}

const variantStyles = {
    solid: {
        gray: "bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-900",
        orange: "bg-orange-500 text-white hover:text-gray-100 hover:bg-orange-500 active:bg-orange-800 active:text-orange-100 focus-visible:outline-orange-500",
        white: "bg-white text-gray-900 hover:bg-orange-50 active:bg-orange-200 active:text-gray-600 focus-visible:outline-white"
    },
    outline: {
        gray: "ring-gray-200 text-gray-700 hover:text-gray-900 hover:ring-gray-300 active:bg-gray-100 active:text-gray-600 focus-visible:outline-orange-500 focus-visible:ring-gray-300",
        orange: "bg-orange-500 text-white hover:text-gray-100 hover:bg-orange-500 active:bg-orange-800 active:text-orange-100 focus-visible:outline-orange-500",
        white: "ring-gray-700 text-white hover:ring-gray-500 active:ring-gray-700 active:text-gray-400 focus-visible:outline-white"
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
