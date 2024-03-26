import { createContext, useContext } from "react";

export type ThemeContext = {
    darkMode: boolean;
};

export const themeContext = createContext<ThemeContext>({
    darkMode: true,
});

export const useTheme = () => useContext(themeContext);
