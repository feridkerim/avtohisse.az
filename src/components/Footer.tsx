import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-12 pb-5">
      <div className="container">
        <div className="flex items-center place-content-between gap-4">
          <div className="logo font-semibold text-2xl">
            avtohisse<span className="text-red-600 ">.az</span>
          </div>
          <div className="flex items-center place-content-between gap-4">
            <Link
              href="(012)-455-15-16"
              className="font-semibold hover:text-[#e73121] transition-colors duration-300"
            >
              (012)-455-15-16
            </Link>
            <ul className="flex gap-2">
              <li>
                <Link href="/instagram" className="group">
                  <Icon
                    icon="mdi:instagram"
                    width="24"
                    height="24"
                    className="transition-colors duration-300 group-hover:text-[#e73121]"
                  />
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="group">
                  <Icon
                    icon="mdi:facebook"
                    width="24"
                    height="24"
                    className="transition-colors duration-300 group-hover:text-[#e73121]"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" items-center flex-wrap mt-5 gap-2">
          <ul className="flex gap-5 font-medium text-sm flex-wrap">
            <li>
              <Link
                href="/instagram"
                className="transition-colors duration-300 hover:text-[#e73121]"
              >
                Yardim
              </Link>
            </li>
            <li>
              <Link
                href="/facebook"
                className="transition-colors duration-300 hover:text-[#e73121]"
              >
                Qaydalar
              </Link>
            </li>
            <li>
              <Link
                href="/facebook"
                className="transition-colors duration-300 hover:text-[#e73121]"
              >
                Layihə haqqında
              </Link>
            </li>
            <li>
              <Link
                href="/facebook"
                className="transition-colors duration-300 hover:text-[#e73121]"
              >
                İstifadəçi razılaşması
              </Link>
            </li>
            <li>
              <Link
                href="/facebook"
                className="transition-colors duration-300 hover:text-[#e73121]"
              >
                Məxfilik siyasəti
              </Link>
            </li>
            <li>
              <Link
                href="/facebook"
                className="transition-colors duration-300 hover:text-[#e73121]"
              >
                Ümumi oferta müqaviləsi
              </Link>
            </li>
          </ul>
          <p className="font-medium text-sm mt-5">
            © 2026 — Avtomobil ehtiyat hissələri bazarı.
          </p>
        </div>
      </div>
    </footer>
  );
}
