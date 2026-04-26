"use client"

import Image from "next/image"

export function RoomPlan() {
  return (
    <section id="room-plan" className="scroll-mt-32">
      <div className="relative py-16 md:py-24 min-h-[600px] md:min-h-[900px]">
        <Image
          src="/images/room-plan-bg.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          {/* content TBD */}
        </div>
      </div>
    </section>
  )
}
