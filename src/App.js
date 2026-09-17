import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './routers/AppRouter';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return(
    <ThemeProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}
export default App;