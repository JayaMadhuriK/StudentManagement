import ValueAddedCommon from './ValueAddedCommon'
import ViewValue from './ViewValue'

const ValueAddedYr1 = () =>{
    const url = 'http://localhost:4000/valueaddedYr1';
    const url1 ='/valueaddyr1';
    return (
      <>    
        <ValueAddedCommon url = {url}/>
        <ViewValue url1 = {url1} />
      </>
    )
}

export default ValueAddedYr1;