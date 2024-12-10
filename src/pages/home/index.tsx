import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { Services } from "./Services";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <main className="flex-grow">
        <Hero />
        <Services />
        <Contact />
      </main>
    </div>
  );
}
