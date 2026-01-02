import { ButtonProps } from "@/lib/types";

export default function Button({ onClick, children, styles }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg bg-black px-4 py-2 text-xl text-white duration-50 hover:animate-none ${styles}`}
    >
      {children}
    </button>
  );
}
