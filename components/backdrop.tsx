type BackdropProps = {
  children: React.ReactNode;
};

const Backdrop = ({ children }: BackdropProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center border-primary-700 backdrop-blur-lg">
      {children}
    </div>
  );
};

export default Backdrop;
