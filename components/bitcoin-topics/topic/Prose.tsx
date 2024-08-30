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
                "dark:prose-a:text-orange-500",
                // link underline
                "prose-a:no-underline prose-a:text-black dark:prose-a:text-white prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.orange.500))] dark:hover:prose-a:[--tw-prose-underline-size:3px]",
                // inline code
                "prose-code:break-words prose-code:rounded-md prose-code:border prose-code:border-gray-200 prose-code:bg-[#f7f6f3] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-gray-900 prose-code:before:content-[''] prose-code:after:content-['']",
                "dark:prose-code:border-gray-800 dark:prose-code:bg-gray-900 dark:prose-code:text-gray-100 dark:prose-code:brightness-125",
                // unordered list
                "prose-ul:pl-0",
                "[&_ul]:list-none",
                "[&_ul>li]:relative [&_ul>li]:pl-8",
                "[&_ul>li]:before:content-['→'] [&_ul>li]:before:absolute [&_ul>li]:before:left-2 [&_ul>li]:before:top-1/2 [&_ul>li]:before:transform [&_ul>li]:before:-translate-y-1/2 [&_ul>li]:before:text-orange-500 [&_ul>li]:before:font-bold",
                // ordered list
                "[&_ol>li]:marker:text-orange-500"
            )}
            {...props}
        />
    )
}
