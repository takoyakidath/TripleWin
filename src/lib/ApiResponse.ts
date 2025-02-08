'use server';

export async function ApiResponse(data: any, status: number = 200): Promise<Response> {
    return new Response(
        JSON.stringify(data),
        {
            status,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}