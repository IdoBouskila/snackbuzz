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
	placement?: NotificationPlacement;
};

export type Notification = NotificationOptions & {
	id: string;
	message: string;
	createdAt: number;
};

export type NotificationStore = {
	notifications: Notification[];
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
	enqueue: (message: string, options: NotificationOptions) => NotificationKey;
};
