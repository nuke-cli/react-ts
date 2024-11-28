import React, { createContext, useState, ReactNode, FC } from 'react';
import { Theme, ThemeContextType } from './types';

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: FC<ReactNode> = ({ children }) => {
	const [theme, handleTheme] = useState<Theme>('ts');

	const context: ThemeContextType = {
		theme,
		handleTheme,
	};

	return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
