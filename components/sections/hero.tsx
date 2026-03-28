export function Hero() {
  return (
    <section className="relative px-4 md:px-8 pt-4 md:pt-6">
      <div className="mx-auto grid grid-cols-3 grid-rows-2 gap-3 md:gap-5">
        {/* Top row */}
        <div className="aspect-[3/2] bg-gray-300 rounded-tl-2xl md:rounded-tl-3xl" />
        <div className="aspect-[3/2] bg-gray-200" />
        <div className="aspect-[3/2] bg-gray-300 rounded-tr-2xl md:rounded-tr-3xl" />
        {/* Bottom row */}
        <div className="aspect-[3/2] bg-gray-300 rounded-bl-2xl md:rounded-bl-3xl" />
        <div className="aspect-[3/2] bg-gray-200" />
        <div className="aspect-[3/2] bg-gray-300 rounded-br-2xl md:rounded-br-3xl" />
      </div>
    </section>
  )
}
