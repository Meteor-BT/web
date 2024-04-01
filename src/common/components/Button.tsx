import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: "xs" | "sm" | "base" | "lg";
    variant?: "solid" | "text" | "outline" | "icon";
    color?: "primary" | "secondary" | "normal" | "invert";
};

const Button: React.FC<Props> = (props) => {
    if (props.variant === "text") {
        return (
            <button
                {...props}
                type={props.type || "button"}
                className={`flex flex-row items-center justify-center transition-colors min-w-max min-h-max border-none border-transparent bg-transparent
${props.size === "sm" ? "px-3 py-1 gap-1 rounded text-sm" : ""}
${props.size === "xs" ? "px-3 py-1 gap-1 rounded text-xs" : ""}
${props.size === "lg" ? "px-5 py-2 rounded-lg gap-2 text-base" : ""}
${props.size === "base" || !props.size ? "px-4 py-2 rounded-lg gap-2 text-sm" : ""}
${props.color === "primary" ? "text-teal-500 stroke-teal-500" : ""}
${props.color === "secondary" ? "text-orange-500 stroke-orange-500" : ""}
${props.color === "invert" ? "text-neutral-900 stroke-neutral-900" : ""}
${props.color === "normal" || !props.color ? "text-white stroke-white lg:hover:bg-neutral-900" : ""}
${props.className || ""}`}
            >
                {props.children}
            </button>
        );
    }

    if (props.variant === "outline") {
        return (
            <button
                {...props}
                type={props.type || "button"}
                className={`flex flex-row items-center justify-center transition-colors min-w-max min-h-max bg-transparent border
${props.size === "sm" ? "px-3 py-1 gap-1 rounded text-sm" : ""}
${props.size === "xs" ? "px-3 py-1 gap-1 rounded text-xs" : ""}
${props.size === "lg" ? "px-5 py-2 rounded-lg gap-2 text-base" : ""}
${props.size === "base" || !props.size ? "px-4 py-2 rounded-lg gap-2 text-sm" : ""}
${props.color === "primary" ? "text-teal-500 stroke-teal-500 border-teal-500 lg:hover:bg-teal-100" : ""}
${props.color === "secondary" ? "bg-orange-500 text-orange-500 stroke-orange-500 border-orange-500 lg:hover:bg-orange-500/20" : ""}
${props.color === "invert" ? "bg-neutral-900 text-white stroke-white border-neutral-900 lg:hover:bg-neutral-800" : ""}
${props.color === "normal" || !props.color ? "bg-transparent border-neutral-300 text-neutral-300 stroke-neutral-300 lg:hover:bg-neutral-900" : ""}
${props.className || ""}`}
            >
                {props.children}
            </button>
        );
    }

    return (
        <button
            {...props}
            type={props.type || "button"}
            className={`flex flex-row items-center justify-center transition-colors min-w-max min-h-max
${props.size === "sm" ? "px-3 py-1 gap-1 rounded text-sm" : ""}
${props.size === "xs" ? "px-3 py-1 gap-1 rounded text-xs" : ""}
${props.size === "lg" ? "px-5 py-2 rounded-lg gap-2 text-base" : ""}
${props.size === "base" || !props.size ? "px-4 py-2 rounded-lg gap-2 text-sm" : ""}
${props.color === "primary" ? "bg-teal-500 text-white stroke-white border-teal lg:hover:bg-teal-600 lg:hover:border-teal-600" : ""}
${props.color === "secondary" ? "bg-orange-500 text-white stroke-white border-orange lg:hover:bg-orange-600 lg:hover:border-orange-600" : ""}
${props.color === "invert" ? "bg-neutral-900 text-white stroke-white border-neutral-900 lg:hover:bg-neutral-800 lg:hover:border-neutral-800" : ""}
${props.color === "normal" || !props.color ? "bg-neutral-300 border-neutral-300 text-black stroke-black lg:hover:bg-neutral-400 lg:hover:border-neutral-400" : ""}
${props.className || ""}`}
        >
            {props.children}
        </button>
    );
};

export default Button;
