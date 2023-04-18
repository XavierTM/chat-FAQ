
import AppWrapper, { Route } from '@xavisoft/app-wrapper'
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';

function setDimensions() {
  
  const width = window.innerWidth + 'px';
  const height = window.innerHeight + 'px';

  document.documentElement.style.setProperty('--window-width', width);
  document.documentElement.style.setProperty('--window-height', height);

}

window.addEventListener('resize', setDimensions);
setDimensions();

function App() {
  return (
    <Provider store={store}>
      <AppWrapper>

        <Navbar />

        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />

      </AppWrapper>
    </Provider>
  );
}

export default App;
