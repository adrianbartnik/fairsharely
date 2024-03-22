interface FormElements extends HTMLFormControlsCollection {
  newParticipantName: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

interface AddParticipantProps {
  newParticipantAdded: (name: string) => void
}

export default function AddParticipant({ newParticipantAdded: addParticipant }: AddParticipantProps) {
  function handleSubmit(e: React.FormEvent<YourFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const newParticipantName = e.currentTarget.elements.newParticipantName.value

    console.log(`Adding new user: ${newParticipantName}`)

    addParticipant(newParticipantName)
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Add new user:

        <div>
          <label htmlFor="newParticipantName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
          <input type="text" id="newParticipantName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
        </div>
      </label>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  );
}
