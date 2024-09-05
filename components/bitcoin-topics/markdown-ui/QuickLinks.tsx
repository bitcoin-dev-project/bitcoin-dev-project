"use client"

import Link from "next/link"
import { useId, useState } from "react"
import clsx from "clsx"
import { ScriptIcon } from "@/public/images/topics-hero/script-icon"
import { WalletsIcon } from "@/public/images/topics-hero/wallets-icon"
import { TransactionIcon } from "@/public/images/topics-hero/transaction-icon"
import { KeysIcon } from "@/public/images/topics-hero/keys-icon"

export function QuickLinks({ children }: { children: React.ReactNode }) {
    return (
        <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {children}
        </div>
    )
}

export function QuickLink({
    title,
    description,
    href,
    icon
}: {
    title: string
    description: string
    href?: string
    icon: React.ComponentProps<typeof Icon>["icon"]
}) {
    return (
        <div className="group relative rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.gray.800)]" />
            <div className="relative overflow-hidden rounded-xl p-6">
                <Icon icon={icon} className="h-8 w-8" />
                <h2 className="mt-4 font-display text-base text-gray-900 dark:text-white">
                    {href ? ( // Render Link only if href is available
                        <Link href={href}>
                            <span className="absolute -inset-px rounded-xl" />
                            {title}
                        </Link>
                    ) : (
                        <span className="text-gray-500 cursor-default">
                            {title}
                        </span> // Non-clickable title
                    )}
                </h2>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    )
}

const icons = {
    scripts: ScriptIcon,
    keys: KeysIcon,
    wallets: WalletsIcon,
    transaction: TransactionIcon
}

const iconStyles = {
    orange: "[--icon-foreground:theme(colors.orange.900)] [--icon-background:theme(colors.white.500)]",
    amber: "[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]"
}

export function Icon({
    icon,
    color = "orange",
    className,
    ...props
}: {
    color?: keyof typeof iconStyles
    icon: keyof typeof icons
} & Omit<React.ComponentPropsWithoutRef<"svg">, "color">) {
    const id = useId()
    const IconComponent = icons[icon]

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            fill="none"
            className={clsx(className, iconStyles[color])}
            {...props}
        >
            <IconComponent id={id} color={color} />
        </svg>
    )
}

const gradients = {
    orange: [
        { stopColor: "#440f04" },
        { stopColor: "#f1760f", offset: ".527" },
        { stopColor: "#f7931a", offset: 1 }
    ],
    amber: [
        { stopColor: "#FDE68A", offset: ".08" },
        { stopColor: "#F59E0B", offset: ".837" }
    ]
}

export function Gradient({
    color = "orange",
    ...props
}: {
    color?: keyof typeof gradients
} & Omit<React.ComponentPropsWithoutRef<"radialGradient">, "color">) {
    return (
        <radialGradient
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            {...props}
        >
            {gradients[color].map((stop, stopIndex) => (
                <stop key={stopIndex} {...stop} />
            ))}
        </radialGradient>
    )
}

export function LightMode({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"g">) {
    return <g className={clsx("dark:hidden", className)} {...props} />
}

export function DarkMode({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"g">) {
    return <g className={clsx("hidden dark:inline", className)} {...props} />
}
