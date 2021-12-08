import { ChangeEventHandler } from 'react';

type Props = {
  readonly searchQuery: string;
  readonly handleFilterTextChange: (t: string) => void;
  hasAC: boolean;
  handleACCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasSingles: boolean;
  handleSinglesCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasDoubles: boolean;
  handleDoublesCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasTriples: boolean;
  handleTriplesCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasQuads: boolean;
  handleQuadsCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasSuites: boolean;
  handleSuitesCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasPods: boolean;
  handlePodsCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasCorridors: boolean;
  handleCorridorsCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasElevators: boolean;
  handleElevatorsCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
  hasDining: boolean;
  handleDiningCheckBoxChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = ({ searchQuery, handleFilterTextChange, 
  hasAC, handleACCheckBoxChange, 
  hasSingles, handleSinglesCheckBoxChange, 
  hasDoubles, handleDoublesCheckBoxChange, 
  hasTriples, handleTriplesCheckBoxChange,
  hasQuads, handleQuadsCheckBoxChange,
  hasSuites, handleSuitesCheckBoxChange,
  hasPods, handlePodsCheckBoxChange,
  hasCorridors, handleCorridorsCheckBoxChange,
  hasElevators, handleElevatorsCheckBoxChange,
  hasDining, handleDiningCheckBoxChange}: Props) => {
  return (
    <div>
    <input
      type="text"
      placeholder="Search for a dorm..."
      value={searchQuery}
      onChange={(event) => handleFilterTextChange(event.target.value)}
    />
    <p>
    <input
      type="checkbox"
      checked={hasAC}
      onChange={handleACCheckBoxChange}
    />
    Has AC
    <input
      type="checkbox"
      checked={hasSingles}
      onChange={handleSinglesCheckBoxChange}
    />
    Singles

    </p>
    <p>
    <input
      type="checkbox"
      checked={hasDoubles}
      onChange={handleDoublesCheckBoxChange}
    />
    Doubles
    <input
      type="checkbox"
      checked={hasTriples}
      onChange={handleTriplesCheckBoxChange}
    />
    Triples
    </p>
    <p>
    <input
      type="checkbox"
      checked={hasQuads}
      onChange={handleQuadsCheckBoxChange}
    />
    Quads
    <input
      type="checkbox"
      checked={hasSuites}
      onChange={handleSuitesCheckBoxChange}
    />
    Suites
    </p>

    <p>
    <input
      type="checkbox"
      checked={hasPods}
      onChange={handlePodsCheckBoxChange}
    />
    Pods
    <input
      type="checkbox"
      checked={hasCorridors}
      onChange={handleCorridorsCheckBoxChange}
    />
    Corridors
    </p>
 
    <p>
    <input
      type="checkbox"
      checked={hasElevators}
      onChange={handleElevatorsCheckBoxChange}
    />
    Elevators
    <input
      type="checkbox"
      checked={hasDining}
      onChange={handleDiningCheckBoxChange}
    />
    Dining
    </p>

  </div>)
}

export default SearchBar;