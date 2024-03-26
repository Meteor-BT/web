import React, { useState } from "react";
import BrandLogo from "@/common/BrandLogo";

const NavigationBar: React.FC = () => {
    const [show, setShow] = useState(false);

    return (
        <nav
            className={`w-full flex flex-row items-center justify-between h-[60px]`}
        >
            <BrandLogo />

            <div className="w-full flex flex-col"></div>
        </nav>
    );
};

export default NavigationBar;
