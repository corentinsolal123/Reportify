// Stable keys for list rows (crypto.randomUUID is unavailable outside secure contexts).
export const createId = (): string => Math.random().toString(36).slice(2, 10);
