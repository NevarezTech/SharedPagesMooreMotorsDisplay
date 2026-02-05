import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import KioskHome from "./components/KioskHome";
import QuestionnairePage from "./components/QuestionnairePage";
import WarrantyLookupPage from "./components/WarrantyLookupPage";
import { PaymentPage } from "@shared";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KioskHome />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/warranty" element={<WarrantyLookupPage />} />
          <Route
            path="/payment"
            element={
              <PaymentPage
                accentColor="red"
                accentColorLight="from-red-100 to-red-200"
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
