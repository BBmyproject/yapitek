import { Link } from "@/i18n/navigation";
import { PROJECT_COVERS, type ProjectSlug } from "@/lib/projects";
import { getTranslations } from "next-intl/server";

type Props = {
  locale: string;
  currentSlug: ProjectSlug;
};

const FIXED_OTHER_PROJECT_SLUGS = [
  "evart-yalikavak",
  "evart-mansion-yalikavak",
  "docs-vadi",
] as const satisfies readonly ProjectSlug[];

async function OtherProjectCard({
  locale,
  slug,
}: {
  locale: string;
  slug: ProjectSlug;
}) {
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return (
    <Link
      href={{ pathname: "/projects/[slug]", params: { slug } }}
      className="group relative block h-full overflow-hidden border border-[#d1dfe0] bg-[#d1dfdf]/50 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={PROJECT_COVERS[slug]}
          alt=""
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-1/2 opacity-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 42, 52, 0) 0%, rgba(0, 0, 0, 0.55) 55%, rgba(0, 0, 0, 0.9) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 z-[2] overflow-hidden p-5 pb-5 md:p-6 md:pb-6">
          <div className="flex min-w-0 flex-col items-stretch justify-end">
            <h3 className="font-serif text-xl font-medium tracking-tight text-white drop-shadow-sm md:text-2xl">
              {t(`cards.${slug}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/90 md:mt-3 md:text-[0.9375rem] md:leading-relaxed">
              {t(`cards.${slug}.excerpt`)}
            </p>
            <div
              className="mt-0 max-h-0 overflow-hidden opacity-0 transition-[max-height,margin-top,opacity] duration-300 ease-out motion-reduce:transition-none group-hover:mt-2.5 group-hover:max-h-14 group-hover:opacity-100 md:group-hover:mt-3 md:group-hover:max-h-16"
              aria-hidden
            >
              <span className="inline-block font-serif font-semibold uppercase text-white">
                {t("cardCta")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export async function ProjectDetailOtherProjects({
  locale,
  currentSlug: _currentSlug,
}: Props) {
  const t = await getTranslations({ locale, namespace: "ProjectDetail" });

  return (
    <section
      className="relative z-10 border-t border-[#d1dfe0] bg-[#f9f6f3] px-6 py-16 text-[#1f3a40] lg:px-10 lg:py-20"
      aria-labelledby="other-projects-heading"
    >
      <div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <h2
            id="other-projects-heading"
            className="font-serif text-2xl font-medium tracking-tight md:text-3xl"
          >
            {t("otherProjectsHeading")}
          </h2>
          <Link
            href="/projects"
            className="inline-flex w-fit shrink-0 cursor-pointer items-center justify-center border border-[#d1dfe0] bg-[#f9f6f3] px-5 py-2 text-lg font-medium text-[#1f3a40] transition-colors duration-300 ease-out hover:bg-white hover:shadow-md"
          >
            {t("allProjectsCta")}
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-10">
          {FIXED_OTHER_PROJECT_SLUGS.map((slug) => (
            <OtherProjectCard key={slug} locale={locale} slug={slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
