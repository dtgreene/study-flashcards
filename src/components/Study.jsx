import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { state, studyOptions } from '../state';

const codeLanguageExp = /language-(\w+)/;
const syntaxStyle = {
  padding: 16,
  margin: 0,
  borderRadius: 4,
  background: 'rgb(235, 238, 239)',
};

function handleStartClick() {
  state.step = 0;
}

function handleFlipClick() {
  state.flipped = !state.flipped;
}

function handlePrevClick() {
  if (state.orderIndex > 0) {
    state.orderIndex -= 1;
    state.flipped = false;
  }
}

function handleNextClick() {
  if (state.orderIndex < state.orderIndices.length - 1) {
    state.orderIndex += 1;
    state.flipped = false;
  }
}

const BackMarkdown = ({ data }) => (
  <Markdown
    children={data.back}
    remarkPlugins={[remarkGfm]}
    className="w-full flex justify-center"
    components={{
      ul: ({ children, className, node, ...rest }) => {
        return (
          <ul {...rest} className={clsx(className, 'list-disc pl-6')}>
            {children}
          </ul>
        );
      },
      code: ({ children, className, node, ...rest }) => {
        const match = (className || '').match(codeLanguageExp);

        if (match) {
          return (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              customStyle={syntaxStyle}
            />
          );
        }

        return (
          <code {...rest} className={className}>
            {children}
          </code>
        );
      },
    }}
  />
);

// switch (data.back_type) {
//   case 'sql': {
//     return (
//       <ReactCodeMirror
//         extensions={[sql()]}
//         theme={xcodeLight}
//         className="w-full text-"
//         value={data.back}
//         readOnly
//       />
//     );
//   }
//   case 'table': {
//     const headerRow = data.back[0];
//     const rows = data.back.slice(1);

//     return (
//       <table className="table-auto text-left">
//         <thead>
//           <tr className="border-l border-t">
//             {headerRow.map((col) => (
//               <th key={col} className="border-r p-1">
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row) => (
//             <tr key={row} className="border-b border-l first:border-t">
//               {row.map((col) => (
//                 <td key={col} className="border-r p-1">
//                   {col}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   }
//   case 'text': {
//     if (Array.isArray(data.back)) {
//       return (
//         <div className="text-center">
//           {data.back.map((line) => (
//             <div key={line}>{line}</div>
//           ))}
//         </div>
//       );
//     }

//     return <div className="text-center">{data.back}</div>;
//   }
//   default: {
//     if (typeof data.back === 'string') {
//       return <div className="text-center">{data.back}</div>;
//     }

//     return <div>Unknown card data</div>;
//   }
// }

const Flashcard = ({ data, cardNumber, cardTotal, flipped }) => {
  const cardCount = (
    <div className="absolute top-2 left-2 text-xl opacity-50">
      {cardNumber} / {cardTotal}
    </div>
  );

  return (
    <div className={clsx('flash-card', { flipped })}>
      <div className="flash-card-inner">
        <div className="flash-card-front">
          {cardCount}
          <div className="flex justify-center items-center h-full w-full text-2xl">
            {data.front}
          </div>
        </div>
        <div className="flash-card-back">
          {cardCount}
          <div
            className={clsx('flex flex-col h-full w-full', {
              'flash-card-blur': !flipped,
            })}
          >
            <div className="flex-1 flex flex-col justify-center items-center">
              <BackMarkdown data={data} />
            </div>
            {data.back_link && (
              <div className="text-center">
                <a
                  className="text-sky-500"
                  href={data.back_link}
                  target="_blank"
                >
                  Read More
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Study = () => {
  const snap = useSnapshot(state);
  const currentOption = useMemo(
    // Important: Do not try and track non-primitive values
    () => studyOptions.find((option) => option.value === snap.studyOption),
    [snap.studyOption]
  );

  if (!currentOption) {
    state.step = 0;
    console.warn('Could not find current study option');
    return null;
  }

  // Look up the current index
  const cardIndex = snap.orderIndices[snap.orderIndex];
  const currentCard = currentOption.data[cardIndex];

  if (!currentCard) {
    state.step = 0;
    console.warn('Could not find current card');
    return null;
  }

  return (
    <div className="p-4 sm:p-16 h-screen relative">
      <div className="flex justify-center items-center relative mb-16">
        <button
          className="flex gap-2 items-center text-zinc-500 hover:text-white transition-colors rounded-full px-4 py-2 absolute left-0"
          onClick={handleStartClick}
        >
          <ArrowLeft />
          <span>Start Screen</span>
        </button>
        <div className="text-2xl">{currentOption.label}</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-16">
        <div className="flex justify-center relative w-full">
          <Flashcard
            data={currentCard}
            cardNumber={snap.orderIndex + 1}
            cardTotal={snap.orderIndices.length}
            flipped={snap.flipped}
          />
          <div className="absolute left-0 top-[calc(50%-32px)]">
            <button
              className="bg-zinc-900 flex items-center justify-center w-16 h-16 not:disabled:hover:bg-zinc-800 transition-colors rounded-full disabled:opacity-50"
              onClick={handlePrevClick}
              disabled={snap.orderIndex === 0}
            >
              <ArrowLeft width="40px" height="40px" />
            </button>
          </div>
          <div className="absolute right-0 top-[calc(50%-32px)]">
            <button
              className="bg-zinc-900 flex items-center justify-center w-16 h-16 not:disabled:hover:bg-zinc-800 transition-colors rounded-full disabled:opacity-50"
              onClick={handleNextClick}
              disabled={snap.orderIndex === snap.orderIndices.length - 1}
            >
              <ArrowRight width="40px" height="40px" />
            </button>
          </div>
        </div>
        <div>
          <button
            className="bg-sky-400 rounded-full px-4 py-2 hover:bg-sky-600 transition-colors"
            onClick={handleFlipClick}
          >
            Flip Card
          </button>
        </div>
      </div>
    </div>
  );
};
