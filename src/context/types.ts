import { Context } from 'react';
import { ThemeContextType } from './theme/types';

export interface MainContextType {
	ThemeContext: Context<ThemeContextType>;
}
