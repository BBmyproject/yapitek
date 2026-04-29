import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Bricolage_Grotesque, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  buildPageMetadata,
  getDefaultDescription,
  getHomeTitle,
  getLocalizedPath,
  getSiteName,
  getSiteUrl,
  type AppLocale,
} from "@/lib/seo";

const GOOGLE_SITE_VERIFICATION = "N0V6WeJklW740Suw7PdjjPtdmhAp8ja6U41x-5NM2ts";
const GOOGLE_ANALYTICS_ID = "G-Q248YCGQC0";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-bricolage",
  weight: "variable",
  axes: ["opsz", "wdth"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-playfair",
  weight: "variable",
  style: ["normal", "italic"],
});

type MetadataProps = {
  params?: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const resolvedParams = await params;
  if (!resolvedParams) {
    return {};
  }
  const { locale } = resolvedParams;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const currentLocale = locale as AppLocale;

  return {
    metadataBase: new URL(getSiteUrl()),
    ...buildPageMetadata({
      locale: currentLocale,
      title: getHomeTitle(currentLocale),
      description: getDefaultDescription(currentLocale),
      path: getLocalizedPath(currentLocale, "/"),
    }),
    alternates: {
      canonical: getLocalizedPath(currentLocale, "/"),
      languages: {
        tr: getLocalizedPath("tr", "/"),
        en: getLocalizedPath("en", "/"),
        "x-default": getLocalizedPath("tr", "/"),
      },
    },
    openGraph: {
      ...buildPageMetadata({
        locale: currentLocale,
        title: getHomeTitle(currentLocale),
        description: getDefaultDescription(currentLocale),
        path: getLocalizedPath(currentLocale, "/"),
      }).openGraph,
      siteName: getSiteName(currentLocale),
    },
    applicationName: getSiteName(currentLocale),
    category: currentLocale === "tr" ? "inşaat" : "construction",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params?: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams) {
    notFound();
  }
  const { locale } = resolvedParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bricolageGrotesque.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
