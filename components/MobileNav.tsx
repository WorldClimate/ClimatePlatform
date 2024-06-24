"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden sticky top-2 z-20 left-[90vw] sm:left-[96vw]">
        <HamburgerMenuIcon className="text-primary  w-5 h-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="flex flex-col mt-5 px-3">
          {/* <DarkModeButton /> */}
        </SheetTitle>
        <Separator className="my-3" />
        <SheetDescription className="flex">
          <div className="flex flex-col gap-3 mt-1 text-base">
            <Link
              href={"/main/home"}
              className="font-semibold hover:text-primary"
            >
              Home
            </Link>
            <Link
              href={"/main/about"}
              className="font-semibold hover:text-primary"
            >
              About
            </Link>
            <div className="font-semibold hover:text-primary">
              <Link href="/main/locations">Locations</Link>
              <ul className="ml-5">
                <li>
                  <Link href="/main/locations/oxford">Oxford</Link>
                </li>
                <li>
                  <Link href="/main/locations/mumbai">Mumbai</Link>
                </li>
                <li>
                  <Link href="/main/locations/new-york">New York</Link>
                </li>
                <li>
                  <Link href="/main/locations/san-francisco">San Francisco</Link>
                </li>
              </ul>
            </div>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
