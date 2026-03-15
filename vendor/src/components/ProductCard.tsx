import React from 'react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const statusColors = {
    ACTIVE: 'bg-green-100 text-green-800',
    DRAFT: 'bg-gray-100 text-gray-800',
    INACTIVE: 'bg-yellow-100 text-yellow-800',
    DISCONTINUED: 'bg-red-100 text-red-800',
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100">
      {/* Image */}
      <div className="relative h-40 bg-gray-200 overflow-hidden">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[product.status]}`}>
          {product.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mt-1">{product.description}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
        </div>

        {/* Stock */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Stock: <span className={product.stock > 10 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{product.stock}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="flex-1 px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 font-medium transition text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product.id)}
              className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
