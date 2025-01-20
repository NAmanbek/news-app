import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import '../../shared/styles/global.scss'

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
