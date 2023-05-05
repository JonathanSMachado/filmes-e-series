export default function Error({
  error,
  children,
}: {
  error: Error;
  children?: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen px-10 flex flex-col justify-center items-center text-sm text-red-500">
      <p className="mb-5 break-all text-2xl">
        Whoops! Encontramos um erro. Por favor, tente novamente mais tarde. 😧
      </p>
      <p>{children}</p>
    </div>
  );
}
