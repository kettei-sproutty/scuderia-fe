type CardGlassProps = {
  title: string;
  children: React.ReactNode;
};
const CardGlass = ({ children, title }: CardGlassProps) => {
  return (
    <div
      className={
        "flex h-fit w-full flex-col items-center justify-center gap-8 rounded-sm border border-primary-700 bg-primary-800/50 p-8 backdrop-blur"
      }
    >
      {title && <h2 className="text-3xl font-semibold text-primary-500"> {title} </h2>}
      {children}
    </div>
  );
};

export default CardGlass;
