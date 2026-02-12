import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <ProductDetail key={id} />;
}