import React from 'react';
import AppScreen from './pages/AppScreen';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return(
    <Provider store={store}>
      <AppScreen />
    </Provider>
    
  );
}
export default App;
