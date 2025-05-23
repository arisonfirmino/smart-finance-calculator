import { Search02Icon } from "hugeicons-react";

interface SearchProps {
  onChange: (value: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
  return (
    <div className="border-border/30 dark:border-border/10 flex h-10 w-full items-center gap-2 rounded-xl border px-3 py-2">
      <Search02Icon size={16} className="text-foreground/50 min-w-4" />
      <input
        type="search"
        placeholder="Pesquisar"
        onChange={(e) => onChange(e.target.value)}
        className="placeholder:text-foreground/50 w-full text-base outline-none"
      />
    </div>
  );
};

export default Search;
