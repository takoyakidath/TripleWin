export const successResponse = (data: unknown) => {
    return {
        status: 200,
        body: JSON.stringify({ data }),
    };
};

export const errorResponse = (message: string, status: number) => {
    return {
        status,
        body: JSON.stringify({ error: message }),
    };
};
