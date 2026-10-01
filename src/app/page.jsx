import CtaBand from "@/components/home/CtaBand";
import DestinationGrid from "@/components/home/DestinationGrid";
import Hero from "@/components/home/Hero";
import { HotelSlider } from "@/components/home/hotelSec";
import OffersRow from "@/components/home/OffersRow";
import PackageGrid from "@/components/home/PackageGrid";
import PackageSlider from "@/components/home/PackageSlider";
import ServiceTiles from "@/components/home/ServiceTiles";
import StatsRow from "@/components/home/StatsRow";
import Testimonials from "@/components/home/Testimonials";
import WhyUs from "@/components/home/WhyUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsRow />
      <ServiceTiles />
      <OffersRow />
      <HotelSlider />
      <DestinationGrid />
      {/* <PackageGrid /> */}
      <PackageSlider />
      <WhyUs />
      <Testimonials />
      <CtaBand />
    </>
  );
}
