import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Topbar from './container';
import * as Types from './types';

let wrapper = (props: Types.Props): JSX.Element => <Topbar {...props} />;

describe('Topbar', (): void => {
	afterAll((): void => (wrapper = null));

	it('should render', (): void => {
		const props: Types.Props = {
			id: 'jest',
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest')).toBeTruthy();
		expect(getByTestId('jest-title').textContent).toBe('react-setup');
	});
});
