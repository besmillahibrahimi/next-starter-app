import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

// @ts-ignore
interface IProps extends React.ComponentPropsWithoutRef<"a"> {
  title?: React.ReactNode;
}
const ListItem = React.forwardRef<React.ElementRef<"a">, IProps>(
  ({ title, children, href, className, ...props }, ref) => {
    const body = (
      <>
        {title ? (
          typeof title === "string" ? (
            <div className="text-sm font-medium leading-none">{title}</div>
          ) : (
            title
          )
        ) : null}
        {children ? (
          typeof children === "string" ? (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          ) : (
            children
          )
        ) : null}
      </>
    );
    return (
      <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
        {href ? (
          <Link ref={ref} {...props} href={href} className={cn(className)}>
            {body}
          </Link>
        ) : (
          body
        )}
      </li>
    );
  }
);

export default ListItem;
