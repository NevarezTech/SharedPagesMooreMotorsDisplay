import { useNavigate } from "react-router-dom";
import WarrantyLookupPage from "@shared/components/WarrantyLookupPage";
import type { WarrantyBrandConfig } from "@shared/types/warranty";

// Exmark brand configuration - red and silver color scheme
const exmarkBrandConfig: WarrantyBrandConfig = {
  name: "Exmark",
  primaryColor: "red",
  primaryColorShade: "600",
  accentColor: "gray", // Silver/gray accent
  gradientFrom: "red-50",
  gradientTo: "gray-100",
};

const ExmarkWarrantyLookupPage = () => {
  const navigate = useNavigate();
  return (
    <WarrantyLookupPage
      onBack={() => navigate("/")}
      brandConfig={exmarkBrandConfig}
    />
  );
};

export default ExmarkWarrantyLookupPage;
