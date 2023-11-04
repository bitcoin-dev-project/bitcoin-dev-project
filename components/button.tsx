import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = React.ComponentProps<typeof Link> & {
  children: JSX.Element | string;
};
export default function Button({ children, className, ...rest }: Props) {
  return (
    <Link
      {...rest}
      className={clsx(
        "flex items-center justify-center py-4 text-[20px] leading-[104%] bg-gradient-94 from-dark-orange to-bright-orange from-[-6.5%] to-[100%] rounded-md text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
