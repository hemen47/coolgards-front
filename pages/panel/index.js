import {useEffect} from "react";


export default function Panel() {
    useEffect(() => {
        console.log('test from panel')
    }, [])

  return (
      <div className='ml-56 max-[600px]:ml-20'>
          ******************************************************************
      </div>
  )
}
