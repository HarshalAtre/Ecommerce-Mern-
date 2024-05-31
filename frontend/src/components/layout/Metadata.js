import React from 'react'
import {Helmet} from 'react-helmet'
function Metadata({title}) {
  return (
    <Helmet>
        <title>{title}</title> 
        
        {/* what ever we give in title will become title of website when visit that page  thats because of helmet*/}

    </Helmet>
  )
}

export default Metadata