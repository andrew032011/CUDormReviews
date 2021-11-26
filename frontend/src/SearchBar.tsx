type Props = {
  readonly searchQuery: string;
  readonly handleFilterTextChange: (t: string) => void;
}

const SearchBar = ({ searchQuery, handleFilterTextChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search for a dorm..."
      value={searchQuery}
      onChange={(event) => handleFilterTextChange(event.target.value)}
    />)
}

export default SearchBar;