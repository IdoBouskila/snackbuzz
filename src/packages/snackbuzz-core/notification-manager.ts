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

	constructor(options: Partial<NotificationStore['options']> = {}) {
		this.store = {
			notifications: [],
			options: { ...defaultStoreOptions, ...options },
		};
	}

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

		// Remove notifications with matching key prefix: for example, if the key is
		// Inspired by `@tanstack/react-query` queryKey mechanism
		this.store.notifications = this.store.notifications.filter(
			(notification) => {
				if (!notification.key) return true;

				return !isKeyPrefixMatch(notificationKey, notification.key);
			},
		);
	}

	private dequeueAfterDuration(
		notification: Notification & { duration: number },
	): void {
		setTimeout(() => {
			this.dequeue(notification.key);
		}, notification.duration);
	}

	enqueue(message: string, options: NotificationOptions): NotificationKey {
		const {
			key = [],
			variant = 'success',
			duration = this.store.options.defaultDuration,
		} = options;

		if (this.store.options.preventDuplicates && this.isDuplicate(message)) {
			return key;
		}

		const isMaxNotificationsReached =
			this.store.notifications.length >=
			this.store.options.maxNotifications;

		if (isMaxNotificationsReached) {
			this.store.notifications.shift();
		}

		const notification: Notification = {
			key,
			message,
			variant,
			duration: duration,
			createdAt: Date.now(),
			id: crypto.randomUUID(),
		};

		this.store.notifications.push(notification);

		if (notification.duration === 'persist') {
			return key;
		}

		this.dequeueAfterDuration({
			...notification,
			duration:
				notification.duration ?? this.store.options.defaultDuration,
		});

		return key;
	}

	dequeue(key?: NotificationKey): void {
		this.removeNotifications(key);
	}

	clear(): void {
		this.store.notifications = [];
	}

	getNotifications(): Notification[] {
		return [...this.store.notifications];
	}
}
