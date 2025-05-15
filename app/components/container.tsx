const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-muted relative flex w-full justify-center rounded-t-3xl md:h-screen md:overflow-y-auto md:rounded-t-none">
      <div className="flex w-full flex-col gap-5 md:max-w-2xl md:pt-10 xl:pt-28">
        {children}
      </div>
    </section>
  );
};

export default Container;
