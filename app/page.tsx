import Hero from "@/components/home/Hero";
import Problem from "@/components/home/Problem";
import Exploded from "@/components/home/Exploded";
import Drawings from "@/components/home/Drawings";
import Haptics from "@/components/home/Haptics";
import Process from "@/components/home/Process";
import Requirements from "@/components/home/Requirements";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Exploded />
      <Drawings />
      <Haptics />
      <Process />
      <Requirements />
    </>
  );
}
