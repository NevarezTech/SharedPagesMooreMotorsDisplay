import { useNavigate } from "react-router-dom";
import KioskHome from "@shared/components/KioskHome";
import type { KioskBrandConfig } from "@shared/types/kiosk";

// Exmark brand configuration - red and silver color scheme
const exmarkBrandConfig: KioskBrandConfig = {
  name: "Exmark",
  logoPath: "/Logo.svg",
  title: "Exmark Service Center",
  websiteUrl: "https://www.exmark.com/",
  primaryColor: "red",
  primaryColorShade: "600",
  accentColor: "gray",
  gradientFrom: "red-50",
  gradientTo: "gray-100",
};

const ExmarkKioskHome = () => {
  const navigate = useNavigate();
  return (
    <KioskHome
      brandConfig={exmarkBrandConfig}
      onQuestionnaire={() => navigate("/questionnaire")}
      onInventory={() => navigate("/")}
      onWarrantyLookup={() => navigate("/warranty")}
    />
  );
};

export default ExmarkKioskHome;
