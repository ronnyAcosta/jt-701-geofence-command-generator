import React from 'react';
import AppScreen from './pages/AppScreen';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './routers/AppRouter';
//import LoginScreen from './pages/LoginScreen';

const App = () => {
  return(
    <Provider store={store}>
      <AppRouter />
    </Provider>
    
  );
}
export default App;
