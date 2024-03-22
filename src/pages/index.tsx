import Header from "~/components/index/Header";
import Footer from "~/components/index/Footer";
import Hero from "~/components/index/Hero";
import Budget from "~/components/index/Budget";

function Calculator() {
    return (
        <div className="h-screen bg-gray-800">
            <div className="App">
                
                <Header />

                <Hero />

                <Budget />

                <Footer />
            </div>
            <div />
        </div>
    );
}

export default Calculator;