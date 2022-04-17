import Footer from 'components/Footer';
import Header from 'components/Header';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import Detail from 'features/Movies/pages/DetailPage/Detail';
import { Outlet, Route, Routes } from 'react-router';
import './App.scss';
import PageNotFound from 'components/NotFound';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":category" element={<Catalog />} />
        <Route path=":category/:id" element={<Detail />} />
        <Route path=":category/search/:keyword" element={<Catalog />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
