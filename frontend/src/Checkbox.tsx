import { Checkbox, Box } from "@mui/material";
import { ChangeEventHandler } from 'react';
import styles from './App.module.css';
type Props = {
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
    location: string;
    handleLocationChange: ChangeEventHandler<HTMLSelectElement>;
  }

  const Checkboxes = ({ 
    hasAC, handleACCheckBoxChange, 
    hasSingles, handleSinglesCheckBoxChange, 
    hasDoubles, handleDoublesCheckBoxChange, 
    hasTriples, handleTriplesCheckBoxChange,
    hasQuads, handleQuadsCheckBoxChange,
    hasSuites, handleSuitesCheckBoxChange,
    hasPods, handlePodsCheckBoxChange,
    hasCorridors, handleCorridorsCheckBoxChange,
    hasElevators, handleElevatorsCheckBoxChange,
    hasDining, handleDiningCheckBoxChange,
    location, handleLocationChange}: Props) => {
    return (<Box sx={{ p: 2, border: '2px solid gray' }} className= {styles.checkboxes}>
        <div className= {styles.text}>
        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasAC}
          onChange={handleACCheckBoxChange}
        />
        Has AC
        </div>

        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasSingles}
          onChange={handleSinglesCheckBoxChange}
        />
        Singles
        </div>
        
        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasDoubles}
          onChange={handleDoublesCheckBoxChange}
        />
        Doubles
        </div>

        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasTriples}
          onChange={handleTriplesCheckBoxChange}
        />
        Triples
        </div>
        
        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasQuads}
          onChange={handleQuadsCheckBoxChange}
        />
        Quads
        </div>
        
        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasSuites}
          onChange={handleSuitesCheckBoxChange}
        />
        Suites
        </div>

        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasPods}
          onChange={handlePodsCheckBoxChange}
        />
        Pods
        </div>
        
        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasCorridors}
          onChange={handleCorridorsCheckBoxChange}
        />
        Corridors
        </div>
        
        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasElevators}
          onChange={handleElevatorsCheckBoxChange}
        />
        Elevators
        </div>
        
        <div>
        <Checkbox sx={{color: "gray"}}
          checked={hasDining}
          onChange={handleDiningCheckBoxChange}
        />
        Dining
        </div>

        <div>
        <span>{"Campus:\n"}
        <select value = {location} onChange={handleLocationChange}>
            <option value = ""></option>
            <option value = "North Campus">North</option>
            <option value = "South Campus">South</option>
            <option value = "West Campus">West</option>
        </select>
        </span>
        <br></br>
    </div>
        </div>
        </Box>);
    }
export default Checkboxes;