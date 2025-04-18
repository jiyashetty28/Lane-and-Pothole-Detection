
import { Button } from "./ui/button";
import { Play } from "lucide-react";

const Demo = () => {
  return (
    <section id="demo" className="py-20 bg-gradient-to-b from-neocruze-dark-gray to-neocruze-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See NeoCruze in Action</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience how our AI technology detects lanes and potholes in real-time.
          </p>
        </div>

        <div className="bg-neocruze-dark-gray rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="aspect-w-16 aspect-h-9 relative">
            <div className="w-full h-96 bg-gradient-to-r from-black to-neocruze-dark-gray flex items-center justify-center">
              <div className="text-center">
                <Button className="rounded-full w-20 h-20 flex items-center justify-center bg-neocruze-blue hover:bg-neocruze-light-blue transition-colors">
                  <Play size={32} fill="white" />
                </Button>
                <p className="mt-4 text-white font-medium">Watch Demo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to experience the future of road safety?</h3>
            <p className="text-gray-300 mb-6">
              Take the first step towards safer driving with NeoCruze's AI-powered lane and pothole detection.
            </p>
          </div>
          <div className="md:w-1/3">
            <Button className="btn-primary text-lg w-full">Try NeoCruze Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
