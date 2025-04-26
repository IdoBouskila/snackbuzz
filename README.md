# SnackBuzz

A small weight & simple notification library 🔥

> [!NOTE]
> Currently, React is the only supported UI framework (maybe more in the future)
> DEMO will be available soon 🔜

## Features

- Comes with a beautiful UI ready to go with dark / light theme support ✨
- You can manage toasts easily with keys (great for smart dismissing) inspired by `@tanstack/react-query` `queryKey` mechanism
- Built-in support for different variants (success, error, info, warning).
- No need to wrap your app with a <Provider /> or drop a <Toaster /> somewhere — just call and place your toasts wherever you like. Super simple.
- Nice options built-in: max notifications, default duration, prevent duplicates, and placement control

## Getting Started

> [!NOTE]
> The package doesn't publish yet 🔜

```bash
npm install react-snackbuzz
```

## Usage (React)

```tsx
import { useSnackBuzz } from 'react-snackbuzz';

function App() {
  const snackbuzz = useSnackBuzz({
    placement: 'top-right',
    maxNotifications: 3,
    defaultDuration: 3000,
    preventDuplicates: true,
  });

  return (
    <button
      onClick={() =>
        snackbuzz.enqueue('Hi from SnackBuzz!', {
          variant: 'info',
          duration: 4000 /* You can override the default here! */,
        })
      }
    >
      Show Snack
    </button>
  );
}
```

### What does `useSnackBuzz` give you?

- `enqueue(message, options)` — Show a notification
- `clear()` — Clear all notifications
- `dequeue(key?)` — Remove a specific notification (or all if no key is provided)

### Options

You can pass options to `useSnackBuzz` for stuff like placement, max notifications, etc. You can also update options dynamically if your options stored in state.

- `maxNotifications` (number): How many snacks can show at once
- `defaultDuration` (ms | 'persist'): How long they stick around
- `preventDuplicates` (bool): Block repeat messages
- `placement` (string): Where to put your snacks (UI decides what this means)

## Roadmap

- Demo site
- Custom toasts
- Promise support
- Integrate with animation libraries
- Support other UI Libraries
