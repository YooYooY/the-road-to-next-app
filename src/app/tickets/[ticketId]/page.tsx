import { initialTickets } from "@/data";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = ({ params }: TicketPageProps) => {
  
  const ticket = initialTickets.find((ticket) => {
    return ticket.id === params.ticketId;
  });
  
  if(!ticket) {
    return <h2 className="text-lg">Ticket not found</h2>;
  }
  
  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  )
};

export default TicketPage;
