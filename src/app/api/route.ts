import { ApiResponse } from "@/lib/ApiResponse";

export async function POST(req: Request): Promise<Response> {
    return ApiResponse({ message: 'Page not found' }, 404);
}