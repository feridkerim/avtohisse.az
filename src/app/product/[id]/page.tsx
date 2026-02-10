import { ADS_DATA } from "@/constants/ads";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";

interface PageProps {
  // params artıq Promise olaraq təyin edilməlidir
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ADS_DATA.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const product = ADS_DATA.find((p) => String(p.id) === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
