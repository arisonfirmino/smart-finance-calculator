import ThemeSwitch from "@/app/components/menu/theme-switch";
import { Separator } from "@/app/components/ui/separator";

const LateralMenu = () => {
  return (
    <>
      <div className="flex flex-col gap-3 p-5">
        <h4 className="text-foreground/50 text-xs font-medium">Preferências</h4>
        <ThemeSwitch />
      </div>

      <Separator />
    </>
  );
};

export default LateralMenu;
