import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import HomePage from "./pages/Homepage.jsx";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";
// import AppLayout from "./pages/AppLayout";

const HomePage = lazy(() => import("./pages/Homepage.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));

export default function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
              <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <AppLayout></AppLayout>
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to="cities"></Navigate>}
                  ></Route>
                  <Route path="cities" element={<CityList></CityList>}></Route>
                  <Route path="cities/:id" element={<City></City>}></Route>
                  <Route
                    path="countries"
                    element={<CountryList></CountryList>}
                  ></Route>
                  <Route path="form" element={<Form></Form>}></Route>
                </Route>
                <Route path="/pricing" element={<Pricing></Pricing>}></Route>
                <Route path="/product" element={<Product></Product>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}
