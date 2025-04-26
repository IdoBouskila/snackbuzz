import React from 'react';
import { assertUnreachable } from '../utils/helpers';
import { NotificationVariant } from '../../snackbuzz-core/types';

const ToastIcon: React.FC<{ variant: NotificationVariant }> = ({ variant }) => {
	switch (variant) {
		case 'info':
			return <span className="material-symbols-outlined">info</span>;

		case 'error':
			return <span className="material-symbols-outlined">error</span>;

		case 'success':
			return (
				<span className="material-symbols-outlined">check_circle</span>
			);
		case 'warning':
			return <span className="material-symbols-outlined">warning</span>;

		default:
			assertUnreachable(variant);
	}
};

export default ToastIcon;
