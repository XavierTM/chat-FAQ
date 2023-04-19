
import AppWrapper, { Route } from '@xavisoft/app-wrapper'
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Contacts from './pages/Contacts';

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
      <AppWrapper router="hash">

        <Navbar />

        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/chat" component={Chat} />
        <Route path="/contacts" component={Contacts} />

      </AppWrapper>
    </Provider>
  );
}

export default App;
