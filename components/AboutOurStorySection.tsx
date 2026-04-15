import { getTranslations } from "next-intl/server";

const WIDE_BANNER_SRC =
  "/images/evart-estates.jpeg";

const CARD_SRC = [
  "/images/evart-yalikavak.jpg",
  "/images/evart-estates-8.jpeg",
  "/images/evart-oran.jpg",
] as const;

export async function AboutOurStorySection() {
  const t = await getTranslations("AboutOurStory");

  return (
    <div className="w-full bg-[#f9f6f3] text-[#1f3a40]">
      <div className="relative aspect-[2/1] w-full overflow-hidden mt-15 lg:mt-0 my-5">
        <img
          src={WIDE_BANNER_SRC}
          alt={t("wideBannerAlt")}
          width={2160}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
        />
      </div>

      <section
        className="mx-auto w-full max-w-[1440px] px-6 pt-16 lg:px-10 lg:pt-24"
        aria-labelledby="our-story-title"
      >
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-[#0f677d]">
          {t("kicker")}
        </p>
        <h2
          id="our-story-title"
          className="mt-4 text-center font-serif text-3xl tracking-tight text-[#1f3a40] md:text-4xl lg:text-5xl"
        >
          {t("title")}
        </h2>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col">
              <div className={i === 1 ? "" : "pt-6 lg:pt-[100px]"}>
                <div className="aspect-[9/10] overflow-hidden bg-[#d1dfdf]/40">
                  <img
                    src={CARD_SRC[i]}
                    alt={t(`cardAlt.${i}`)}
                    width={720}
                    height={800}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <p className="mt-6 text-center text-sm font-medium leading-relaxed text-[#1f3a40] md:text-[0.9375rem]">
                {t(`cardText.${i}`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-center font-serif text-2xl font-medium tracking-wide text-[#1f3a40] md:text-3xl">
            {t("longHeading")}
          </h3>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-[#1f3a40] md:leading-relaxed">
            {([0, 1, 2, 3, 4, 5, 6] as const).map((i) => (
              <p className="mb-2" key={i}>{t(`longBody.${i}`)}</p>
            ))}
          </div>
        </div>
        <div
        className="mx-auto flex w-full max-w-[1440px] items-center gap-0 pt-10 lg:pt-25 pb-0 lg:pb-10"
        aria-hidden
      >
        <div className="h-px min-w-0 flex-1 bg-[#d1dfe0] dark:bg-[#d1dfe0]" />
          <div
            className="about-section-end-cap relative aspect-square h-[13px] w-[13px] shrink-0 rotate-45 overflow-hidden"
            data-border="true"
          />
        <div className="h-px min-w-0 flex-1 bg-[#d1dfe0] dark:bg-[#d1dfe0]" />
      </div>
      </section>
    </div>
  );
}
