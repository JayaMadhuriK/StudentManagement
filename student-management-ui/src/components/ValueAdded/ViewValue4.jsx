import ValueAddedCommon from './ValueAddedCommon'
import ViewValue from './ViewValue'

const ValueAddedYr4 = () =>{
    const url = 'http://localhost:4000/valueaddedYr4';
    const url1 ='/valueaddyr4';
    const url2='http://localhost:4000/download/download18';
    return (
      <>  
      <ValueAddedCommon url = {url}/>
      <ViewValue url1 = {url1} />
      <ViewValue url2 = {url2} />
      </>
    )
}

export default ValueAddedYr4;