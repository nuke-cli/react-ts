import React, { useContext } from 'react';
import classnames from 'classnames';
import { ThemeContext } from '@context';
import { Title, Chip } from '@components';
import * as Types from './types';

// STYLE
import './style.scss';

const Topbar = (props: Types.Props): JSX.Element => {
	const { id } = props;
	const { theme, handleTheme } = useContext(ThemeContext);

	/*
  function navigate(href?: string): Window {
		if(href) return window.open(href, '_blank');
	};
  */

	return (
		<div
			className={classnames('Topbar', {
				'Topbar--ts': theme === 'ts',
				'Topbar--js': theme === 'js',
			})}
			id={id}
			data-testid={id}
		>
			<div className="Topbar__content">
				<Title id={`${id}-title`} content="react-setup" classname="Topbar__title" size="sm" />
				<div className="Topbar__chips">
					{/*<span onClick={() => navigate('https://github.com/cl4pper/react-setup')}><Chip id={`${id}-ts`} label="TS" active={true} /></span>*/}
					<span onClick={() => handleTheme('ts')}>
						<Chip
							id={`${id}-ts`}
							label="TS"
							active={theme === 'ts'}
							custom={{ color: '#FFFFFF', background: '#0d47a1' }}
						/>
					</span>
					<span onClick={() => handleTheme('js')}>
						<Chip
							id={`${id}-ts`}
							label="JS"
							active={theme === 'js'}
							custom={{ color: '#313131', background: '#f0db4f' }}
						/>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
