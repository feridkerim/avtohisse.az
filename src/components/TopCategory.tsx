import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Truck, Motorbike, CarFront } from "lucide-react";
import Link from "next/link";

export default function TopCategory() {
  return (
    <section className="top-category hidden md:block">
      <div className="container">
        <div className="flex items-center flex-wrap mb-5 gap-2">
          <Button size="sm" className="text-xs" asChild>
            <Link
              href="/avtomobil-hisseleri"
              className="flex items-center gap-2"
            >
              <CarFront className="h-4 w-4" />
              <span>Avtomobil hissələri</span>
            </Link>
          </Button>
          <Button size="sm" className="text-xs" asChild>
            <Link
              href="/yuk-masini-hisseleri"
              className="flex items-center gap-2"
            >
              <Truck className="h-4 w-4" />
              <span>Yük maşını hissələri</span>
            </Link>
          </Button>
          <Button size="sm" className="text-xs" asChild>
            <Link
              href="/motosiklet-hisseleri"
              className="flex items-center gap-2"
            >
              <Motorbike className="h-4 w-4" />
              <span>Motosiklet hissələri</span>
            </Link>
          </Button>
          <Button size="sm" className="text-xs" asChild>
            <Link href="/tekerler" className="flex items-center gap-2">
              <Icon icon="solar:wheel-angle-bold" className="text-base" />
              <span>Təkərlər</span>
            </Link>
          </Button>
          <Button size="sm" className="text-xs" asChild>
            <Link href="/aletler" className="flex items-center gap-2">
              <Icon icon="ri:tools-fill" className="text-base" />
              <span>Alətlər</span>
            </Link>
          </Button>
          <Button size="sm" className="text-xs" asChild>
            <Link href="/aksesuarlar" className="flex items-center gap-2">
              <Icon icon="mdi:car-info" className="text-base" />
              <span>Avtomobil aksesuarları</span>
            </Link>
          </Button>
          <Button size="sm" className="text-xs" asChild>
            <Link href="/yaglar" className="flex items-center gap-2">
              <Icon icon="fa-solid:oil-can" className="text-base" />
              <span>Motor yağları</span>
            </Link>
          </Button>
          <Button size="sm" className="text-xs" asChild>
            <Link href="/filterler" className="flex items-center gap-2">
              <Icon icon="mdi:air-filter" className="text-base" />
              <span>Filterlər</span>
            </Link>
          </Button>
          <Button size="sm" className="text-xs" asChild>
            <Link href="/eylecler" className="flex items-center gap-2">
              <Icon icon="icon-park-outline:brake-pads" className="text-base" />
              <span>Əyləclər</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
