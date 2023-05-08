import ValueAddedCommon from './ValueAddedCommon'
import ViewValue from './ViewValue'

const ValueAddedYr3 = () =>{
    const url = 'http://localhost:4000/valueaddedYr3';
    const url1 ='/valueaddyr3';
    const url2='http://localhost:4000/download/download17';
    return (
      <>
        <ValueAddedCommon url = {url}/>
        <ViewValue url1 = {url1} />
        <ViewValue url2 = {url2} />
      </>
    )
}

export default ValueAddedYr3;