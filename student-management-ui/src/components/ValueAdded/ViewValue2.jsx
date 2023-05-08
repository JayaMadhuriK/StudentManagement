import ValueAddedCommon from './ValueAddedCommon'
import ViewValue from './ViewValue'

const ValueAddedYr2 = () =>{
    const url = 'http://localhost:4000/valueaddedYr2';
    const url1 ='/valueaddyr2';
    const url2='http://localhost:4000/download/download16';
    return (
      <>
      <ValueAddedCommon url = {url}/>
        <ViewValue url1 = {url1} />
        <ViewValue url2 = {url2} />
      </>
    )
}

export default ValueAddedYr2;