import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyles } from "./styles/GlobalStyles";
import TaxCalculator from "./pages/TaxCalculator";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <TaxCalculator />
      </QueryClientProvider>
    </>
  );
}

export default App;
