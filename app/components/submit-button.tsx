import { Button } from "@/app/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} className="w-full rounded-sm">
      {isLoading ? "Carregando" : "Adicionar"}
    </Button>
  );
};

export default SubmitButton;
