import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Statistics from "./components/Statistics";

const App = () => {
  return (
    <Router>
      <>
        {/* Routes for Products Component and Statistics Component */}
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
