import { useState } from "react";
import AddParticipant from "./budget/AddParticipant";
import BudgetEntry from "./budget/BudetEntry";
import Image from 'next/image'
import { DebitCalculator, type Transaction } from "~/domain/DebitCalculator";


export default function Budget() {
  const [participants, setParticipants] = useState<string[]>(["Horst", "Dieter"]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function addNewParticipant(newParticipant: string) {
      console.log(`New participant received ${newParticipant}`)

      setParticipants([
          ...participants,
          newParticipant
      ]);
  }

  function addNewTransaction(creditor: string, debitor: string, amount: number) {
      console.log(`New transaction received ${creditor}  ${debitor}  ${amount}`)

      const newTransaction: Transaction = {
          creditor: creditor,
          debitor: debitor,
          amount: amount
      }

      setTransactions([
          ...transactions,
          newTransaction
      ]);
  }

  const repayments = new DebitCalculator(participants, transactions).calculate() ?? [];
  console.log("Repayments: ", repayments)

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We did not reinvent the wheel</h2>
          <p className="mb-4">Current Participants: {participants.join(", ")}</p>


          <div className="m-10">
            <AddParticipant newParticipantAdded={addNewParticipant} />
          </div>

          <div className="m-10">
            <BudgetEntry participants={participants} transactionAdded={addNewTransaction} />
          </div>

          <ul>
            {transactions.map((transaction, index) => (<li key={index}>{transaction.debitor} owes {transaction.amount} to {transaction.creditor}</li>))}
          </ul>

          <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">Final Repayments</h2>

          <ol>
            {repayments.map((repayment, index) => (<li key={index}>{repayment.from} owes {repayment.amount} to {repayment.to}</li>))}
          </ol>

        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Image width={200} height={200} className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
          <Image width={200} height={200} className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
        </div>
      </div>
    </section>
  );
}
