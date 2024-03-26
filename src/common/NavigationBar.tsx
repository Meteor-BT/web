import React, { useState } from "react";
import BrandLogo from "@/common/BrandLogo";
import { FaBars, FaGithub, FaX } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const navLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Weather",
        path: "/weather",
    },
    {
        name: "About",
        path: "/about",
    },
];

const NavigationBar: React.FC = () => {
    const [show, setShow] = useState(false);

    return (
        <nav
            className={`w-full flex flex-row items-center justify-start h-[56px] fixed top-0 right-0 left-0 bg-black px-6 gap-4 border-b border-b-neutral-900`}
        >
            <button
                className="lg:hidden lg:invisible flex items-center justify-center text-neutral-300 text-xl"
                onClick={() => setShow(!show)}
            >
                {show ? <FaX /> : <FaBars />}
            </button>
            <BrandLogo />
            <div
                className={`w-full flex-col lg:flex-row bg-black gap-4 lg:flex lg:visible lg:relative lg:p-0
                ${show ? "flex absolute top-full right-0 p-4" : "hidden invisible"}`}
            >
                {navLinks.map((l, idx) => (
                    <NavLink
                        key={idx.toString() + l}
                        to={l.path}
                        className={({ isActive }) =>
                            `lg:hover:text-neutral-300 ${isActive ? "text-neutral-100" : ""}`
                        }
                    >
                        {l.name}
                    </NavLink>
                ))}
            </div>

            <a
                href="https://github.com/Meteor-BT"
                target="_blank"
                rel="noreferrer"
                className="text-xl ml-auto"
            >
                <FaGithub />
            </a>
        </nav>
    );
};

export default NavigationBar;
