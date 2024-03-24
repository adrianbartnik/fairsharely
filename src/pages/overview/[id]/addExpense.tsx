import Footer from "~/components/index/Footer";
import Header from "~/components/index/Header";
import CreateExpense from "~/components/overview/addExpense/CreateExpense";

export default function CreateExpensePage() {

  return (
    <div className="h-screen bg-gray-800">
      <div className="App">
        <Header />

        <CreateExpense />

        <Footer />
      </div>
    </div>
  );
}
