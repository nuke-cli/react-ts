import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chip from './component';
import * as Types from './types';

let wrapper = (props: Types.Props): JSX.Element => <Chip {...props} />;

describe('Chip', (): void => {
	afterAll((): void => (wrapper = null));

	it('should render', (): void => {
		const props: Types.Props = {
			id: 'jest',
			label: 'A label',
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').className).toBe('Chip');
		expect(getByTestId('jest-label').textContent).toBe('A label');
	});

	it('should be active', (): void => {
		const props: Types.Props = {
			id: 'jest',
			label: 'A label',
			active: true,
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').className).toBe('Chip Chip--active');
	});
});
