import "./App.css";
import Homepage from "./components/Homepage";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Homepage />
      </SnackbarProvider>
    </div>
  );
}

export default App;
