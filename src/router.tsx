import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Root from "@/modules/Root";
import Error404 from "@/pages/Error404";
import WeatherPage from "@/pages/WeatherPage";
import AboutPage from "@/pages/AboutPage";

const router = createBrowserRouter([
    {
        element: <Root />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/weather",
                element: <WeatherPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
        ],
    },
]);

export default router;
