import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="p-root-container w-full flex flex-col justify-center items-center py-6 text-sm">
            <p>
                Copyright &copy; {new Date().getFullYear()} Meteor - All Rights
                Reserved.
            </p>
        </div>
    );
};

export default Footer;
