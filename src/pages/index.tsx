import Header from "~/components/index/Header";
import Footer from "~/components/index/Footer";
import Hero from "~/components/index/Hero";
import Content from "~/components/index/Content";

function Calculator() {
  return (
    <div className="h-screen bg-gray-800">
      <div className="App">
        <Header />

        <Hero />

        <Content />

        <Footer />
      </div>
    </div>
  );
}

export default Calculator;
