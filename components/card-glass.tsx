type CardGlassProps = {
  title: string;
  infoLabel?: string;
  children: React.ReactNode;
};
const CardGlass = ({ children, title, infoLabel }: CardGlassProps) => {
  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center gap-8 rounded-md border border-primary-700 bg-primary-800/50  pb-4 pt-12"
      }
    >
      {infoLabel && (
        <div className="absolute left-0  top-0 flex h-12 items-center px-4 font-semibold uppercase text-accent">
          {infoLabel}
        </div>
      )}
      {title && <h2 className="text-3xl font-semibold text-primary-200"> {title} </h2>}
      <div className="flex h-full w-full flex-col overflow-auto px-8">{children}</div>
    </div>
  );
};

export default CardGlass;
