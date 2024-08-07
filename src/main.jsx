import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Wrapper from "./Wrapper.jsx";
import About from "./components/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: <App />
      },

      {
        path: "about",
        element: <About />
      }
    ]
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

