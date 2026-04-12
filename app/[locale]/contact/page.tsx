import { ContactAside } from "@/components/ContactAside";
import { ContactEndCap } from "@/components/ContactEndCap";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_MAP_EMBED_SRC } from "@/lib/contact-map";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");

  return (
    <main
      id="content"
      className="relative z-10 flex-1 bg-[#f9f6f3] text-[#1f3a40]"
    >
      <div className="mx-auto text-center max-w-[1400px] px-6 pb-10 lg:pb-20 pt-35 lg:px-10 lg:pt-45">
        <p className="text-sm font-normal tracking-wide text-[#0f677d] md:text-base">
          {t("kicker")}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium uppercase leading-[1.05] tracking-[0.06em] text-[#1f3a40] md:text-5xl md:leading-[1.05] lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-base max-w-2xl mx-auto font-normal leading-relaxed text-[#1f3a40]/78 md:text-lg md:leading-relaxed">
          {t("lead")}
        </p>
      </div>

      <ContactEndCap />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 pb-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pb-20">
        <ContactAside
          companyName={t("companyName")}
          address={t("address")}
          phoneDisplay={t("phoneDisplay")}
          phoneHref={t("phoneHref")}
          email={t("email")}
        />
        <ContactForm />
      </div>

      <section
        className="w-full border-t border-[#d1dfe0]/80 bg-[#ecf2f2]/30"
        aria-label={t("mapSectionLabel")}
      >
        <iframe
          title={t("mapIframeTitle")}
          src={CONTACT_MAP_EMBED_SRC}
          width={600}
          height={450}
          className="h-[min(50vh,450px)] w-full border-0 md:h-[450px]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
