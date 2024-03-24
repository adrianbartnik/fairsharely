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
      const debitors = expense.participantShare.map((participant) => {
        return <p key={participant.id}>{tmpParticipants.find((xxx) => xxx.id === participant.participantId)?.name}</p>;
      });

      if (expense.id === 10) {
        console.log(expense, debitors, tmpParticipants);
      }

      const creditor = tmpParticipants.find((xxx) => xxx.id === expense.paidByParticipantId)?.name;

      expensesList.push(
        <tr key={expense.id} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
          <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
            {expense.title}
          </th>
          <td className="px-6 py-4">{creditor}</td>
          <td className="px-6 py-4">{debitors}</td>
          <td className="px-6 py-4">{expense.createdAt.toDateString()}</td>
          <td className="px-6 py-4">{expense.amount}</td>
        </tr>,
      );
    });
  }

  return (
    <div className="h-screen bg-gray-800">
      <div className="App">
        <Header />
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto flex max-w-screen-xl items-center gap-16 px-4 py-8  lg:px-6 lg:py-16">
            <div className="w-9/12 font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {occasion.isSuccess && occasion.data?.name}
              </h2>
              <div className="mb-4 flex items-end ">
                <div className="w-3/4">{occasion.isSuccess && occasion.data?.description}</div>
                <div className="w-1/4 italic">{occasion.isSuccess && occasion.data?.createdAt.toDateString()}</div>
              </div>
              <div className="mb-4 flex items-end ">
                <div className="w-3/4">Currency: {occasion.isSuccess && occasion.data?.currency.toLowerCase()}</div>
                <div className="w-1/4">{occasion.isSuccess && occasion.data?.category}</div>
              </div>

              <div className="mb-4 flex">
                <div className="flex-none">
                  <label
                    htmlFor="newExpense"
                    className="mb-2 mt-6 block text-lg  font-medium text-gray-900 dark:text-white"
                  >
                    Current Expenses
                  </label>
                </div>
                <div className="ml-auto">
                  <button
                    type="button"
                    onClick={handleAddNewExpenseButton}
                    className="mt-4 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add new Expense
                  </button>
                </div>
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Paid by
                      </th>
                      <th scope="col" className="px-6 py-3">
                        For
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>{expensesList}</tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 grid w-3/12 grid-cols-2 gap-4">
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
