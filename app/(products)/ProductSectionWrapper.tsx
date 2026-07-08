"use client";

import { useState } from "react";
import ProductShowcase from "./ProductShowcase";
import ProductDeepDive from "./ProductDeepDive";

interface Product {
  tabName: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  demoText: string;
  videoPlaceholder: string | null;
  deepDive?: any;
}

interface WrapperProps {
  showcase: {
    label: string;
    description: string;
    products: Product[];
  };
}

export default function ProductSectionWrapper({ showcase }: WrapperProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!showcase || !showcase.products || showcase.products.length === 0) {
    return null;
  }

  const activeProduct = showcase.products[activeIndex];

  return (
    <>
      <ProductShowcase 
        showcase={showcase} 
        activeIndex={activeIndex} 
        onTabChange={setActiveIndex} 
      />
      {activeProduct.deepDive && (
        <ProductDeepDive data={activeProduct.deepDive} />
      )}
    </>
  );
}
