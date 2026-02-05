import { ArrowLeft, Search, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface InventoryItem {
  id: string;
  partNumber: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
  location: string;
  manufacturer: string;
}

interface InventoryPageProps {
  onBack: () => void;
}

// Mock inventory data - replace with actual API call
const mockInventory: InventoryItem[] = [
  {
    id: '1',
    partNumber: 'OF-001',
    description: 'Premium Motor Oil Filter',
    category: 'Filters',
    quantity: 25,
    price: 12.99,
    location: 'A-1-3',
    manufacturer: 'ACDelco'
  },
  {
    id: '2',
    partNumber: 'BP-004',
    description: 'Front Brake Pads Set',
    category: 'Brakes',
    quantity: 8,
    price: 89.99,
    location: 'B-2-1',
    manufacturer: 'Wagner'
  },
  {
    id: '3',
    partNumber: 'SP-012',
    description: 'Spark Plug Set (4-pack)',
    category: 'Engine',
    quantity: 15,
    price: 24.99,
    location: 'C-1-2',
    manufacturer: 'NGK'
  },
  {
    id: '4',
    partNumber: 'AT-008',
    description: 'Transmission Fluid (1 Quart)',
    category: 'Fluids',
    quantity: 32,
    price: 8.49,
    location: 'D-3-1',
    manufacturer: 'Valvoline'
  },
  {
    id: '5',
    partNumber: 'TB-015',
    description: 'Timing Belt',
    category: 'Engine',
    quantity: 3,
    price: 45.99,
    location: 'C-2-4',
    manufacturer: 'Gates'
  },
  {
    id: '6',
    partNumber: 'WP-007',
    description: 'Water Pump Assembly',
    category: 'Cooling',
    quantity: 0,
    price: 125.99,
    location: 'E-1-1',
    manufacturer: 'Motorcraft'
  }
];

const categories = ['All', 'Filters', 'Brakes', 'Engine', 'Fluids', 'Cooling'];

const InventoryPage = ({ onBack }: InventoryPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setInventory(mockInventory);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { status: 'Out of Stock', color: 'text-red-600', icon: AlertCircle };
    if (quantity < 5) return { status: 'Low Stock', color: 'text-yellow-600', icon: AlertCircle };
    return { status: 'In Stock', color: 'text-green-600', icon: CheckCircle };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-4 animate-pulse text-blue-500" size={64} />
          <p className="text-xl text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-medium">Back to Home</span>
            </button>
            <div className="h-6 border-l-2 border-gray-300" />
            <h1 className="text-3xl font-bold text-gray-800">Parts Inventory</h1>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by part number, description, or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-lg text-gray-600">
            Showing {filteredInventory.length} of {inventory.length} parts
          </p>
        </div>

        {/* Inventory Grid */}
        {filteredInventory.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Parts Found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInventory.map((item) => {
              const stockInfo = getStockStatus(item.quantity);
              const StockIcon = stockInfo.icon;

              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {item.partNumber}
                      </h3>
                      <p className="text-sm text-gray-500">{item.manufacturer}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 font-medium">
                    {item.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-gray-800">{item.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-green-600">${item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className={`flex items-center space-x-2 ${stockInfo.color}`}>
                      <StockIcon size={20} />
                      <span className="font-medium">{stockInfo.status}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-800">
                      {item.quantity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-lg">
            Need help finding a specific part? Please ask our parts specialist for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
