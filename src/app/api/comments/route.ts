import { getComments } from "@/features/comment/queries/get-comments";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const {searchParams} =new URL(request.url)
  const ticketId = searchParams.get('ticketId');
  
  if (!ticketId) return Response.json([]);
  
  const comments = await getComments(ticketId)
  return Response.json(comments)
}
