import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '../../pages/Home';
import { store } from '../store/store'
import '../../shared/styles/global.scss';
import Profile from '../../pages/Profile';

const AppRoutes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default AppRoutes;
