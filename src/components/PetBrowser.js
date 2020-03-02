import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {
    console.log("pets", this.props.pets)
    return <div className="ui cards">PET COMPONENT SHOULD GO HERE</div>
  }
}

export default PetBrowser
