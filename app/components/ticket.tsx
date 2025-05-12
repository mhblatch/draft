
import Image from "next/image";
import { Concert } from "../types.ts/concert";

interface TicketProps {
  concert: Concert
}


const Ticket = ({ concert }: TicketProps) => {
  return (
    <div className="w-[330px] h-[500px] bg-[#CAC4D0] overflow-hidden">
        {concert.image ? (
        <div className="relative h-55 w-full">
          <Image
            src={concert.image || "/placeholder.svg"}
            alt={`${concert.artist} at ${concert.venue || "unknown venue"}`}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-muted h-64 w-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">No image added</p>
            <p className="text-xs mt-1">You can go back to add one</p>
          </div>
        </div>
      )}
        <h3 className="text-center mt-4 text-sm">{concert.artist}</h3>
        <h2 className="text-center text-lg font-bold">{concert.event}</h2>
        <p className="text-center text-sm">{concert.venue}</p>
    </div>
  );
};

export default Ticket;
