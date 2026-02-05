import { FileQuestion, Shield, ExternalLink } from "lucide-react";

interface KioskBrandConfig {
  name: string;
  logoPath?: string;
  title: string;
  websiteUrl: string;
  primaryColor: string; // e.g., "blue", "orange", "red"
  primaryColorShade: string; // e.g., "600", "700"
  accentColor: string; // e.g., "indigo", "blue"
  gradientFrom: string; // e.g., "blue-50"
  gradientTo: string; // e.g., "indigo-100"
}

interface KioskHomeProps {
  brandConfig: KioskBrandConfig;
  onQuestionnaire: () => void;
  onInventory?: () => void;
  onWarrantyLookup: () => void;
}

interface KioskButtonProps {
  icon: any;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
  primaryColorHex: string;
  primaryColorLightHex: string;
}

// Helper function to get color hex values
const getColorValue = (color: string, shade: string): string => {
  const colorMap: Record<string, Record<string, string>> = {
    blue: {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "500": "#3b82f6",
      "600": "#2563eb",
      "700": "#1d4ed8",
    },
    red: {
      "50": "#fef2f2",
      "100": "#fee2e2",
      "500": "#ef4444",
      "600": "#dc2626",
      "700": "#b91c1c",
    },
    orange: {
      "50": "#fffbf0",
      "100": "#fef3c7",
      "500": "#f5a623",
      "600": "#f59e0b",
      "700": "#d97706",
    },
    green: {
      "50": "#f0fdf4",
      "100": "#dcfce7",
      "500": "#22c55e",
      "600": "#16a34a",
      "700": "#15803d",
    },
    indigo: {
      "50": "#eef2ff",
      "100": "#e0e7ff",
      "500": "#6366f1",
      "600": "#4f46e5",
      "700": "#4338ca",
    },
    gray: {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
    },
  };
  return colorMap[color]?.[shade] || colorMap.blue[shade] || "#3b82f6";
};

const KioskButton = ({
  icon,
  title,
  description,
  onClick,
  className = "",
  primaryColorHex,
  primaryColorLightHex,
}: KioskButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden
        bg-gradient-to-br from-white to-gray-50
        border-2 border-gray-200
        rounded-3xl p-10
        transition-all duration-300 ease-out
        transform hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]
        shadow-xl hover:shadow-2xl
        h-[280px] w-full
        flex flex-col items-center justify-center
        text-center space-y-5
        ${className}
      `}
      style={{
        borderColor: undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = primaryColorHex;
        e.currentTarget.style.borderWidth = "3px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.borderWidth = "2px";
      }}
    >
      {/* Animated gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${primaryColorLightHex}, ${primaryColorHex}20)`,
        }}
      />

      {/* Icon container with background circle */}
      <div
        className="relative z-10 p-4 rounded-full transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${primaryColorHex}15`,
          color: primaryColorHex,
        }}
      >
        {icon}
      </div>

      {/* Text content */}
      <div className="relative z-10">
        <h2
          className="text-2xl font-bold mb-2 transition-colors duration-300"
          style={{ color: "#1f2937" }}
        >
          {title}
        </h2>
        <p
          className="text-base leading-relaxed px-2"
          style={{ color: "#6b7280" }}
        >
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl"
        style={{ backgroundColor: primaryColorHex }}
      />
    </button>
  );
};

const KioskHome = ({
  brandConfig,
  onQuestionnaire,
  onWarrantyLookup,
}: KioskHomeProps) => {
  const handleWebsite = () => {
    window.open(brandConfig.websiteUrl, "_blank");
  };

  const primaryColorHex = getColorValue(
    brandConfig.primaryColor,
    brandConfig.primaryColorShade,
  );
  const primaryColorLightHex = getColorValue(brandConfig.primaryColor, "50");
  const gradientFromHex = getColorValue(brandConfig.primaryColor, "50");
  const gradientToHex = getColorValue(
    brandConfig.accentColor || brandConfig.primaryColor,
    "100",
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br p-8"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${gradientFromHex}, ${gradientToHex})`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {brandConfig.logoPath && (
            <div className="flex justify-center mb-6">
              <img
                src={brandConfig.logoPath}
                alt={`${brandConfig.name} Logo`}
                className="h-32 w-auto"
              />
            </div>
          )}
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {brandConfig.title}
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Welcome to our service kiosk. Please select an option below to get
            started.
          </p>
        </div>

        {/* Main Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <KioskButton
            icon={<FileQuestion size={64} strokeWidth={1.5} />}
            title="Customer Questionnaire"
            description="Answer questions about your equipment needs"
            onClick={onQuestionnaire}
            primaryColorHex={primaryColorHex}
            primaryColorLightHex={primaryColorLightHex}
          />

          <KioskButton
            icon={<Shield size={64} strokeWidth={1.5} />}
            title="Warranty Lookup"
            description="Check warranty status and coverage information"
            onClick={onWarrantyLookup}
            primaryColorHex={primaryColorHex}
            primaryColorLightHex={primaryColorLightHex}
          />

          <KioskButton
            icon={<ExternalLink size={64} strokeWidth={1.5} />}
            title={`${brandConfig.name} Website`}
            description={`Visit ${brandConfig.name} website for more information`}
            onClick={handleWebsite}
            className="border-green-200 hover:border-green-300"
            primaryColorHex={primaryColorHex}
            primaryColorLightHex={primaryColorLightHex}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-gray-600">
          <p className="text-xl font-medium">
            Need assistance? Please ask our service team for help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KioskHome;
