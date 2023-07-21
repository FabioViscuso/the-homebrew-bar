import { ReactNode } from "react";

type ButtonProps = {
  id: string;
  currentView: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

export function DashboardLink({
  children,
  id,
  currentView,
  onClick,
}: ButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`text-4xl neon-button-red ${
        currentView === id && "[--neon-color:#ff0000] color-[#fff] "
      } `}
    >
      {children}
    </button>
  );
}

export default DashboardLink;
