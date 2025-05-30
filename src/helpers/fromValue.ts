export function fromValue<T extends Record<string, string | number>>(enumType: T, value: string): T[keyof T] | undefined {
    const lowerValue = value.toLowerCase();
    return Object.values(enumType).includes(lowerValue as T[keyof T]) ? (lowerValue as T[keyof T]) : undefined;
}