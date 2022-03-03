export default function Error({
  error,
  children,
}: {
  error: Error;
  children?: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen px-10 flex flex-col justify-center text-sm text-red-500">
      <p className="mb-5 break-all">{error.message}</p>
      <pre className="whitespace-pre-wrap break-all">{error.stack}</pre>

      <p>{children}</p>
    </div>
  );
}
