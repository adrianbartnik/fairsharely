import Header from "~/components/index/Header";
import Footer from "~/components/index/Footer";
import CreateOccasion from "~/components/create/CreateOccasion";

function Calculator() {
  return (
    <div className="h-screen bg-gray-800">
      <div className="App">
        <Header />

        <CreateOccasion />

        <Footer />
      </div>
    </div>
  );
}

export default Calculator;
