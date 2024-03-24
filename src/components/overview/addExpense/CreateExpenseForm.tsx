import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import React from "react";
import { api } from "~/utils/api";

interface ReactHTMLFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  currency: HTMLInputElement;
  newParticipantName: HTMLInputElement;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  currency: HTMLInputElement;
  amount: HTMLInputElement;
}

export default function CreateExpenseForm() {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [participants, setParticipants] = useState<{ id: number; name: string }[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const expense = api.post.getById.useQuery({ id: 1 });
  const createExpenseMutation = api.post.createExpense.useMutation();

  const creditorLabels = [
    <option key="0" value="" disabled hidden>
      Choose here
    </option>,
  ];

  const debitors = [
    <div key="all">
      <input
        type="checkbox"
        id="creditors"
        key="all"
        className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
        placeholder="50$"
      />
      <span className="ml-2 font-medium text-white">Everyone</span>
    </div>,
  ];

  console.log(selectedParticipants);

  if (expense.isSuccess && expense.data) {
    const retrievedParticipants = expense.data.participants;

    for (let i = 0; i < retrievedParticipants.length; i++) {
      creditorLabels.push(
        <option key={i + 1} value={retrievedParticipants[i]?.name}>
          {retrievedParticipants[i]?.name}
        </option>,
      );

      function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>, name: string | undefined): void {
        if (e.target.checked) {
          addNewParticipant(name!);
        } else {
          removeParticipant(name!);
        }
      }

      function addNewParticipant(newParticipant: string) {
        setSelectedParticipants([...selectedParticipants, newParticipant]);
      }

      function removeParticipant(index: string) {
        const newParticipants = selectedParticipants.filter((name) => name !== index);
        setSelectedParticipants(newParticipants);
      }

      debitors.push(
        <div key={retrievedParticipants[i]?.name}>
          <input
            type="checkbox"
            id="creditors"
            key={retrievedParticipants[i]?.name + "bla"}
            className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
            placeholder="50$"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, retrievedParticipants[i]?.name)}
          />
          <span className="ml-2 font-medium text-white">{retrievedParticipants[i]?.name}</span>
        </div>,
      );
    }
  }

  const handleSubmit = async (e: React.FormEvent<ReactHTMLFormElement>) => {
    e.preventDefault();
    if (!name || amount <= 0) {
      console.error("Invalid expense details");
      return;
    }
    createExpenseMutation.mutate({
      title: name,
      amount,
      occasionId: 1,
      participantShares: selectedParticipants.map((debitor) => {
        const debitorName = expense.data?.participants.find((participant) => participant.name === debitor);

        return {
          participantId: debitorName?.id ?? 0,
          amount: amount / selectedParticipants.length,
        };
      }),
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor="creditor" className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white">
        Who paid?
      </label>
      <select
        id="creditor"
        defaultValue=""
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {creditorLabels}
      </select>

      <label htmlFor="name" className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white">
        Expense Name
      </label>
      <input
        type="text"
        id="name"
        defaultValue={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        required
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Dinner"
      />

      <label htmlFor="amount" className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white">
        Amount
      </label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
        required
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="50$"
      />

      <label htmlFor="creditors" className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white">
        For whom?
      </label>
      {debitors}

      <button
        type="submit"
        className="mt-12 block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Expense
      </button>
    </form>
  );
}
