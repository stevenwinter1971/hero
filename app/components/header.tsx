import Link from 'next/link'

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <Link href="/survey/step1" className="text-[#e35d23] text-2xl font-bold inline-block">HERO</Link>
      </div>
    </header>
  )
}

