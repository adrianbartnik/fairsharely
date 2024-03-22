import { useState } from 'react';

function BudgetEntry() {
  const [participants, setParticipants] = useState([]);

  return (
    <form>
      <label>Who participated?
        <input
          type="text" 
          value="test"
        />
      </label>
    </form>
  )
}

export default BudgetEntry;