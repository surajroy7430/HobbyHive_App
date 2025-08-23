import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <div className="min-h-screen">
      <AppRoutes />

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default App;
