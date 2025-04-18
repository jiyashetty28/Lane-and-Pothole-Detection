
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Technology from "@/components/Technology";
import Demo from "@/components/Demo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-neocruze-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <Technology />
      <Demo />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
