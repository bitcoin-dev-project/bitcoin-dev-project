import clsx from "clsx"

export function Prose<T extends React.ElementType = "div">({
    as,
    className,
    ...props
}: React.ComponentPropsWithoutRef<T> & {
    as?: T
}) {
    let Component = as ?? "div"

    return (
        <Component
            className={clsx(
                className,
                "prose max-w-3xl mx-auto dark:prose-invert text-lg",
                // links
                "dark:prose-a:text-orange-300",
                // link underline
                "prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-0.5*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.orange.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.gray.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.orange.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]"
                // pre
            )}
            {...props}
        />
    )
}
