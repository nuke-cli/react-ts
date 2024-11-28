import React from 'react';
import classnames from 'classnames';
import { Text } from '@components';
import * as Types from './types';

// STYLE
import './style.scss';

const Link = (props: Types.Props): JSX.Element => {
	const { id, label, href } = props;
	function navigate(): void {
		if (href) window.open(href, '_blank');
	}

	return (
		<span
			id={id}
			data-testid={id}
			className={classnames('Link', { 'Link--empty': !href })}
			onClick={() => navigate()}
		>
			<Text id={`${id}-link-label`} content={label} />
		</span>
	);
};

export default Link;
