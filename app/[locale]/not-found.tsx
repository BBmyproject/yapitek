import { Link } from "@/i18n/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

type Props = {
  params?: Promise<{ locale: string }>;
};

export default async function LocaleNotFound({ params }: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;
  const currentLocale = hasLocale(routing.locales, locale) ? locale : "tr";

  return (
    <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-6 py-20 text-center text-[#1f3a40]">
      <p className="text-sm tracking-[0.18em] text-[#0f677d]">404</p>
      <h1 className="mt-2 font-serif text-4xl uppercase md:text-5xl">
        {currentLocale === "tr" ? "Sayfa bulunamadı" : "Page not found"}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#1f3a40]/75">
        {currentLocale === "tr"
          ? "Aradığınız sayfa taşınmış, silinmiş veya yanlış yazılmış olabilir."
          : "The page you are looking for may have been moved, deleted, or typed incorrectly."}
      </p>
      <Link
        href="/"
        locale={currentLocale}
        className="mt-8 inline-flex items-center justify-center rounded-full border border-[#1f3a40]/20 px-6 py-3 text-sm uppercase tracking-[0.12em] transition hover:bg-[#1f3a40] hover:text-white"
      >
        {currentLocale === "tr" ? "Anasayfa" : "Home"}
      </Link>
    </main>
  );
}
