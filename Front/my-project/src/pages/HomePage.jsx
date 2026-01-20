import Hero from "../components/Hero";
import Menu from "./Landing_Page/Menu";
import Layer from "./Landing_Page/Layer";
import Layer2 from "./Landing_Page/layer2";
import Testimonials from "../components/Testimonials";

function HomePage() {
  return (
    <div>
      <Hero />
      <Menu />
      <Layer />
      <Layer2 />
      <Testimonials />
    </div>
  );
}

export default HomePage;
