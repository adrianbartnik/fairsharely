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
        <input
          id="newParticipantName"
          type="text"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
