import React from 'react';
import classnames from 'classnames';
import { Text } from '@components';
import * as Types from './types';
import './style.scss';

const Chip = (props: Types.Props): JSX.Element => {
	const { id, label, active, size } = props;

	return (
		<div
			id={id}
			data-testid={id}
			className={classnames('Chip', {
				'Chip--active': active,
				'Chip--large': size === 'lg',
				'Chip--small': size === 'sm',
			})}
		>
			<Text id={`${id}-label`} content={label} bold={active} size={size} />
		</div>
	);
};

export default Chip;
