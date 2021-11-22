import { DormMap, DormArray, ReviewWithID, Dorm } from './App'

/* TODO:
- Add the checkboxes so, in addition to the search query, the dorms can be filtered by certain properties
*/

type Props = {
  readonly searchQuery: string;
  readonly handleClick: (t: string) => void;
}

const HomePage = ({ searchQuery, handleClick }: Props) => {

  return (
    <div>
      <div>
        {DormArray.filter(x => x.name.toLowerCase().includes(searchQuery.toLowerCase())).map((data: Dorm) => (
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