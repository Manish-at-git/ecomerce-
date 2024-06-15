import React from "react";

export const Close = (props) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.07085 13.0132C1.69147 13.3877 1.08145 13.3877 0.702072 13.0132C0.315785 12.6318 0.315785 12.0082 0.702071 11.6268L5.54584 6.84444L0.702072 2.06206C0.315786 1.68067 0.315785 1.05711 0.702071 0.675715C1.08145 0.301142 1.69147 0.301142 2.07085 0.675715L6.9323 5.47556L11.7938 0.675715C12.1731 0.301142 12.7832 0.301142 13.1625 0.675715C13.5488 1.05711 13.5488 1.68067 13.1625 2.06206L8.31876 6.84444L13.1625 11.6268C13.5488 12.0082 13.5488 12.6318 13.1625 13.0132C12.7832 13.3877 12.1731 13.3877 11.7938 13.0132L6.9323 8.21333L2.07085 13.0132Z"
      fill="black"
    />
  </svg>
);

const Loader = ({
  isLoading = false,
  bgOpacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1,
}) => {
  if (!isLoading) return <></>;

  return (
    <>
      <div
        className="absolute w-full flex justify-center items-center left-0 top-0 z-50 h-full"
        style={{ ["--tw-bg-opacity"]: bgOpacity }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 animate-bounce">
            <div className="w-4 h-4 bg-primary-o-600 rounded-full"></div>
            <div className="w-4 h-4 bg-status-danger-800 rounded-full"></div>
            <div className="w-4 h-4 bg-status-warning-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};
