import { writable } from 'svelte/store';
export const modal = writable(false);
export const isLoading = writable(true);
export const todo = writable({});
