const MINI_SLIDES = [
  {
    rotate: -8,
    translateX: -18,
    translateY: 10,
    accent: "bg-tag2-bg",
    bar: "bg-tag2-fg",
  },
  {
    rotate: 4,
    translateX: 14,
    translateY: -6,
    accent: "bg-tag4-bg",
    bar: "bg-tag4-fg",
  },
  {
    rotate: -2,
    translateX: 0,
    translateY: 0,
    accent: "bg-tag1-bg",
    bar: "bg-brand",
  },
];

function MiniSlide({
  rotate,
  translateX,
  translateY,
  accent,
  bar,
  z,
}: (typeof MINI_SLIDES)[number] & { z: number }) {
  return (
    <div
      className="absolute w-40 sm:w-48 aspect-video rounded-lg bg-surface shadow-lg border border-border p-2.5 flex flex-col gap-1.5"
      style={{
        transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
        zIndex: z,
      }}
    >
      <div className={`h-2 w-3/4 rounded-full ${bar}`} />
      <div className="flex gap-1.5 flex-1">
        <div className={`flex-1 rounded-md ${accent}`} />
        <div className="w-1/3 flex flex-col gap-1">
          <div className="flex-1 rounded-md bg-background" />
          <div className="flex-1 rounded-md bg-background" />
        </div>
      </div>
    </div>
  );
}

export function HeroIllustration() {
  return (
    <div className="relative w-full h-40 sm:h-48 flex items-center justify-center">
      <svg
        className="absolute -top-10 -right-6 w-56 h-56 opacity-70 pointer-events-none"
        viewBox="0 0 200 200"
      >
        <path
          fill="var(--accent-soft)"
          d="M45.3,-58.5C58.4,-49.8,68.4,-35.6,72.7,-19.7C77,-3.8,75.5,13.8,68.7,29.1C61.9,44.4,49.7,57.4,35.2,64.5C20.7,71.6,3.9,72.8,-12.6,70.4C-29.1,68,-45.3,62,-56.6,50.4C-67.9,38.8,-74.3,21.6,-75.6,3.7C-76.9,-14.2,-73.1,-32.8,-62.6,-46.3C-52.1,-59.8,-34.9,-68.2,-17.4,-71.8C0.1,-75.4,17.9,-74.2,45.3,-58.5Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg className="absolute -bottom-8 -left-4 w-40 h-40 opacity-60 pointer-events-none" viewBox="0 0 200 200">
        <path
          fill="var(--tag4-bg)"
          d="M39.9,-50.4C52.1,-42.8,62.4,-31.2,67.6,-16.9C72.8,-2.6,72.9,14.4,66.4,28.5C59.9,42.6,46.8,53.7,32.3,60.9C17.8,68.1,1.9,71.4,-14.5,69.5C-30.9,67.6,-47.8,60.5,-58.7,48C-69.6,35.5,-74.5,17.8,-73.9,0.4C-73.3,-16.9,-67.2,-33.8,-56.3,-41.7C-45.4,-49.6,-29.7,-48.5,-16.2,-53.9C-2.7,-59.3,8.6,-71.2,20.9,-70.8C33.2,-70.4,46.5,-57.7,39.9,-50.4Z"
          transform="translate(100 100)"
        />
      </svg>
      <div className="relative w-48 sm:w-56 h-full">
        {MINI_SLIDES.map((s, i) => (
          <MiniSlide key={i} {...s} z={i} />
        ))}
      </div>
    </div>
  );
}
