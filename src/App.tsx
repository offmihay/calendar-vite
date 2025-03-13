import { BrowserRouter } from "react-router-dom";
import AppRouting from "./routes/AppRouting";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
