import { isKeyPrefixMatch } from './utils';
import type {
	Notification,
	NotificationKey,
	NotificationManager,
	NotificationOptions,
	NotificationStore,
} from './types';

const defaultStoreOptions: NotificationStore['options'] = {
	maxNotifications: 3,
	defaultDuration: 3000,
	preventDuplicates: false,
	placement: 'bottom-right',
};

export class SnackBuzzCore implements NotificationManager {
	private store: NotificationStore;
	private listeners = new Set<() => void>();

	constructor(options: Partial<NotificationStore['options']> = {}) {
		this.store = {
			notifications: [],
			options: { ...defaultStoreOptions, ...options },
		};
	}

	private notify = () => {
		this.listeners.forEach((listener) => listener());
	};

	private isDuplicate(message: string): boolean {
		return this.store.notifications.some(
			(notification) => notification.message === message,
		);
	}

	private removeNotifications(notificationKey?: NotificationKey) {
		if (!notificationKey) {
			this.store.notifications = [];
			return;
		}

		// Remove notifications with matching key prefix (Inspired by `@tanstack/react-query` `queryKey` mechanism)
		this.store.notifications = this.store.notifications.filter(
			(notification) => {
				if (!notification.key.length) return true;

				return !isKeyPrefixMatch(notificationKey, notification.key);
			},
		);
	}

	private dequeueAfterDuration(
		notification: NotificationStore['notifications'][number],
	): void {
		if (notification.duration === 'persist') {
			return;
		}

		setTimeout(() => {
			this.setNotificationDismissed(notification.key);
		}, notification.duration);
	}

	enqueue(message: string, options: NotificationOptions): NotificationKey {
		const id = crypto.randomUUID();

		const {
			key = [id],
			variant = 'success',
			placement = this.store.options.placement,
			duration = this.store.options.defaultDuration,
		} = options;

		if (this.store.options.preventDuplicates && this.isDuplicate(message)) {
			return key;
		}

		const isMaxNotificationsReached =
			this.store.notifications.length >=
			this.store.options.maxNotifications;

		if (isMaxNotificationsReached) {
			this.store.notifications = this.store.notifications.slice(1);
		}

		const notification = {
			key,
			message,
			variant,
			placement,
			duration: duration,
			createdAt: Date.now(),
		} satisfies Notification;

		this.store.notifications = [...this.store.notifications, notification];

		this.dequeueAfterDuration(notification);

		this.notify();

		return key;
	}

	setNotificationDismissed(key: NotificationKey): void {
		this.store.notifications = this.store.notifications.map(
			(notification) => {
				if (!isKeyPrefixMatch(key, notification.key)) {
					return notification;
				}

				return {
					...notification,
					isDismissed: true,
				};
			},
		);

		this.notify();
	}

	dequeue(key?: NotificationKey): void {
		this.removeNotifications(key);

		this.notify();
	}

	clear(): void {
		this.store.notifications = [];

		this.notify();
	}

	getNotifications(): NotificationStore['notifications'] {
		return this.store.notifications;
	}

	subscribe(listener: () => void) {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	}
}
