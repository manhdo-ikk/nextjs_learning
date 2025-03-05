export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navUserItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navGuestItems: [
    {
      label: "Login",
      href: "/auth/login",
    },
    {
      label: "Register",
      href: "/auth/register",
    },
    {
      label: "Tasks",
      href: "/tasks/hihi",
    },
  ],
};
