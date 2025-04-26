import Toast from './components/Toast';
import ReactDOM from 'react-dom/client';
import { NotificationStore } from '../snackbuzz-core/types';
import { getNotificationContainerElement } from './utils/helpers';
import React, {
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from 'react';
import './styles/snackbuzz.css';
import {
	defaultStoreOptions,
	SnackBuzzCore,
} from '../snackbuzz-core/snackbuzz-core';

export const useSnackBuzz = (
	options?: Partial<NotificationStore['options']>,
) => {
	const [snackBuzz] = useState(() => new SnackBuzzCore(options ?? {}));
	const notificationContainerRoot = useRef<ReactDOM.Root | null>(null);

	const notifications = useSyncExternalStore(
		snackBuzz.subscribe,
		snackBuzz.getNotifications,
	);

	useEffect(() => {
		if (!notificationContainerRoot.current) {
			notificationContainerRoot.current = ReactDOM.createRoot(
				getNotificationContainerElement(
					options?.placement ?? defaultStoreOptions.placement,
				),
			);
		}

		notificationContainerRoot.current.render(
			notifications.map((notification) => (
				<Toast
					notification={notification}
					key={JSON.stringify(notification.key)}
					dequeueSelf={() => snackBuzz.dequeue(notification.key)}
					setNotificationDismissed={() =>
						snackBuzz.setNotificationDismissed(notification.key)
					}
				/>
			)),
		);
	}, [notifications]);

	// Support dynamic options
	useEffect(() => {
		snackBuzz.setOptions(options ?? {});
	}, [options]);

	return {
		enqueue: snackBuzz.enqueue,
		clear: snackBuzz.clear,
		dequeue: snackBuzz.dequeue,
	};
};
