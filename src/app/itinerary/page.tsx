"use client";

import ItineraryHeader from "@/components/itinerary/ItineraryHeader";
import ItinerarySummary from "@/components/itinerary/ItinerarySummary";
import ShareButtons from "@/components/itinerary/ShareButtons";
import CopyTripButton from "@/components/itinerary/CopyTripButton";

const itinerary = {
  title: "Goa Beach Adventure",
  destination: "Goa",
  duration: "5 Days",
  budget: "₹45,000",
  description:
    "Enjoy beaches, nightlife, water sports, and local food.",
};

const ItineraryPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <ItineraryHeader title={itinerary.title} />

        <ItinerarySummary itinerary={itinerary} />

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <CopyTripButton />

          <ShareButtons />

        </div>

      </div>

    </div>
  );
};

export default ItineraryPage;