export function Hero() {
  return (
    <section className="relative">
      <div className="grid grid-cols-3 grid-rows-2 gap-1 md:gap-2">
        {/* Top row */}
        <div className="aspect-[5/4] bg-gray-300 rounded-tl-2xl md:rounded-tl-3xl" />
        <div className="aspect-[5/4] bg-gray-200" />
        <div className="aspect-[5/4] bg-gray-300 rounded-tr-2xl md:rounded-tr-3xl" />
        {/* Bottom row */}
        <div className="aspect-[5/4] bg-gray-300 rounded-bl-2xl md:rounded-bl-3xl" />
        <div className="aspect-[5/4] bg-gray-200" />
        <div className="aspect-[5/4] bg-gray-300 rounded-br-2xl md:rounded-br-3xl" />
      </div>
    </section>
  )
}
