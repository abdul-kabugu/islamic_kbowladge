import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AudioPlayer from "@/components/AudioPlayer";
import DarsaSchedule from "@/components/DarsaSchedule";
import ArticlesSection from "@/components/ArticlesSection";
import VideoSection from "@/components/VideoSection";
import DonationModal from "@/components/DonationModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Header />
      <Hero />
      <AudioPlayer />
      <DarsaSchedule />
      <ArticlesSection />
      <VideoSection />
      <DonationModal />
      <Footer />
    </div>
  );
}
