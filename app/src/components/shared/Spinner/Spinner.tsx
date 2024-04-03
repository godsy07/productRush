import "./spinner.styles.css";

const Spinner = () => {
  return (
    <div className="flex justify-center h-full w-full relative">
      <div className="border-4 border-t-4 border-l-4 aspect-square border-r-0 border-b-0 border-red-500 rounded-full h-full w-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-md">Loading</span>
      </div>
    </div>
  );
};

export default Spinner;
