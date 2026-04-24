import Link from "next/link";

export default function RootNotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col items-center justify-center px-6 py-20 text-center text-[#1f3a40]">
      <p className="text-sm tracking-[0.18em] text-[#0f677d]">404</p>
      <h1 className="mt-2 font-serif text-4xl uppercase md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#1f3a40]/75">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-[#1f3a40]/20 px-6 py-3 text-sm uppercase tracking-[0.12em] transition hover:bg-[#1f3a40] hover:text-white"
      >
        Home
      </Link>
    </main>
  );
}
