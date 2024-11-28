import React, { createContext, FC, ReactNode } from 'react';
import ThemeProvider, { ThemeContext } from './theme/context';
import { MainContextType } from './types';

const Root = createContext<MainContextType>({
	ThemeContext,
});

interface Props {
	children: ReactNode;
}

const MainProvider: FC<Props> = (props: Props): JSX.Element => {
	const { children } = props;
	return <ThemeProvider>{children}</ThemeProvider>;
};

export default MainProvider;
