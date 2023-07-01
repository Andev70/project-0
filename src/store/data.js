import { writable } from 'svelte/store';

export const todos = writable([]);
export const isCompleted = writable(null);
