import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from './component';
import * as Types from './types';

let wrapper = (props: Types.Props): JSX.Element => <Title {...props} />;

describe('Title', (): void => {
	afterAll((): void => (wrapper = null));

	it('should render', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Title Jest.',
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Title Jest.');
		expect(getByTestId('jest').className).toBe('Title Title--medium');
	});

	it('should render small', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Title Jest.',
			size: 'sm',
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Title Jest.');
		expect(getByTestId('jest').className).toBe('Title Title--small');
	});

	it('should render large', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Title Jest.',
			size: 'lg',
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Title Jest.');
		expect(getByTestId('jest').className).toBe('Title Title--large');
	});

	it('should render bold', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Title Jest.',
			bold: true,
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Title Jest.');
		expect(getByTestId('jest').className).toBe('Title Title--medium Title--bold');
	});

	it('should render italic', (): void => {
		const props: Types.Props = {
			id: 'jest',
			content: 'Title Jest.',
			italic: true,
		};

		const { getByTestId } = render(wrapper(props));

		expect(getByTestId('jest').textContent).toBe('Title Jest.');
		expect(getByTestId('jest').className).toBe('Title Title--medium Title--italic');
	});
});
