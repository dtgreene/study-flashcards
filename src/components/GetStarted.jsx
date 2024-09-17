import { useSnapshot } from 'valtio';
import { state, studyOptions, toShuffled } from '../state';

function handleOptionChange(event) {
  state.studyOption = event.target.value;
}

function handleShuffleChange(event) {
  state.shuffleEnabled = event.target.checked;
}

function handleStartClick() {
  const currentOption = studyOptions.find(
    (option) => option.value === state.studyOption
  );

  if (!currentOption) return;

  const indices = currentOption.data.map((_, index) => index);

  if (state.shuffleEnabled) {
    state.orderIndices = toShuffled(indices);
  } else {
    state.orderIndices = indices;
  }
  state.orderIndex = 0;
  state.flipped = false;
  state.step = 1;

  console.log(state.orderIndices)
}

export const GetStarted = () => {
  const snap = useSnapshot(state);

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-16 h-screen">
      <div className="mb-16">
        <div className="text-4xl mb-4">Study Flashcards</div>
        <div className="flex justify-center gap-4">
          <div className="flex gap-2 justify-center items-center">
            <label>Subject:</label>
            <select
              className="bg-transparent border rounded px-2 py-1 cursor-pointer"
              value={snap.studyOption}
              onChange={handleOptionChange}
            >
              {studyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <label>Shuffle:</label>
            <input
              type="checkbox"
              checked={snap.shuffleEnabled}
              onChange={handleShuffleChange}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          className="bg-sky-400 rounded-full px-4 py-2 text-xl hover:bg-sky-600 transition-colors"
          onClick={handleStartClick}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
