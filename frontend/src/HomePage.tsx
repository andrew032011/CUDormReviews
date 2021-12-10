import { DormMap, DormArray, ReviewWithID, Dorm, Filter } from './App'

/* TODO:
- Add the checkboxes so, in addition to the search query, the dorms can be filtered by certain properties
*/

type Props = {
  readonly searchQuery: string;
  readonly handleClick: (t: string) => void;
  searchFilter: Filter
}

const HomePage = ({ searchQuery, handleClick, searchFilter }: Props) => {

  return (
    <div>
      <div>
        {DormArray.filter(x => x.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        (!searchFilter.hasAC || x.ac) &&
        (!searchFilter.hasSingles || x.singles) &&
        (!searchFilter.hasDoubles || x.doubles) &&
        (!searchFilter.hasTriples || x.triples) &&
        (!searchFilter.hasQuads || x.quads) &&
        (!searchFilter.hasSuites || x.suites) &&
        (!searchFilter.hasPods || x.pods) &&
        (!searchFilter.hasCorridors || x.corridors) &&
        (!searchFilter.hasElevators || x.elevators) &&
        (!searchFilter.hasDining || x.dining) &&
        (searchFilter.location == "" || searchFilter.location == x.location)
        ).map((data: Dorm) => (
          <input type="button" value={data.name} onClick={(event) => {
            handleClick(data.name);
          }} />))
        }
      </div>

      <div>
        {/*Insert checkboxes here*/}
      </div>
    </div>
  )
}

export default HomePage;