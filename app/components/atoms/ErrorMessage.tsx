interface IErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-md">
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
    </div>
  );
};
