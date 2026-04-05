export declare class HttpError extends Error {
    readonly statusCode: number;
    readonly details?: Record<string, number> | undefined;
    constructor(statusCode: number, message: string, details?: Record<string, number> | undefined);
}
//# sourceMappingURL=http-error.d.ts.map