export type op = 1 | 2;

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Car {
    id: number | string;
    make: string;
    model: string;
    color: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    cars: Car[];
};
