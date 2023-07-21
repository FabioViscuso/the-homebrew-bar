import { ReactNode } from "react";

type ButtonProps = {
  id: string;
  isActive: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

export function DashboardLink({
  children,
  id,
  isActive,
  onClick,
}: ButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={` border-2 border-b-0 rounded-t-md ${
        isActive === id ? "border-red-600" : "border-blue-600"
      } `}
    >
      {children}
    </button>
  );
}

export default DashboardLink;
