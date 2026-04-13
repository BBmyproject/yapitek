"use client";

import { useTranslations } from "next-intl";

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1536&h=1024&q=80",
  "https://images.unsplash.com/photo-1481026469463-66327c86e544?auto=format&fit=crop&w=1536&h=1024&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1536&h=1024&q=80",
  "https://framerusercontent.com/images/wLvb9zl34UgI60PBvNo6L3h1d8k.png?scale-down-to=512&width=1536&height=1024",
] as const;

const ROW_LAYOUT = ["image-left", "text-left", "image-left", "text-left"] as const;

export default function ProjectShowcase() {
  const t = useTranslations("ProjectShowcase");

  return (
    <section
      id="projeler"
      className="w-full pb-12 lg:pb-20 text-[#1f3a40]"
      aria-labelledby="project-showcase-heading"
    >
      <p className="px-4 text-center tracking-tight text-[#0f677d]">{t("description")}</p>
      <h2
        id="project-showcase-heading"
        className="px-4 pb-8 pt-8 text-center font-serif text-3xl tracking-tight text-[#1f3a40] md:text-6xl md:pb-16"
      >
        {t("title")}
      </h2>

      <div className="w-full">
        {ROW_LAYOUT.map((layout, index) => {
          const textFirst = layout === "text-left";
          return (
            <article
              key={index}
              className="sticky top-0 grid h-[800px] w-full grid-cols-1 md:grid-cols-2"
              style={{ zIndex: (index + 1) * 5 }}
            >
              <div className={textFirst ? "order-1" : "order-2 md:order-1"}>
                {textFirst ? (
                  <div className="flex h-full items-center justify-center text-center px-8 md:px-16 lg:px-24 bg-[#ecf2f2]">
                    <div className="max-w-[300px] space-y-4">
                      <h3 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                        {t(`items.${index}.heading`)}
                      </h3>
                      <p className="text-base leading-relaxed">
                        {t(`items.${index}.line1`)}
                      </p>
                      <p className="text-base leading-relaxed">
                        {t(`items.${index}.line2`)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={PROJECT_IMAGES[index]}
                    alt={t(`items.${index}.heading`)}
                    width={1536}
                    height={1024}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>

              <div className={textFirst ? "order-2" : "order-1 md:order-2"}>
                {textFirst ? (
                  <img
                    src={PROJECT_IMAGES[index]}
                    alt={t(`items.${index}.heading`)}
                    width={1536}
                    height={1024}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-center px-8 md:px-16 lg:px-24 bg-[#ecf2f2]">
                    <div className="max-w-[300px] space-y-4">
                      <h3 className="font-serif text-2xl font-medium tracking-tight md:text-3xl">
                        {t(`items.${index}.heading`)}
                      </h3>
                      <p className="text-base leading-relaxed">
                        {t(`items.${index}.line1`)}
                      </p>
                      <p className="text-base leading-relaxed">
                        {t(`items.${index}.line2`)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
