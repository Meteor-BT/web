import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { DropdownItem } from "@/types";
import Button from "@/common/components/Button";
import useOutsideClick from "@/common/hooks/useOutsideClick";
import { startCase } from "lodash";

type Props = {
    label: React.ReactNode;
    buttonClass?: string;
    items: DropdownItem[];
    expand?: boolean;
    selectedId: string;
    loading?: boolean;
    onShow?: () => void;
    onHide?: () => void;
};

const Dropdown: React.FC<Props> = ({ label, items, selectedId, buttonClass = "", loading = false, expand = false }) => {
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
    }, [containerRef.current, show]);

    function onClick(item: DropdownItem) {
        item.onClick && item.onClick(item.id);
        setShow(false);
    }

    return (
        <div ref={containerRef} className="flex relative">
            <Button variant="text" className={"text-neutral-400 " + buttonClass} onClick={() => setShow((p) => !p)}>
                {label}
                {expand && (
                    <div className="opacity-50">
                        {loading ? (
                            <div className="animate-spin h-4 w-4 rounded-full border-2 border-neutral-300 border-t-neutral-900 bg-transparent"></div>
                        ) : (
                            startCase(selectedId) || "Select one"
                        )}
                    </div>
                )}
                <FaChevronDown className={`text-xs transition-[colors,transform] ${show ? "rotate-180" : ""}`} />
            </Button>
            <div
                className={`z-[1] absolute top-[120%] right-0 min-w-max rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-[transform,opacity] overflow-y-auto
                    ${show ? "opacity-100 visible flex flex-col" : "opacity-0 invisible hidden pointer-events-none"}`}
                style={{ maxHeight: maxHeight.toString() + "px" }}
            >
                {!loading ? (
                    items.map((item, idx) => (
                        <Button
                            key={idx.toString() + item.id}
                            disabled={loading}
                            variant="text"
                            className="w-full"
                            style={{ justifyContent: "flex-start" }}
                            onClick={() => onClick(item)}
                        >
                            {item.label}
                        </Button>
                    ))
                ) : (
                    <div className="animate-spin h-5 w-5 rounded-full border-2 border-neutral-300 border-t-neutral-900 bg-transparent"></div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
