export type NotificationVariant = 'info' | 'error' | 'success' | 'warning';

export type NotificationPlacement =
	| 'top-left'
	| 'top-right'
	| 'top-center'
	| 'bottom-left'
	| 'bottom-right'
	| 'bottom-center';

export type NotificationKey = string[];

export type NotificationOptions = {
	key?: NotificationKey;
	variant: NotificationVariant;
	duration?: number | 'persist';
};

export type Notification = NotificationOptions & {
	message: string;
	createdAt: number;
};

export type NotificationStore = {
	notifications: (Required<Notification> & { isDismissed?: boolean })[];
	options: {
		defaultDuration: number;
		maxNotifications: number;
		preventDuplicates: boolean;
		placement: NotificationPlacement;
	};
};

export type NotificationManager = {
	clear: () => void;
	getNotifications: () => Notification[];
	dequeue: (key?: NotificationKey) => void;
	setNotificationDismissed: (key: NotificationKey) => void;
	setOptions: (options: Partial<NotificationStore['options']>) => void;
	enqueue: (message: string, options: NotificationOptions) => NotificationKey;
};
