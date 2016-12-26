interface Reduce {
    <T>(array: T[] | Promise<T>[], reducer: (previousValue: T, currentValue: T, currentIndex: number, array: T[] | Promise<T>[]) => T | Promise<T>, initialValue?: T | Promise<T>): Promise<T>;
    <T, U>(array: T[] | Promise<T>[], reducer: (previousValue: U, currentValue: T, currentIndex: number, array: T[] | Promise<T>[]) => U | Promise<U>, initialValue: U | Promise<U>): Promise<U>;
    (array: any[], reducer: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue?: any): Promise<any>;
}

declare const reduce: Reduce;

export = reduce;
