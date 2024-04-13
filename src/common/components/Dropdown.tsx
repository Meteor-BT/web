import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { DropdownItem } from "@/types";
import Button from "@/common/components/Button";
import useOutsideClick from "@/common/hooks/useOutsideClick";

type Props = {
    label: React.ReactNode;
    buttonClass?: string;
    items: DropdownItem[];
    expand?: boolean;
    selectedId: string;
    onShow?: () => void;
    onHide?: () => void;
};

const Dropdown: React.FC<Props> = ({ label, items, selectedId, buttonClass = "", expand = false }) => {
    const [show, setShow] = useState(false);
    const [maxHeight, setMaxHeight] = useState(200);
    const containerRef = useRef<HTMLDivElement>(null);

    useOutsideClick(containerRef, () => {
        setShow(false);
    });

    useEffect(() => {
        if (!containerRef.current) return;
        const low = containerRef.current.getBoundingClientRect().bottom;
        setMaxHeight(window.innerHeight - low - 32);
    }, [containerRef.current]);

    function onClick(item: DropdownItem) {
        item.onClick && item.onClick(item.id);
        setShow(false);
    }

    return (
        <div ref={containerRef} className="flex relative">
            <Button variant="text" className={"text-neutral-400 " + buttonClass} onClick={() => setShow((p) => !p)}>
                {label}
                {expand && <span className="opacity-50">{selectedId || "Select one"}</span>}
                <FaChevronDown className={`text-xs transition-[colors,transform] ${show ? "rotate-180" : ""}`} />
            </Button>
            <div
                className={`z-[1] absolute top-[120%] right-0 min-w-max rounded-lg border border-neutral-800 bg-neutral-950 p-4 transition-[transform,opacity] overflow-y-auto
                    ${show ? "opacity-100 visible flex flex-col" : "opacity-0 invisible hidden pointer-events-none"}`}
                style={{ maxHeight: maxHeight.toString() + "px" }}
            >
                {items.map((item, idx) => (
                    <Button key={idx.toString() + item.id} variant="text" className="w-full" style={{ justifyContent: "flex-start" }} onClick={() => onClick(item)}>
                        {item.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
