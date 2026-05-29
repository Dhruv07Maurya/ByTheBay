"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBriefcase,
  IconUser,
  IconMail,
  IconSunrise,
} from "@tabler/icons-react";

const iconStyle = "h-full w-full";

const links = [
  {
    title: "Home",
    icon: <IconHome className={iconStyle} />,
    href: "/",
  },
  {
    title: "Works",
    icon: <IconBriefcase className={iconStyle} />,
    href: "/works",
  },
  {
    title: "Break",
    icon: <IconSunrise className={iconStyle} />,
    href: "#",
  },
  {
    title: "About",
    icon: <IconUser className={iconStyle} />,
    href: "/about",
  },
  {
    title: "Contact",
    icon: <IconMail className={iconStyle} />,
    href: "/contact",
  },
];

export default function SiteFloatingDock() {
  return <FloatingDock items={links} />;
}
