"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import Image from "next/image";

const locations: { title: string; href: string; }[] = [
  {
    title: "OXFORD",
    href: "/location/oxford"
  },
  {
    title: "MUMBAI",
    href: "/location/mumbai"

  },
  {
    title: "NEW YORK",
    href: "/location/new-york"

  },
  {
    title: "SAN FRANCISCO",
    href: "/location/san-francisco"
  },
  {
    title: "JAKARTA",
    href: "/location/jakarta"
  },
];

export function Navbar() {
  const pathName = usePathname();
  return (
    <div className="w-full hidden md:flex h-16 bg-[url('/images/overlay.png')]">
      <Image
        src={"/images/logo-transparent copy.png"}
        alt="logo"
        width={1024}
        height={1024}
        className="w-32 h-32 top-4 left-2"
      />
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={`font-semibold h-[96px] w-[97px] hover:translate-y-1 transition-all duration-500 ${
                  pathName === "/main/home"
                    ? "bg-primary hover:bg-primary"
                    : "bg-transparent hover:bg-[#C1CAC5]"
                } ${navigationMenuTriggerStyle()}`}
              >
                HOME
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                className={`font-semibold h-[96px] w-[97px] hover:translate-y-1 transition-all duration-500 ${
                  pathName === "/main/about"
                    ? "bg-primary hover:bg-primary"
                    : "bg-transparent hover:bg-[#C1CAC5]"
                } ${navigationMenuTriggerStyle()}`}
              >
                ABOUT
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`font-semibold h-[96px] w-[97px] hover:translate-y-1 transition-all duration-500 ${
                pathName.includes("/main/locations")
                  ? "bg-primary hover:bg-primary"
                  : "bg-transparent hover:bg-[#C1CAC5]"
              }`}
            >
              <NavigationMenuLink href="/locations">
                LOCATIONS
              </NavigationMenuLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {locations.map((location) => (
                  <ListItem
                    key={location.title}
                    title={location.title}
                    href={location.href}
                  >
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
