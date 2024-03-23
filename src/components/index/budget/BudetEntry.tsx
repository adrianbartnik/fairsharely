interface FormElements extends HTMLFormControlsCollection {
  debitor: HTMLSelectElement;
  creditor: HTMLSelectElement;
  amount: HTMLInputElement;
}

interface BudgetEntryFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface BudgetEntryProps {
  participants: string[];
  transactionAdded: (creditor: string, debitor: string, amount: number) => void;
}

function BudgetEntry({ participants, transactionAdded }: BudgetEntryProps) {
  const selectLabels = [
    <option key="0" value="" disabled hidden>
      Choose here
    </option>,
  ];

  for (let i = 0; i < participants.length; i++) {
    selectLabels.push(
      <option key={i + 1} value={participants[i]}>
        {participants[i]}
      </option>,
    );
  }

  function handleSubmit(e: React.FormEvent<BudgetEntryFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const debitor = e.currentTarget.elements.debitor.value;
    const creditor = e.currentTarget.elements.creditor.value;
    const amount = Number(e.currentTarget.elements.amount.value);

    console.log(`Adding new transactions: ${debitor} ${creditor} ${amount}`);

    transactionAdded(debitor, creditor, amount);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="creditor"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Who paid?
      </label>
      <select
        id="creditor"
        defaultValue=""
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {selectLabels}
      </select>

      <label
        htmlFor="debitor"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        For whom?
      </label>
      <select
        id="debitor"
        defaultValue=""
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {selectLabels}
      </select>

      <label
        htmlFor="amount"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Select a number:
      </label>
      <input
        type="number"
        id="amount"
        aria-describedby="helper-text-explanation"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="90210"
        required
      />
    </form>
  );
}

export default BudgetEntry;
