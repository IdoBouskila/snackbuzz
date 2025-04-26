import { NotificationPlacement } from '../../snackbuzz-core/types';

/**
 * Utility for exhaustive type checking in switch statements
 * See: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */
export const assertUnreachable = (_: never): never => {
	throw new Error('Your switch statement is missing a case');
};

export const getNotificationContainerElement = (
	placement: NotificationPlacement,
): HTMLDivElement => {
	const className = `snackbuzz-container-${placement}`;

	const container = document.querySelector<HTMLDivElement>(`.${className}`);

	if (container) {
		return container;
	}

	const newContainer = document.createElement('div');
	newContainer.className = `snackbuzz-container ${className}`;
	document.body.appendChild(newContainer);

	return newContainer;
};
