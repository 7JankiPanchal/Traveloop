import { BrowserRouter, Routes, Route } from "react-router-dom";

import TripBudgetScreen from "../pages/TripBudgetScreen";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/trip-budget"
          element={<TripBudgetScreen />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;