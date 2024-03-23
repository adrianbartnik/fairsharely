interface FormElements extends HTMLFormControlsCollection {
  newParticipantName: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface AddParticipantProps {
  newParticipantAdded: (name: string) => void;
}

export default function AddParticipant({ newParticipantAdded: addParticipant }: AddParticipantProps) {
  function handleSubmit(e: React.FormEvent<YourFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const newParticipantName = e.currentTarget.elements.newParticipantName.value;

    console.log(`Adding new user: ${newParticipantName}`);

    addParticipant(newParticipantName);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Add new user:
        <div>
          <label htmlFor="newParticipantName" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            User name
          </label>
          <input
            type="text"
            id="newParticipantName"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="John"
          />
        </div>
      </label>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
