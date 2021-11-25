import { Suspense, lazy } from "react/cjs/react.production.min";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="*" element={<div>404 | page not found</div>} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default App;
