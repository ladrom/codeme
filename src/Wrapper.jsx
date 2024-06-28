import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from "./components/AppBar.jsx";
import Footer from "./components/Footer.jsx";

const Wrapper = () => {
  return (
    <>
      <ResponsiveAppBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Wrapper;
