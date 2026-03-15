import React, { useState } from 'react';
import { VendorNavbar } from '@/components/VendorNavbar';
import { ProductCard } from '@/components/ProductCard';
import { VendorLoadingSpinner } from '@/components/VendorLoadingSpinner';
import { useProducts } from '@/hooks/useProducts';
import { Product, ProductStatus } from '@/types';

const Products: React.FC = () => {
  const [filter, setFilter] = useState<ProductStatus | undefined>(undefined);
  const { products, loading, error } = useProducts(filter);

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product);
    // TODO: Open edit modal
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Delete product:', productId);
      // TODO: Call delete API
    }
  };

  return (
    <>
      <VendorNavbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-2">Manage your product catalog</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blush-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
              + Add Product
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {[
              { label: 'All', value: undefined },
              { label: 'Active', value: 'ACTIVE' as ProductStatus },
              { label: 'Draft', value: 'DRAFT' as ProductStatus },
              { label: 'Inactive', value: 'INACTIVE' as ProductStatus },
              { label: 'Discontinued', value: 'DISCONTINUED' as ProductStatus },
            ].map((f) => (
              <button
                key={f.label}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  filter === f.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">{error}</div>}

          {loading ? (
            <VendorLoadingSpinner />
          ) : (
            <>
              {products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-600 text-lg">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
