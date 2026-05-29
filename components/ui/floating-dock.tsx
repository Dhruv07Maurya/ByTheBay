"use client";
/**
 * FloatingDock – fixed to the bottom of the viewport on all screen sizes.
 * Desktop: full horizontal dock centred at the bottom.
 * Mobile:  expand button (bottom-right) that fans out icon list upward.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

// Site palette
const CREAM = "#e8e5de";
const BROWN = "#2b160a";
const BROWN_LIGHT = "#4a2510";
const MUTED = "#a89880";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      {/* Desktop – centred horizontal bar */}
      <FloatingDockDesktop items={items} className={desktopClassName} />
      {/* Mobile – bottom-right expandable button */}
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

/* ─── Mobile ─────────────────────────────────────────────────────────── */
const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn("fixed bottom-6 right-6 z-[100] block md:hidden", className)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="mobile-nav"
            className="absolute bottom-14 right-0 flex flex-col-reverse gap-2 items-end"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 12,
                  scale: 0.85,
                  transition: { delay: idx * 0.04 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.04, type: "spring", stiffness: 260, damping: 20 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
                  style={{ backgroundColor: BROWN, color: CREAM }}
                  title={item.title}
                >
                  <div className="h-5 w-5">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className="flex h-12 w-12 items-center justify-center rounded-full shadow-2xl"
        style={{ backgroundColor: BROWN, color: CREAM }}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'flex' }}
        >
          <IconLayoutNavbarCollapse className="h-5 w-5" />
        </motion.span>
      </motion.button>
    </div>
  );
};

/* ─── Desktop ────────────────────────────────────────────────────────── */
const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-end gap-3 rounded-2xl px-5 pb-3 shadow-2xl",
        className
      )}
      style={{
        backgroundColor: BROWN,
        border: `1px solid ${BROWN_LIGHT}`,
        height: '4.5rem',
      }}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

/* ─── Icon container with magnify effect ────────────────────────────── */
function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-140, 0, 140], [38, 72, 38]);
  const heightTransform = useTransform(distance, [-140, 0, 140], [38, 72, 38]);
  const widthTransformIcon = useTransform(distance, [-140, 0, 140], [18, 36, 18]);
  const heightTransformIcon = useTransform(distance, [-140, 0, 140], [18, 36, 18]);

  const springCfg = { mass: 0.1, stiffness: 160, damping: 13 };
  const width = useSpring(widthTransform, springCfg);
  const height = useSpring(heightTransform, springCfg);
  const widthIcon = useSpring(widthTransformIcon, springCfg);
  const heightIcon = useSpring(heightTransformIcon, springCfg);

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{
          width,
          height,
          backgroundColor: hovered ? CREAM : BROWN_LIGHT,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full transition-colors duration-150"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              className="absolute -top-9 left-1/2 w-fit rounded-md px-2 py-0.5 text-[0.65rem] font-outfit font-medium whitespace-pre uppercase tracking-wider"
              style={{
                backgroundColor: CREAM,
                color: BROWN,
                border: `1px solid ${BROWN_LIGHT}`,
              }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          <span style={{ color: hovered ? BROWN : MUTED, display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}
