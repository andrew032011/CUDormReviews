import { Button, Box} from '@mui/material';
import { DormMap, DormArray, ReviewWithID, Dorm, Filter } from './App'
import styles from './App.module.css';

type Props = {
  readonly searchQuery: string;
  readonly handleClick: (t: string) => void;
  searchFilter: Filter
}

const HomePage = ({ searchQuery, handleClick, searchFilter }: Props) => {
  
  return (
    <div className={styles.row}>
    <div className={styles.column}>
    <div className = {styles.dorms}>
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
        ).slice(0,DormArray.length/2).map((data: Dorm) => (
          <Box component="span" sx={{ p: 1}}>
          <Button className={styles.dormButton} variant="contained" onClick={(event) => {
            handleClick(data.name);
          }} >{data.name}</Button>
          </Box>))
        }
    </div>
    </div>
    <div className = {styles.column}>
    <div className = {styles.dorms}>
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
        ).slice(DormArray.length/2, DormArray.length).map((data: Dorm) => (
          <Box component="span" sx={{ p: 1}}>
          <Button className={styles.dormButton} variant="contained" onClick={(event) => {
            handleClick(data.name);
          }} >{data.name}</Button>
          </Box>))
        }
    </div>
    </div>
    </div>
 
  )
}

export default HomePage;