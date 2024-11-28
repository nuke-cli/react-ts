import React from 'react';
import { Topbar } from '@containers';
import { MainProvider } from '@context';

// STYLE
import './App.scss';

const App = (): JSX.Element => {
	return (
		<MainProvider>
			<div className="App">
				<Topbar id="app-topbar" />
			</div>
		</MainProvider>
	);
};

export default App;
