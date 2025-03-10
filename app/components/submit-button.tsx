import { Button } from "@/app/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const SubmitButton = ({ children, isLoading }: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} className="w-full">
      {isLoading ? "Carregando" : children}
    </Button>
  );
};

export default SubmitButton;
