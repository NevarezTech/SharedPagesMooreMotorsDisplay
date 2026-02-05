import { FC, ElementType, createElement } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Shield,
  Calendar,
  User,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  Clock,
} from "lucide-react";
import type {
  WarrantyInfo,
  WarrantyLookupPageProps,
  SearchType,
} from "../types/warranty";
import {
  lookupWarrantyByTransaction,
  lookupWarrantyBySerialNumber,
} from "../api/warranty";

const WarrantyLookupPage = ({
  onBack,
  brandConfig,
}: WarrantyLookupPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("transaction");
  const [searchResults, setSearchResults] = useState<WarrantyInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      if (searchType === "transaction") {
        const response = await lookupWarrantyByTransaction(searchTerm.trim());
        setSearchResults([response.data]);
      } else if (searchType === "serial") {
        const response = await lookupWarrantyBySerialNumber(searchTerm.trim());
        if (response.success && response.warranty) {
          setSearchResults([response.warranty]);
        } else {
          setSearchResults([]);
        }
      }
    } catch (err) {
      console.error("Warranty lookup error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to lookup warranty",
      );
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (
    isActive: boolean,
    daysRemaining?: number,
  ): {
    icon: ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
    text: string;
  } => {
    if (isActive && daysRemaining && daysRemaining <= 30) {
      return {
        icon: AlertTriangle,
        color: "text-yellow-700",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        text: "Expiring Soon",
      };
    } else if (isActive) {
      return {
        icon: CheckCircle,
        color: "text-green-700",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        text: "Active",
      };
    } else {
      return {
        icon: XCircle,
        color: "text-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        text: "Expired",
      };
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  const getColorValue = (
    color: string,
    shade: string,
    type: "bg" | "text" | "border",
  ): string => {
    const colorMap: Record<string, Record<string, Record<string, string>>> = {
      blue: {
        "50": {
          bg: "bg-blue-50",
          text: "text-blue-50",
          border: "border-blue-50",
        },
        "100": {
          bg: "bg-blue-100",
          text: "text-blue-100",
          border: "border-blue-100",
        },
        "500": {
          bg: "bg-blue-500",
          text: "text-blue-500",
          border: "border-blue-500",
        },
        "600": {
          bg: "bg-blue-600",
          text: "text-blue-600",
          border: "border-blue-600",
        },
        "700": {
          bg: "bg-blue-700",
          text: "text-blue-700",
          border: "border-blue-700",
        },
      },
      red: {
        "50": { bg: "bg-red-50", text: "text-red-50", border: "border-red-50" },
        "100": {
          bg: "bg-red-100",
          text: "text-red-100",
          border: "border-red-100",
        },
        "500": {
          bg: "bg-red-500",
          text: "text-red-500",
          border: "border-red-500",
        },
        "600": {
          bg: "bg-red-600",
          text: "text-red-600",
          border: "border-red-600",
        },
        "700": {
          bg: "bg-red-700",
          text: "text-red-700",
          border: "border-red-700",
        },
      },
      orange: {
        "50": {
          bg: "bg-orange-50",
          text: "text-orange-50",
          border: "border-orange-50",
        },
        "100": {
          bg: "bg-orange-100",
          text: "text-orange-100",
          border: "border-orange-100",
        },
        "500": {
          bg: "bg-orange-500",
          text: "text-orange-500",
          border: "border-orange-500",
        },
        "600": {
          bg: "bg-orange-600",
          text: "text-orange-600",
          border: "border-orange-600",
        },
        "700": {
          bg: "bg-orange-700",
          text: "text-orange-700",
          border: "border-orange-700",
        },
      },
      green: {
        "50": {
          bg: "bg-green-50",
          text: "text-green-50",
          border: "border-green-50",
        },
        "100": {
          bg: "bg-green-100",
          text: "text-green-100",
          border: "border-green-100",
        },
        "500": {
          bg: "bg-green-500",
          text: "text-green-500",
          border: "border-green-500",
        },
        "600": {
          bg: "bg-green-600",
          text: "text-green-600",
          border: "border-green-600",
        },
        "700": {
          bg: "bg-green-700",
          text: "text-green-700",
          border: "border-green-700",
        },
      },
      indigo: {
        "50": {
          bg: "bg-indigo-50",
          text: "text-indigo-50",
          border: "border-indigo-50",
        },
        "100": {
          bg: "bg-indigo-100",
          text: "text-indigo-100",
          border: "border-indigo-100",
        },
        "500": {
          bg: "bg-indigo-500",
          text: "text-indigo-500",
          border: "border-indigo-500",
        },
        "600": {
          bg: "bg-indigo-600",
          text: "text-indigo-600",
          border: "border-indigo-600",
        },
        "700": {
          bg: "bg-indigo-700",
          text: "text-indigo-700",
          border: "border-indigo-700",
        },
      },
      gray: {
        "50": {
          bg: "bg-gray-50",
          text: "text-gray-50",
          border: "border-gray-50",
        },
        "100": {
          bg: "bg-gray-100",
          text: "text-gray-100",
          border: "border-gray-100",
        },
        "500": {
          bg: "bg-gray-500",
          text: "text-gray-500",
          border: "border-gray-500",
        },
        "600": {
          bg: "bg-gray-600",
          text: "text-gray-600",
          border: "border-gray-600",
        },
        "700": {
          bg: "bg-gray-700",
          text: "text-gray-700",
          border: "border-gray-700",
        },
      },
    };

    return colorMap[color]?.[shade]?.[type] || "";
  };

  const primaryColor = getColorValue(
    brandConfig.primaryColor,
    brandConfig.primaryColorShade,
    "bg",
  );
  const primaryColorHover = getColorValue(
    brandConfig.primaryColor,
    "700",
    "bg",
  );
  const primaryColorLight = getColorValue(brandConfig.primaryColor, "50", "bg");
  const primaryColorBorder = getColorValue(
    brandConfig.primaryColor,
    brandConfig.primaryColorShade,
    "border",
  );

  return (
    <div
      className="min-h-screen text-gray-900 p-8"
      style={{'{{' }}
        backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
      {{ '}}'}}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={onBack}
          className={`${primaryColor} hover:${primaryColorHover} text-white px-6 py-3 rounded-lg flex items-center gap-2 mb-6 transition-all duration-200 shadow-lg hover:shadow-xl`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className={`${primaryColor} p-4 rounded-xl shadow-lg`}>
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Warranty Lookup
              </h1>
              <p className="text-gray-600 mt-1">
                Search by transaction ID or serial number
              </p>
            </div>
          </div>

          {/* Search Controls */}
          <div className="space-y-4">
            {/* Search Type Selector */}
            <div className="flex gap-3">
              {[
                { key: "transaction", label: "Transaction ID", icon: FileText },
                { key: "serial", label: "Serial Number", icon: Package },
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => setSearchType(type.key as SearchType)}
                  className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-3 font-medium ${
                    searchType === type.key
                      ? `${primaryColor} ${primaryColorBorder} text-white shadow-lg`
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <type.icon className="w-5 h-5" />
                  {type.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={
                    searchType === "transaction"
                      ? "Enter transaction ID (e.g., 123)"
                      : "Enter serial number (e.g., WR2024-12345)"
                  }
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading || !searchTerm.trim()}
                className={`${primaryColor} hover:${primaryColorHover} disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-lg`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start gap-4">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Searching warranty records...
            </p>
          </div>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((warranty) => {
                const statusInfo = getStatusInfo(
                  warranty.is_warranty_active,
                  warranty.days_remaining,
                );

                return (
                  <div
                    key={warranty.transaction_id}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-100 hover:shadow-3xl transition-shadow duration-300"
                  >
                    {/* Header with Status */}
                    <div className={`${primaryColor} p-6 text-white`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold mb-2">
                            {warranty.equipment_brand}{" "}
                            {warranty.equipment_model}
                          </h2>
                          <p className="text-white/90">
                            Year: {warranty.equipment_year} | Serial:{" "}
                            {warranty.serial_number}
                          </p>
                        </div>
                        <div
                          className={`${statusInfo.bgColor} ${statusInfo.borderColor} ${statusInfo.color} px-6 py-3 rounded-xl border-2 flex items-center gap-2 font-bold shadow-lg`}
                        >
                          {createElement(statusInfo.icon, {
                            className: "w-5 h-5",
                          })}
                          {statusInfo.text}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Customer Info */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-gray-700">
                            <div
                              className={`${primaryColorLight} p-3 rounded-lg`}
                            >
                              <User
                                className={`w-5 h-5 ${getColorValue(brandConfig.primaryColor, "600", "text")}`}
                              />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 font-medium">
                                Customer
                              </p>
                              <p className="text-lg font-semibold">
                                {warranty.customer_name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-700">
                            <div
                              className={`${primaryColorLight} p-3 rounded-lg`}
                            >
                              <FileText
                                className={`w-5 h-5 ${getColorValue(brandConfig.primaryColor, "600", "text")}`}
                              />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 font-medium">
                                Transaction ID
                              </p>
                              <p className="text-lg font-semibold">
                                #{warranty.transaction_id}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-700">
                            <div
                              className={`${primaryColorLight} p-3 rounded-lg`}
                            >
                              <Calendar
                                className={`w-5 h-5 ${getColorValue(brandConfig.primaryColor, "600", "text")}`}
                              />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 font-medium">
                                Purchase Date
                              </p>
                              <p className="text-lg font-semibold">
                                {formatDate(warranty.purchase_date)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Warranty Details */}
                        <div className="space-y-4">
                          {warranty.warranty_start_date && (
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="bg-green-50 p-3 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 font-medium">
                                  Warranty Start
                                </p>
                                <p className="text-lg font-semibold">
                                  {formatDate(warranty.warranty_start_date)}
                                </p>
                              </div>
                            </div>
                          )}

                          {warranty.warranty_end_date && (
                            <div className="flex items-center gap-3 text-gray-700">
                              <div className="bg-red-50 p-3 rounded-lg">
                                <Clock className="w-5 h-5 text-red-600" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 font-medium">
                                  Warranty End
                                </p>
                                <p className="text-lg font-semibold">
                                  {formatDate(warranty.warranty_end_date)}
                                </p>
                              </div>
                            </div>
                          )}

                          {warranty.warranty_period_months && (
                            <div className="flex items-center gap-3 text-gray-700">
                              <div
                                className={`${primaryColorLight} p-3 rounded-lg`}
                              >
                                <Shield
                                  className={`w-5 h-5 ${getColorValue(brandConfig.primaryColor, "600", "text")}`}
                                />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 font-medium">
                                  Warranty Period
                                </p>
                                <p className="text-lg font-semibold">
                                  {warranty.warranty_period_months} months
                                </p>
                              </div>
                            </div>
                          )}

                          {warranty.is_warranty_active &&
                            warranty.days_remaining !== undefined && (
                              <div className="flex items-center gap-3 text-gray-700">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                  <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500 font-medium">
                                    Days Remaining
                                  </p>
                                  <p className="text-lg font-semibold">
                                    {warranty.days_remaining} days
                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Warranty Coverage */}
                      {warranty.warranty_coverage && (
                        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Shield
                              className={`w-5 h-5 ${getColorValue(brandConfig.primaryColor, "600", "text")}`}
                            />
                            Coverage Details
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {warranty.warranty_coverage}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 text-lg">
                No warranty records found for "{searchTerm}". Please check the{" "}
                {searchType === "transaction"
                  ? "transaction ID"
                  : "serial number"}{" "}
                and try again.
              </p>
            </div>
          )
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div
              className={`${primaryColorLight} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <Shield
                className={`w-12 h-12 ${getColorValue(brandConfig.primaryColor, "600", "text")}`}
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Search for Warranty Information
            </h3>
            <p className="text-gray-600 text-lg">
              Enter a transaction ID or serial number above to view warranty
              details
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Need Help with Your Warranty?
          </h3>
          <p className="text-gray-600 text-lg mb-4">
            Have questions about your warranty coverage? Our service team is
            here to help.
          </p>
          <p className="text-gray-500">
            Contact our service department for detailed assistance with warranty
            claims, coverage questions, or service appointments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarrantyLookupPage;
