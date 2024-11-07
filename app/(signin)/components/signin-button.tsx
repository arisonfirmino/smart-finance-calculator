"use client";

interface SignInButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
}

const SignInButton = ({ children, handleClick }: SignInButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center gap-2.5 rounded-xl border border-solid border-gray-400 p-2.5 active:border-border active:text-border"
    >
      {children}
    </button>
  );
};

export default SignInButton;
