import NewTransaction from "@/app/components/entries/new-transaction";
import NewBank from "@/app/components/entries/new-bank";

import { User } from "@/app/types";

const EntriesPanel = ({ user }: { user: User }) => {
  return (
    <div className="flex h-full flex-col items-center justify-between md:h-fit md:flex-row md:justify-normal md:gap-2.5">
      {["income", "expense"].map((type) => (
        <NewTransaction key={type} type={type} user={user} />
      ))}
      <NewBank />
    </div>
  );
};

export default EntriesPanel;
