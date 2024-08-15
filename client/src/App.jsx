import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { routes } from "./Routes/routes";
import AuthProvider from "./Providers/AuthProvider";

function App() {
  return (
    <>
     <AuthProvider>
     <RouterProvider router={routes} />
     <Toaster />
     </AuthProvider>
    </>
  );
}

export default App;
