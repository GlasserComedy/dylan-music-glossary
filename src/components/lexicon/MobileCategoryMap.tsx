import { Head3D } from "./Head3D";

type Props = {
  categories: string[];
  onSelect: (category: string) => void;
};

const positions = [
  { left: "50%", top: "6%", rotate: -1 },
  { left: "25%", top: "21%", rotate: 2 },
  { left: "75%", top: "21%", rotate: -2 },
  { left: "22%", top: "39%", rotate: -1 },
  { left: "78%", top: "39%", rotate: 2 },
  { left: "22%", top: "66%", rotate: 1 },
  { left: "78%", top: "66%", rotate: -2 },
  { left: "32%", top: "89%", rotate: -1 },
  { left: "68%", top: "89%", rotate: 2 },
] as const;

export function MobileCategoryMap({ categories, onSelect }: Props) {
  return (
    <div className="relative mx-auto h-full min-h-[540px] w-full max-w-[430px] overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vw] max-h-[220px] min-h-[180px] w-[50vw] max-w-[220px] min-w-[180px] -translate-x-1/2 -translate-y-1/2">
        <Head3D className="h-full w-full" />
      </div>

      {categories.map((category, index) => {
        const position = positions[index] ?? positions[positions.length - 1];
        return (
          <button
            key={category}
            type="button"
            data-term-label
            onClick={() => onSelect(category)}
            className="absolute z-10 max-w-[128px] -translate-x-1/2 -translate-y-1/2 bg-paper px-2.5 py-1.5 text-center font-typewriter text-[14px] leading-tight text-ink/75 shadow-sm outline outline-1 outline-ink/10 transition duration-150 active:scale-95 active:text-accent"
            style={{
              left: position.left,
              top: position.top,
              transform: `translate(-50%, -50%) rotate(${position.rotate}deg)`,
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}