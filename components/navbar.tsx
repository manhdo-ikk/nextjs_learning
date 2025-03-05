"use client";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navGuestItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={pathName === item.href ? "text-blue-500" : ""}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
    </NextUINavbar>
  );
};
