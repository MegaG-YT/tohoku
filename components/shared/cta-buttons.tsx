"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const serifFont = {
  fontFamily: '"游明朝", "Yu Mincho", "Hiragino Mincho Pro", serif',
}

type CtaButtonsProps = {
  className?: string
  reservationHref?: string
  brochureHref?: string
}

export function CtaButtons({
  className,
  reservationHref = "#",
  brochureHref = "#",
}: CtaButtonsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const prefersReduced = useReducedMotion()

  const entrance = (delay: number) =>
    prefersReduced
      ? { initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : { opacity: 0 }, transition: { duration: 0.3, delay } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8",
        className,
      )}
    >
      <motion.a
        {...entrance(0)}
        href={reservationHref}
        aria-label="来場予約"
        whileHover={prefersReduced ? undefined : { scale: 1.02 }}
        whileTap={prefersReduced ? undefined : { scale: 0.98 }}
        className={cn(
          "group relative flex items-center w-full max-w-[320px] md:w-[260px] h-14 md:h-[60px] rounded-full",
          "bg-gradient-to-br from-[#9cbda7] via-[#7ba4a1] to-[#5d8a8e]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_6px_rgba(0,0,0,0.18),0_6px_18px_rgba(0,0,0,0.25)]",
          "pl-2 pr-6 transition-[filter] duration-200 hover:brightness-110",
        )}
      >
        <span
          aria-hidden
          className="shrink-0 w-12 h-12 rounded-full bg-white/15 ring-1 ring-white/25"
        />
        <span
          className="flex-1 text-center text-white text-lg md:text-xl tracking-[0.18em]"
          style={serifFont}
        >
          来場予約
        </span>
      </motion.a>

      <motion.a
        {...entrance(0.08)}
        href={brochureHref}
        aria-label="資料請求"
        whileHover={prefersReduced ? undefined : { scale: 1.02 }}
        whileTap={prefersReduced ? undefined : { scale: 0.98 }}
        className={cn(
          "group relative flex items-center w-full max-w-[320px] md:w-[260px] h-14 md:h-[60px] rounded-full",
          "bg-gradient-to-r from-[#5a2a1a] via-[#8a5a2a] to-[#d4b46a]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_6px_rgba(0,0,0,0.25),0_6px_18px_rgba(0,0,0,0.28)]",
          "pl-2 pr-6 transition-[filter] duration-200 hover:brightness-110",
        )}
      >
        <span
          aria-hidden
          className="shrink-0 w-12 h-12 rounded-full bg-white/15 ring-1 ring-white/25"
        />
        <span
          className="flex-1 text-center text-white text-lg md:text-xl tracking-[0.18em]"
          style={serifFont}
        >
          資料請求
        </span>
      </motion.a>
    </div>
  )
}

type MobileCtaBarProps = {
  reservationHref?: string
  brochureHref?: string
  threshold?: number
}

export function MobileCtaBar({
  reservationHref = "#",
  brochureHref = "#",
  threshold = 320,
}: MobileCtaBarProps) {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-cta-bar"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 280, damping: 30 }
          }
          className={cn(
            "md:hidden fixed inset-x-0 bottom-0 z-50 pointer-events-none",
            "px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
          )}
        >
          <div className="flex items-center gap-3 pointer-events-auto">
            <a
              href={reservationHref}
              aria-label="来場予約"
              className={cn(
                "flex-1 flex items-center justify-center h-12 rounded-full",
                "bg-gradient-to-br from-[#9cbda7] via-[#7ba4a1] to-[#5d8a8e]",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_5px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.2)]",
                "active:brightness-110",
              )}
            >
              <span
                className="text-white text-base tracking-[0.16em]"
                style={serifFont}
              >
                来場予約
              </span>
            </a>
            <a
              href={brochureHref}
              aria-label="資料請求"
              className={cn(
                "flex-1 flex items-center justify-center h-12 rounded-full",
                "bg-gradient-to-r from-[#5a2a1a] via-[#8a5a2a] to-[#d4b46a]",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_5px_rgba(0,0,0,0.25),0_4px_12px_rgba(0,0,0,0.22)]",
                "active:brightness-110",
              )}
            >
              <span
                className="text-white text-base tracking-[0.16em]"
                style={serifFont}
              >
                資料請求
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
