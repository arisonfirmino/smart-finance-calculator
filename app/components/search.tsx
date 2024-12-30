import { Input } from "@/app/components/ui/input";

interface SearchProps {
  search: string;
  onSearch: (value: string) => void;
}

const Search = ({ search, onSearch }: SearchProps) => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Input
        type="search"
        placeholder="Pesquisar"
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      />
    </form>
  );
};

export default Search;
