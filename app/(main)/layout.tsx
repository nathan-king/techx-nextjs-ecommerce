type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <main className="mx-auto max-w-7xl flex justify-center my-5">
      {children}
    </main>
  );
}
