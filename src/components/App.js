import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = ({target:{value}}) => {
    this.setState({filters:{...this.state.filters, type:value}})
  }

  fetchPets = event =>{
    if(this.state.filters.type !== 'all'){
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(pets => this.setState({ pets }))

    }else{
      fetch('/api/pets')
      .then(res => res.json())
      .then(pets => this.setState({ pets }))
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPets={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
