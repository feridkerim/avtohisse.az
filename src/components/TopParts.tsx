import Link from "next/link";
import Image from "next/image";
const TopPartsData = [
  {
    name: "Tyres & wheels",
    img: "/images/top-parts/tyres_wheels.png",
    href: "/wheels",
  },
  { name: "Brakes", img: "/images/top-parts/10106.png", href: "/brakes" },
  { name: "Damping", img: "/images/top-parts/10111.png", href: "/damping" },
  {
    name: "Suspension",
    img: "/images/top-parts/10113.png",
    href: "/suspension",
  },
  {
    name: "Filters",
    img: "/images/top-parts/10105.png",
    href: "/filters",
  },
  { name: "Engine", img: "/images/top-parts/10102.png", href: "/engine" },
  {
    name: "Oils and fluids",
    img: "/images/top-parts/10435.png",
    href: "/oils",
  },
  { name: "Clutch", img: "/images/top-parts/10150.png", href: "/clutch" },
];

export default function TopParts() {
  return (
    <div className="container pt-6 overflow-hidden">
      <h2 className="text-2xl font-semibold mb-6 font-sans">
        Məşhur kateqoriyalar
      </h2>
      <div className=" -mx-7.5 md:mx-0">
        <div className="md:grid px-7.5 md:px-0 flex overflow-x-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4">
          {TopPartsData.map((part, index) => (
            <Link
              key={index}
              href={part.href}
              className="group flex  min-w-[33.3%] flex-col items-center justify-center md:py-4 py-3 px-2 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:border-[#e73121] transition-all duration-300"
            >
              <div className="md:w-[75] md:h-[75] w-[45] h-[45]">
                <Image src={part.img} alt={part.name} width={75} height={75} />
              </div>

              <h3 className="md:text-[14px] text-[12px] font-semibold text-slate-800 text-center leading-tight font-sans mt-2 md:mt-4">
                {part.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
