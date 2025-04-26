import React from 'react';
import ToastIcon from './ToastIcon';
import { NotificationStore } from '../../snackbuzz-core/types';

const Toast: React.FC<{
  dequeueSelf: () => void;
  setNotificationDismissed: () => void;
  notification: NotificationStore['notifications'][number];
}> = ({ notification, dequeueSelf, setNotificationDismissed }) => {
  const { variant, isDismissed } = notification;

  return (
    <div
      onAnimationEnd={isDismissed ? dequeueSelf : undefined}
      className={`toast ${variant} ${isDismissed ? 'dismiss' : ''}`}
    >
      <ToastIcon variant={variant} />

      <div className="toast-content">{notification.message}</div>

      <button className="toast-close" onClick={setNotificationDismissed}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};

export default Toast;
