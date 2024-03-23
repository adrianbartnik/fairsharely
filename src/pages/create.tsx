import Header from "~/components/index/Header";
import Footer from "~/components/index/Footer";
import { api } from "~/utils/api";
import CreateOccasion from "~/components/index/CreateOccasion";

function Calculator() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const all = api.post.getAll.useQuery({ name: "bla" });

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
