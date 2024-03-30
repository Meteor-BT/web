import React, { useEffect } from "react";

export default function useOutsideClick(
    ref: React.RefObject<HTMLElement>,
    cb: () => void,
) {
    useEffect(() => {
        window.addEventListener("click", detectClick);
        return () => window.removeEventListener("click", detectClick);
    }, []);

    function detectClick(e: MouseEvent) {
        if (!ref.current) {
            return;
        }
        if (e.target && !ref.current.contains(e.target as Node)) {
            cb();
        }
    }

    return () => window.removeEventListener("click", detectClick);
}
