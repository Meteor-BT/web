import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Root from "@/modules/Root";
import Error404 from "@/pages/Error404";

const router = createBrowserRouter([
    {
        element: <Root />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
]);

export default router;
