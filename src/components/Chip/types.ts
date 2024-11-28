type Size = 'sm' | 'md' | 'lg';

export interface Props {
	id: string;
	label: string;
	active?: boolean;
	size?: Size;
	custom?: {
		background: string;
		color: string;
	};
}
