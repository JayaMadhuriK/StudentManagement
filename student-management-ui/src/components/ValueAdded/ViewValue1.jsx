import ValueAddedCommon from './ValueAddedCommon'
import ViewValue from './ViewValue'

const ValueAddedYr1 = () =>{
    const url = 'http://localhost:4000/valueaddedYr1';
    const url1 ='/valueaddyr1';
    const url2='http://localhost:4000/download/download15';
    return (
      <>    
        <ValueAddedCommon url = {url}/>
        <ViewValue url1 = {url1} />
        <ViewValue url2 = {url2} />
      </>
    )
}

export default ValueAddedYr1;