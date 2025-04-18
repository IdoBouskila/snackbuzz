import type { NotificationKey } from './types';

/**
 * Checks if a prefix key matches the beginning of a full key.
 *
 * @param prefixKey - The key to check as a prefix
 * @param fullKey - The complete key to check against
 * @returns True if the prefix key matches the beginning of the full key
 */
export function isKeyPrefixMatch(
	prefixKey: NotificationKey,
	fullKey: NotificationKey,
): boolean {
	return prefixKey.every((key, index) => key === fullKey[index]);
}
