import React from 'react';
import classnames from 'classnames';
import * as Types from './types';

// STYLES
import './style.scss';

const Section = (props: Types.Props): JSX.Element => {
	const { id, className, content, centered } = props;

	const setID = (p: string = ''): string => `section-${id}-${p}`;
	const setClass = (): string => (className ? `Section ${className}` : 'Section');

	return (
		<section
			id={setID()}
			className={classnames(setClass(), {
				'Section--centered': centered,
			})}
		>
			{content}
		</section>
	);
};

export default Section;
