import "./spinner.styles.css";

interface Props {
  showLoadingText?: boolean;
  loadingText?: string;
}

const Spinner = ({ showLoadingText = false, loadingText="Loading" }: Props) => {
  return (
    <div className="flex justify-center h-full w-full relative">
      <div className="border-4 border-t-0 border-l-3 aspect-square border-r-3 border-b-0 border-red-500 rounded-full h-full w-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {showLoadingText && (
          <span className="text-md">{loadingText}</span>
        )}
      </div>
    </div>
  );
};

export default Spinner;
