import React from 'react'

// import fetchMock from '../fetch-setup'
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

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = async () => {
    const petType = this.state.filters.type
    const queryParam = (petType === 'all') ? "" : `?type=${petType}`
    this.setState({
      pets: await fetch(`/api/pets${queryParam}`).then(response => response.json())
    })
  }

  onAdoptPet = (id) => {
    const petsCopy = [...this.state.pets]
    petsCopy.forEach( pet => {
      if (pet.id === id) {
        pet.isAdopted = true
      }
    })

    this.setState({ 
      pets: petsCopy 
    })
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
