import React, { useState } from "react";
import Button from "./Button";
import { FaChevronDown } from "react-icons/fa6";
import { DropdownItem } from "@/types";

type Props = {
    label: React.ReactNode;
    buttonClass?: string;
    items: DropdownItem[];
    onShow?: () => void;
    onHide?: () => void;
};

const Dropdown: React.FC<Props> = ({ label, buttonClass, items }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="flex relative">
            <Button
                variant="text"
                className={"text-neutral-400 " + (buttonClass || "")}
                onClick={() => setShow((p) => !p)}
            >
                {label}
                <FaChevronDown
                    className={`text-xs transition-[colors,transform] ${show ? "rotate-180" : ""}`}
                />
            </Button>
            <div className="flex flex-col">
                {items.map((item, idx) => (
                    <div key={idx.toString() + item.id}></div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
