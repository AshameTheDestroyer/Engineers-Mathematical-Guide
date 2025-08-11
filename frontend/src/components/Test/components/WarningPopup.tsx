import React from 'react';

interface Props {}

function WarningPopup({
  message = 'Are you sure you finished the solving all the questions?',
  setIsShowWarningPopup,
  setIsFinished,
}) {
  function handleYes() {
    setIsShowWarningPopup(false);
    setIsFinished(true);
  }

  return (
    <div className="fixed z-213 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-950 text-white p-10 rounded-md w-150 h-60 flex flex-col justify-between">
      <p>{message}</p>
      <div className="flex flex-row justify-between">
        <button
          className="border p-2 w-20 rounded-md"
          onClick={() => setIsShowWarningPopup(false)}
        >
          No
        </button>
        <button className="border p-2 w-20 rounded-md" onClick={handleYes}>
          Yes
        </button>
      </div>
    </div>
  );
}

export default WarningPopup;
