import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  const intervals = [
      [Math.floor(seconds / 31536000), 'y'],
      [Math.floor((seconds % 31536000) / 2592000), 'mo'],
      [Math.floor((seconds % 2592000) / 86400), 'd'],
      [Math.floor((seconds % 86400) / 3600), 'h'],
      [Math.floor((seconds % 3600) / 60), 'm']
  ];
  for (const [interval, label] of intervals) {
      if (interval > 0) {
          return `${interval}${label} ago`;
      }
  }
  return 'Just now';
}