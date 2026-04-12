/** HomeLastProjects ile aynı orta kare + çizgi şeridi */
export function ContactEndCap() {
  return (
    <div
      className="mx-auto flex w-full max-w-[1440px] items-center gap-0 px-6 pb-15 lg:pb-25 pt-6 lg:px-10"
      aria-hidden
    >
      <div className="h-px min-w-0 flex-1 bg-[#d1dfe0]" />
      <div
        className="about-section-end-cap relative aspect-square h-[13px] w-[13px] shrink-0 rotate-45 overflow-hidden"
        data-border="true"
      />
      <div className="h-px min-w-0 flex-1 bg-[#d1dfe0]" />
    </div>
  );
}
