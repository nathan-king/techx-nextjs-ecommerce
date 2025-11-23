type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <main className="mx-auto flex max-w-7xl justify-center px-6 py-10 lg:py-14">
      {children}
    </main>
  );
}
