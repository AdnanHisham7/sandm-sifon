import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Download,
  Eye,
  Star,
  Heart,
  Share2,
  ArrowRight,
} from "lucide-react";
import { api, getProductById, getProductsByBrand } from "../api";

interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  category: Category;
  images: string[];
  sketchImages: string[];
  description: string;
  specifications: string[];
  price?: number;
}

interface ProductDetailPageProps {
  productSlug: string;
  onNavigate: (page: string, productId?: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productSlug,
  onNavigate,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productSlug);
        setProduct(data);
        const related = await getProductsByBrand("sifon", {
          category: data.category._id,
        });
        setRelatedProducts(
          related.filter((p: any) => p._id !== data._id).slice(0, 3)
        );
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug]);

  if (loading)
    return <div className="text-white text-center py-20">Loading...</div>;

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => onNavigate("shop")}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const currentImages = product.images;

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => onNavigate("home")}
            className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
          >
            Home
          </button>
          <span className="text-gray-600 mx-2">/</span>
          <button
            onClick={() => onNavigate("shop")}
            className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
          >
            Shop
          </button>
          <span className="text-gray-600 mx-2">/</span>
          <button
            onClick={() => onNavigate("shop", product.category._id)}
            className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
          >
            {product.category.name}
          </button>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-pink-400">{product.name}</span>
        </div>
        <button
          onClick={() => onNavigate("shop")}
          className="flex items-center text-gray-400 hover:text-pink-400 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to All Products
        </button>
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="aspect-square bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl overflow-hidden relative group">
              <img
                src={api + currentImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        currentImageIndex === 0
                          ? currentImages.length - 1
                          : currentImageIndex - 1
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-pink-500/80 transition-all duration-300"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (currentImageIndex + 1) % currentImages.length
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-pink-500/80 transition-all duration-300"
                  >
                    <ArrowRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {currentImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? "bg-pink-400 w-6"
                            : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              <button className="absolute top-4 right-4 w-12 h-12 bg-black/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-pink-500/80 transition-all duration-300">
                <Eye size={20} />
              </button>
            </div>
            {currentImages.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? "border-pink-400"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={api + image}
                      alt={`${product.name} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium rounded-full">
                  {product.category.name}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-pink-400 transition-colors duration-300">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-pink-400 transition-colors duration-300">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
            </div>
            <div>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div>
              {product.specifications.length > 0 && (
                <h3 className="text-xl font-semibold text-white mb-4">
                  Technical Features
                </h3>
              )}
              <div className="grid md:grid-cols-2 gap-3">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    <span className="text-gray-300 text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            {product.sketchImages.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Design Sketches
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.sketchImages.map((image, index) => (
                    <img
                      key={index}
                      src={api + image}
                      alt={`Design sketch ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-4">
              <a
                href={`https://wa.me/9544449849?text=${encodeURIComponent(
                  `Hello, I’m interested in receiving a quote for the product: "${product.name}". Could you please share the pricing and any additional details?

Thank you.
@sifon`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block text-center py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105 transition-all duration-300"
              >
                Request Quote
              </a>
            </div>
            <div className="p-6 bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl">
              <h4 className="text-white font-semibold mb-4">
                Installation & Care
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Professional installation recommended</li>
                <li>• Standard mounting hardware included</li>
                <li>• Easy-clean ceramic coating</li>
                <li>• 5-year craftsmanship warranty</li>
              </ul>
            </div>
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-8">
              Similar{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="group cursor-pointer bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-500 hover:transform hover:scale-105"
                  onClick={() => onNavigate("product", relatedProduct._id)}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={api + relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {relatedProduct.price && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-pink-400 font-semibold rounded-full text-sm">
                        ${relatedProduct.price || "N/A"}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-pink-400 font-medium uppercase tracking-wider">
                      {relatedProduct.category.name}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 mb-3 group-hover:text-pink-400 transition-colors duration-300">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center text-pink-400 font-medium group-hover:text-purple-400 transition-colors duration-300">
                      <span className="mr-2">View Vibe</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
