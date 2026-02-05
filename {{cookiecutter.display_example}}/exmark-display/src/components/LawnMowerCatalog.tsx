import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Fuel,
  Zap,
  Battery,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { LawnMower } from "../data/lawnMowers";
import { getMowersByUsageAndSize, getAllMowers } from "../data/lawnMowers";

interface LawnMowerCatalogProps {
  onBack: () => void;
  usage?: string;
  landSize?: string;
}

const LawnMowerCatalog = ({
  onBack,
  usage,
  landSize,
}: LawnMowerCatalogProps) => {
  const [mowers, setMowers] = useState<LawnMower[]>([]);
  const [filteredMowers, setFilteredMowers] = useState<LawnMower[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedFuel, setSelectedFuel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "name">(
    "price-low",
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      let results: LawnMower[];

      if (usage && landSize) {
        // Convert landSize to match our data format
        const sizeMapping: { [key: string]: string } = {
          "Under an acre": "under-acre",
          "1 acre": "1-acre",
          "2 acres": "2-acres",
          "More than 2 acres": "more-than-2-acres",
        };

        const usageMapping: { [key: string]: string } = {
          Residential: "residential",
          Commercial: "commercial",
        };

        const mappedUsage = usageMapping[usage] || usage.toLowerCase();
        const mappedSize = sizeMapping[landSize] || landSize;

        results = getMowersByUsageAndSize(mappedUsage, mappedSize);
      } else {
        results = getAllMowers();
      }

      setMowers(results);
      setFilteredMowers(results);
      setLoading(false);
    }, 800);
  }, [usage, landSize]);

  useEffect(() => {
    let filtered = [...mowers];

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((mower) => mower.type === selectedType);
    }

    // Filter by fuel type
    if (selectedFuel !== "all") {
      filtered = filtered.filter((mower) => mower.fuelType === selectedFuel);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredMowers(filtered);
  }, [mowers, selectedType, selectedFuel, sortBy]);

  const getFuelIcon = (fuelType: string) => {
    switch (fuelType) {
      case "gas":
        return <Fuel className="text-orange-500" size={20} />;
      case "electric":
        return <Zap className="text-blue-500" size={20} />;
      case "battery":
        return <Battery className="text-green-500" size={20} />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "push":
        return "bg-blue-100 text-blue-800";
      case "self-propelled":
        return "bg-green-100 text-green-800";
      case "riding":
        return "bg-purple-100 text-purple-800";
      case "zero-turn":
        return "bg-red-100 text-red-800";
      case "commercial":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading lawn mowers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-medium">Back to Home</span>
            </button>
            <div className="h-6 border-l-2 border-gray-300" />
            <h1 className="text-3xl font-bold text-gray-800">
              Lawn Mower Catalog
            </h1>
          </div>
        </div>

        {/* Recommendation Banner */}
        {usage && landSize && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Recommended for You
            </h2>
            <p className="text-gray-600">
              Based on your selections: <strong>{usage}</strong> use for{" "}
              <strong>{landSize.toLowerCase()}</strong> of land
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mower Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="push">Push Mower</option>
                <option value="self-propelled">Self-Propelled</option>
                <option value="riding">Riding Mower</option>
                <option value="zero-turn">Zero-Turn</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* Fuel Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power Source
              </label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Power Sources</option>
                <option value="gas">Gas</option>
                <option value="electric">Electric</option>
                <option value="battery">Battery</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-gray-600">
                <span className="text-sm">Showing</span>
                <div className="text-2xl font-bold text-green-600">
                  {filteredMowers.length}
                </div>
                <span className="text-sm">mowers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mower Grid */}
        {filteredMowers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🚜</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No Mowers Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters to see more options.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMowers.map((mower) => (
              <div
                key={mower.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <div className="text-6xl text-green-600">🚜</div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {mower.name}
                      </h3>
                      <p className="text-gray-600">
                        {mower.brand} {mower.model}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getFuelIcon(mower.fuelType)}
                      {mower.inStock ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <XCircle className="text-red-500" size={20} />
                      )}
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeColor(mower.type)}`}
                    >
                      {mower.type.replace("-", " ")}
                    </span>
                  </div>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Cutting Width:</span>
                      <div className="font-semibold">{mower.cuttingWidth}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Engine:</span>
                      <div className="font-semibold">{mower.engineSize}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {mower.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {mower.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {mower.features.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{mower.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price and Stock */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      {mower.originalPrice &&
                        mower.originalPrice > mower.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ${mower.originalPrice.toFixed(2)}
                          </div>
                        )}
                      <div className="text-2xl font-bold text-green-600">
                        ${mower.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${mower.inStock ? "text-green-600" : "text-red-600"}`}
                      >
                        {mower.inStock ? "In Stock" : "Out of Stock"}
                      </div>
                      {mower.inStock && (
                        <div className="text-xs text-gray-500">
                          {mower.stockCount} available
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full mt-4 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                      mower.inStock
                        ? "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!mower.inStock}
                  >
                    {mower.inStock ? "View Details" : "Notify When Available"}
                  </button>
                </div>

                {/* Sale Badge */}
                {mower.originalPrice && mower.originalPrice > mower.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    SALE
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-lg mb-2">Need help choosing the right mower?</p>
          <p className="text-sm">
            Our lawn care specialists are available to help you find the perfect
            mower for your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LawnMowerCatalog;
