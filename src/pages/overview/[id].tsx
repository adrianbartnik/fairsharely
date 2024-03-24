import Header from "~/components/index/Header";
import Footer from "~/components/index/Footer";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import { type JSX } from "react";

function Overview() {
  const router = useRouter();

  console.log("Creating Overview Page for: ", router.query.id, router);

  const occasion = api.post.getById.useQuery({ id: Number(router.query.id) });

  async function handleAddNewExpenseButton() {
    await router.push(`/overview/${String(router.query.id)}/addExpense`); // TODO - Add the correct path
  }

  if (occasion.isSuccess) {
    console.log("Occasion: ", occasion.data);
  }

  const expensesList: JSX.Element[] = [];

  if (occasion.data) {
    const tmpParticipants = occasion.data.participants;

    occasion.data.expenses.forEach((expense) => {
      const tmp = expense.participantShare.map((participant) => {
        return <p key={participant.id}>{tmpParticipants.find((xxx) => xxx.id === participant.participantId)?.name}</p>;
      });

      expensesList.push(
        <div key={expense.id} className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{expense.title}</h3>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{expense.amount}</p>
          {tmp}
        </div>,
      );
    });
  }

  return (
    <div className="h-screen bg-gray-800">
      <div className="App">
        <Header />
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6 lg:py-16">
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {occasion.isSuccess && occasion.data?.name}
              </h2>
              <h3 className="mb-4 text-xl text-gray-900 dark:text-white">
                {occasion.isSuccess && occasion.data?.description},{occasion.isSuccess && occasion.data?.currency},
                {occasion.isSuccess && occasion.data?.category},
                {occasion.isSuccess && occasion.data?.createdAt.toDateString()}
              </h3>

              <div className="mb-4 flex items-end ">
                <div className="w-3/4">
                  <label
                    htmlFor="newExpense"
                    className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add new Expense
                  </label>
                </div>
                <div className="w-1/4">
                  <button
                    type="button"
                    onClick={handleAddNewExpenseButton}
                    className="mt-4 block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add new Expense
                  </button>
                </div>
              </div>

              <div className="mb-4 flex items-end ">{expensesList}</div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Image
                width={200}
                height={200}
                className="w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                alt="office content 1"
              />
              <Image
                width={200}
                height={200}
                className="mt-4 w-full rounded-lg lg:mt-10"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                alt="office content 2"
              />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Overview;
