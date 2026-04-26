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
        <div className="relative z-10 mx-auto max-w-5xl px-4">
          <Image
            src="/images/room-plan-a.webp"
            alt="ROOM PLAN A - 間取り図"
            width={1321}
            height={1634}
            className="mx-auto h-auto w-full"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>
      </div>
    </section>
  )
}
