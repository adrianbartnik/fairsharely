interface FormElements extends HTMLFormControlsCollection {
  debitor: HTMLSelectElement
  creditor: HTMLSelectElement
  amount: HTMLInputElement
}

interface BudgetEntryFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

interface BudgetEntryProps {
  participants: string[]
  transactionAdded: (creditor: string, debitor: string, amount: number) => void
}

function BudgetEntry({ participants, transactionAdded }: BudgetEntryProps) {
  const selectLabels = [<option key="0" value="" disabled hidden>Choose here</option>];

  for (let i = 0; i < participants.length; i++) {
    selectLabels.push(<option key={i+1} value={participants[i]}>{participants[i]}</option>);
  }

  function handleSubmit(e: React.FormEvent<BudgetEntryFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const debitor = e.currentTarget.elements.debitor.value
    const creditor = e.currentTarget.elements.creditor.value
    const amount = Number(e.currentTarget.elements.amount.value)

    console.log(`Adding new transactions: ${debitor} ${creditor} ${amount}`)

    transactionAdded(debitor, creditor, amount)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Who paid?
        <select id="creditor" defaultValue={""}>
          {selectLabels}
        </select>
      </label>
      <label>For whom?
        <select id="debitor" defaultValue={""}>
          {selectLabels}
        </select>
      </label>
      <label>What amount?
        <input id="amount"
          type="number"
        />
      </label>
    </form>
  )
}

export default BudgetEntry;