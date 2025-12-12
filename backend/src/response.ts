export class ApiResponse<T> {
    constructor(
        public error: string | undefined,
        public data: T,
        public success: boolean
    ) {}
}

