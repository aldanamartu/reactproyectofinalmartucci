import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Producto from "./pages/Producto";
import Productos from "./pages/Productos";
import "./App.css";
import Error from "./pages/Error";
import Carrito from "./pages/Carrito";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="/productos" element={<Productos />} />
          <Route exact path="/productos/:productoId" element={<Producto />} />
          <Route exact path="/productos/category/:category" element={<Productos />} />
          <Route exact path="/carrito" element={<Carrito />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
