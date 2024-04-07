import React from "react";

const BrandLogo: React.FC = () => {
    return (
        <a href={window.origin} className="flex flex-row items-center justify-center font-bold text-neutral-200 text-[20px] min-w-max leading-none">
            <span className="text-teal-500">M</span>eteor BT
        </a>
    );
};

export default BrandLogo;
