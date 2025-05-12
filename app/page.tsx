import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import Ticket from "./components/ticket";



export default function Home() {
  return (
    <main><h1>hello world</h1>
      <Link href="/add-concert" className={buttonVariants({ variant: "outline" })}>
        Add a concert
      </Link>
    </main>
  );
}
