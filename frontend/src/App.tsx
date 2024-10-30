
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import { Publish } from './pages/Publish';

// @ts-ignore
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish"
          element={
            <ProtectedRoute>
              <Publish></Publish>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
