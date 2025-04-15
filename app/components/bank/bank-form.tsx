import banks from "@/banks.json";

import BankPicker from "@/app/components/bank/bank-picker";
import { Input } from "@/app/components/ui/input";
import SubmitButton from "@/app/components/submit-button";

const BankForm = () => {
  return (
    <form className="flex flex-col gap-5 px-5">
      <BankPicker banks={banks} />
      <Input placeholder="R$ 0,00" />
      <SubmitButton isLoading={false} />
    </form>
  );
};

export default BankForm;
