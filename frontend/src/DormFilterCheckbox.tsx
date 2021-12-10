import { ChangeEventHandler } from 'react';

type Props = {
    checkedProperty: string
    onChangeHandler: ChangeEventHandler<HTMLSelectElement>
}

const SearchBar = ({ checkedProperty, }: Props) => {
  return (
    <p>
        
    {/* <input
      type="checkbox"
      checked={hasAC}
      onChange={handleACCheckBoxChange}
    />
    Has AC
    <input
      type="checkbox"
      checked={hasSingles}
      onChange={handleSinglesCheckBoxChange}
    /> */}
    Singles

    </p>)
}

export default SearchBar;