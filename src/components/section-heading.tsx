export function SectionHeading({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div data-reveal className="mb-10 flex items-end justify-between gap-6 md:mb-14">
      <h2 className="flex items-baseline gap-4 font-serif text-4xl tracking-tight md:text-5xl">
        <span className="font-sans text-sm font-medium tabular-nums text-accent">
          {index}
        </span>
        {title}
      </h2>
      {aside}
    </div>
  );
}
