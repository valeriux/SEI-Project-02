import React from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import DogCard from './DogCard'
import SearchDog from './SearchDog'
import axios from 'axios'

class DogIndex extends React.Component {

  constructor() {
    super()

    this.state = {
      dogs: null
    }

    this.filterDogs = this.filterDogs.bind(this)
  }

  filterDogs(){

    return this.state.dogs.filter(dog => dog.image !== false)
  }
  componentDidMount(){
    axios('https://api.thedogapi.com/v1/breeds')
      .then(res => this.setState({ dogs: res.data }))
  }


  render() {
    console.log('hello')
    if(!this.state.dogs) return <Loading />
    return (
      <section className="section" id="dog_section">
        <div className="container">
          <SearchDog dogs={this.state.dog}/>
          <br />
          <br />
        </div>

        <div className="columns is-multiline">
          {this.state.dogs.map(dog =>
            <div key={dog.id} className='column is-one-fifth-desktop is-one-third-tablet'>

              <Link to={`dogs/${dog.id}`}>
                <DogCard
                  {...dog}
                />
              </Link>
            </div>
          )}
        </div>
      </section>
    )
  }
}
export default DogIndex
