import React, { useState } from 'react';
import { Chip } from '@components';

// STYLES
import './style.scss';

const Home = (): JSX.Element => {
	function setMain(id: string = ''): void {
		// increase size for active side
		const active = document.getElementById(id);
		console.log(active.classList);
	}

	return (
		<main className="Home">
			<section id="home-ts" className="Home__section">
				<span onClick={() => setMain('home-ts')}>
					<Chip id="ts-icon" label="TS" size="lg" />
				</span>
			</section>
			<section id="home-js" className="Home__section">
				<Chip id="js-icon" label="JS" size="lg" />
			</section>
		</main>
	);
};

export default Home;
