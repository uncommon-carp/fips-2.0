import { County } from '@fips/shared';

interface ResultsProps {
  results: County[] | null;
}

export default function Results(props: ResultsProps) {
  const { results } = props;
  return (
    <>
      {results !== null && results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="p-4 bg-[#496e6e] border border-[#a1d9d2] rounded"
            >
              <p className="text-white whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-4">No results found.</p>
      )}
    </>
  );
}
