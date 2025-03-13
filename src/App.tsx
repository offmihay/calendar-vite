import { BrowserRouter } from "react-router-dom";
import AppRouting from "./routes/AppRouting";
import { AuthProvider } from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRouting />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
