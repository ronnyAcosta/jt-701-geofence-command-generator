import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRouter from "./routers/AppRouter";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider>
      <Toaster
        richColors
        style={{
          "--normal-bg": "var(--surface)",
          "--normal-text": "var(--surface-text)",
          "--normal-border": "var(--surface-border)",

          "--success-bg": "var(--app-info-bg)",
          "--success-text": "var(--app-info-text)",
          "--success-border": "var(--app-info-border)",

          "--info-bg": "var(--app-info-bg)",
          "--info-text": "var(--app-info-text)",
          "--info-border": "var(--app-info-border)",

          "--error-bg": "var(--danger-bg)",
          "--error-text": "var(--danger-text)",
          "--error-border": "var(--danger-border)",

          "--border-radius": "8px",
        }}
      />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
};
export default App;
