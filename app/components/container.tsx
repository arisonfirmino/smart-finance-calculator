const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-muted flex flex-col overflow-hidden rounded-t-3xl md:max-w-96 md:min-w-96 md:rounded-none">
      {children}
    </section>
  );
};

export default Container;
