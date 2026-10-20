import WelcomeSection from "../../components/home/WelcomeSection";
import ServicesSection from "../../components/home/ServicesSection";
import AiAssistantCard from "../../components/home/AiAssistantCard";
import QuickOrderCard from "../../components/home/QuickOrderCard";
import LastOrderCard from "../../components/home/LastOrderCard";

export default function Home() {
  return (
    <div className="bg-background py-8">
      <div className="container grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          <WelcomeSection />
          <ServicesSection />
        </div>

        <aside className="flex flex-col gap-6">
          <AiAssistantCard />
          <QuickOrderCard />
          <LastOrderCard />
        </aside>
      </div>
    </div>
  );
}
