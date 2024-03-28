import React from "react";

export type DropdownItem = {
    id: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    items?: DropdownItem[];
    onClick: (id: string) => void;
};
