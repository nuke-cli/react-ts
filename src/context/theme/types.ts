import { Context } from 'react';

export type Theme = 'ts' | 'js';

export interface ThemeContextType {
	theme: Theme;
	handleTheme: (t: 'ts' | 'js') => void;
}

export interface MainContextType {
	ThemeContext: Context<ThemeContextType>;
}
