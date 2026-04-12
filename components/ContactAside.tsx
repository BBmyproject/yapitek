function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.84.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

type Props = {
  companyName: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
};

export function ContactAside({
  companyName,
  address,
  phoneDisplay,
  phoneHref,
  email,
}: Props) {
  return (
    <div className="flex flex-col text-[#1f3a40]">
      <p className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-6xl">
        {companyName}
      </p>

      <div className="mt-10 flex gap-4">
        <LocationIcon className="mt-0.5 shrink-0 text-[#0f677d]" />
        <p className="text-sm leading-relaxed text-[#1f3a40]/88 md:text-base">
          {address}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <PhoneIcon className="shrink-0 text-[#0f677d]" />
        <a
          href={phoneHref}
          className="text-sm text-[#1f3a40] transition-colors hover:text-[#0f677d] md:text-base"
        >
          {phoneDisplay}
        </a>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <MailIcon className="shrink-0 text-[#0f677d]" />
        <a
          href={`mailto:${email}`}
          className="text-sm text-[#1f3a40] transition-colors hover:text-[#0f677d] md:text-base"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
