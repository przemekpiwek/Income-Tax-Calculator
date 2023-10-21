import { QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "./pages/LandingPage";
import { GlobalStyles } from "./styles/GlobalStyles";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <LandingPage />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
