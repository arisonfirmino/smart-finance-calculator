const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-muted flex flex-col overflow-hidden rounded-t-3xl">
      {children}
    </section>
  );
};

export default Container;
