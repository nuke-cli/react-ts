import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from './component';
import * as Types from './types';

let wrapper = (props: Types.Props): JSX.Element => <Text {...props} />;

describe('Text', (): void => {
	afterAll((): void => (wrapper = null));

	it('should render', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Text Jest.',
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Text Jest.');
		expect(getByTestId('jest').className).toBe('Text Text--default');
	});

	it('should render small', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Text Jest.',
			size: 'sm',
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Text Jest.');
		expect(getByTestId('jest').className).toBe('Text Text--small');
	});

	it('should render large', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Text Jest.',
			size: 'lg',
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Text Jest.');
		expect(getByTestId('jest').className).toBe('Text Text--large');
	});

	it('should render bold', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Text Jest.',
			bold: true,
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Text Jest.');
		expect(getByTestId('jest').className).toBe('Text Text--default Text--bold');
	});

	it('should render italic', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Text Jest.',
			italic: true,
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Text Jest.');
		expect(getByTestId('jest').className).toBe('Text Text--default Text--italic');
	});
});
