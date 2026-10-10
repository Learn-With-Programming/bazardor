import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getProduct } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return notFound();
  return <ProductDetailClient product={product} />;
}
