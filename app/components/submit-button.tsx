import { Button } from "@/app/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      variant="submit"
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? "Carregando" : "Adicionar"}
    </Button>
  );
};

export default SubmitButton;
