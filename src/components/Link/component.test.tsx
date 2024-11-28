// Link test
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Link from './component';
import * as Types from './types';

let wrapper = (props: Types.Props) => <Link {...props} />;

describe('Link', (): void => {
	afterAll((): void => (wrapper = null));

	it('should render', (): void => {
		const mockOpen = jest.fn();
		window.open = mockOpen; // turns the component into a mock to be tested
		const props: Types.Props = {
			id: 'jest',
			label: 'Jest Link',
			href: 'google.com',
		};
		const { getByTestId } = render(wrapper(props));
		fireEvent.click(getByTestId('jest-link-label'));

		expect(getByTestId('jest-link-label').textContent).toBe('Jest Link');
		expect(window.open).toBeCalledTimes(1);
	});
});
