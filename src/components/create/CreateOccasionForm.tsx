import { useState } from "react";

interface FormElements extends HTMLFormControlsCollection {
  newParticipantName: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function CreateOccasionForm() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [highlightedCategory, setHighlightedCategory] = useState<string>("");

  const categories = [
    "Vacation 🏝️",
    "Birthday 🎂",
    "Weekend Trip ✈️",
    "Event 🎤",
    "Other 💬",
  ];

  const handleCategoryClick = (participant: string) => {
    setHighlightedCategory(participant);
  };

  function addNewParticipant(newParticipant: string) {
    setParticipants([...participants, newParticipant]);
  }

  function handleSubmit(e: React.FormEvent<YourFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const newParticipantName =
      e.currentTarget.elements.newParticipantName.value;

    if (!newParticipantName || participants.includes(newParticipantName)) {
      return;
    }

    e.currentTarget.reset();
    addNewParticipant(newParticipantName);
  }

  const currencyLabels = [
    <option key="0" value="" disabled hidden>
      Choose here
    </option>,
  ];
  const currencies = ["Euro", "Dollar"];

  for (let i = 0; i < currencies.length; i++) {
    currencyLabels.push(
      <option key={i + 1} value={currencies[i]}>
        {currencies[i]}
      </option>,
    );
  }

  function removeParticipant(index: number) {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label
        htmlFor="name"
        className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Occasion Name
      </label>
      <input
        type="text"
        id="name"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Weekend Trip"
      />

      <label
        htmlFor="description"
        className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Description
      </label>
      <input
        type="text"
        id="description"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Describe your occasion"
      />

      <label
        htmlFor="currency"
        className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Currency
      </label>
      <select
        id="currency"
        defaultValue=""
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {currencyLabels}
      </select>

      <label
        htmlFor="category"
        className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Occasion Category
      </label>
      <ul className="flex flex-wrap">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`me-2 cursor-default rounded-full bg-blue-100 px-2.5 py-0.5 text-base font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100 ${
              highlightedCategory === category
                ? "dark:bg-blue-500 dark:text-white"
                : "dark:bg-gray-200 dark:text-gray-800"
            }`}
          >
            {category}
          </li>
        ))}
      </ul>

      <div className="mb-4 flex items-end ">
        <div className="w-3/4">
          <label
            htmlFor="newParticipantName"
            className="mb-2 mt-6 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Participant
          </label>
          <input
            type="text"
            id="newParticipantName"
            className=" block w-11/12 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="John"
          />
        </div>
        <div className="w-1/4">
          <button
            type="submit"
            className="mt-4 block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Participant
          </button>
        </div>
      </div>

      <div className="mx-2 leading-9">
        {participants.map((participant, index) => (
          <span
            key={index}
            className="me-2 inline-flex cursor-default items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-base font-medium text-blue-800 dark:bg-gray-200 dark:text-gray-800"
          >
            {participant}
            <button
              className="ml-2 content-center text-red-500"
              onClick={() => removeParticipant(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>

      <button
        type="submit"
        className="mt-12 block w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create Occasion
      </button>
    </form>
  );
}
