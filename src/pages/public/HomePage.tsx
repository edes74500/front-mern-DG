import { Contact } from "../../components/home/Contact";
import { Hero } from "../../components/home/Hero";
import { Services } from "../../components/home/Services";

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
