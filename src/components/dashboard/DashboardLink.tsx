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
      className={` border-2 border-b-0 rounded-t-md ${
        currentView === id ? "border-red-600" : "border-blue-600"
      } `}
    >
      {children}
    </button>
  );
}

export default DashboardLink;
