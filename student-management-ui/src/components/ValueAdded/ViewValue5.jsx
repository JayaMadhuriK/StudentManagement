import ValueAddedCommon from './ValueAddedCommon'
import ViewValue from './ViewValue'

const ValueAddedYr5 = () =>{
    const url = 'http://localhost:4000/valueaddedYr5';
    const url1 ='/valueaddyr5';
    const url2='http://localhost:4000/download/download19';
    return (
      <>
      <ValueAddedCommon url = {url}/>
      <ViewValue url1 = {url1} />
      <ViewValue url2 = {url2} />
      </>
    )
}

export default ValueAddedYr5;