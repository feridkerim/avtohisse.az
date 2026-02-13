import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group-input";
import { Input } from "@/components/ui/input";
import { SearchIcon, Plus, User, Heart } from "lucide-react";
import Link from "next/link";
import { CatalogMenu } from "./CatalogMenu";

export default function Header() {
  return (
    <header className="w-full py-5 sticky top-0 bg-white z-50">
      <div className="container">
        <div className="flex items-center flex-wrap place-content-between gap-4">
          <Link href="/">
            <div className="logo font-semibold text-2xl">
              avtohisse<span className="text-[#e73121]">.az</span>
            </div>
          </Link>
          <CatalogMenu />
          <ButtonGroup>
            <Input
              placeholder="OEM kodu, VIN nömrəsi və ya detal adı ilə axtar"
              className="rounded-r-none focus-visible:ring-0"
            />
            <Button aria-label="Search" className="rounded-l-none">
              <SearchIcon />
            </Button>
          </ButtonGroup>
          <Link href="/favoriler">
            <Heart />
          </Link>
          <Button asChild>
            <Link href="/auth/login">
              <User />
              <span>Daxil ol</span>
            </Link>
          </Button>
          <Button
            className="bg-[#e73121] hover:bg-red-700 text-white transition-colors duration-300"
            asChild
          >
            <Link href="/ads/create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Elan yerləşdir</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
