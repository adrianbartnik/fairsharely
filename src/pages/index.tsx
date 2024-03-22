import Header from "~/components/index/Header";
import Footer from "~/components/index/Footer";
import Hero from "~/components/index/Hero";
import Budget from "~/components/index/Budget";
import { api } from "~/utils/api";

function Calculator() {
    const hello = api.post.hello.useQuery({ text: "from tRPC" });
    const all = api.post.getAll.useQuery({ name: "bla" });

    return (
        <div className="h-screen bg-gray-800">
            <div className="App">

                <Header />

                <p className="text-2xl text-white">
                    {hello.data ? hello.data.greeting : "Loading tRPC query..."}
                </p>

                <p>
                    {all.data ? all.data[0]?.name : "Loading all occasions..."}
                </p>

                <Hero />

                <Budget />

                <Footer />
            </div>
        </div>
    );
}

export default Calculator;