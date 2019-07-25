import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import Loading from './Loading'
import { withRouter } from 'react-router-dom'


class SearchDog extends React.Component {


  constructor() {
    super()

    this.state = { dogs: [] }

    this.handleChange = this.handleChange.bind(this)
    this.loadDogs = this.loadDogs.bind(this)

  }

  componentDidMount(){
    this.loadDogs()
  }

  loadDogs(){
    axios.get('https://api.thedogapi.com/v1/breeds')
      .then(res => this.setState({ dogs: res.data }))
  }

  handleChange({ value }) {

    axios.get(`https://api.thedogapi.com/v1/breeds/${value}`)
      .then(res => {
        this.props.history.push(`/dogs/${res.data.id}`)

        console.log(res.data.id, 'NEGRA MULA')
      })
  }




  render() {
    if(!this.state.dogs) return <Loading />
    return(
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <Select
              placeholder={'Search for a dog breed'}
              onChange={this.handleChange}

              options={this.state.dogs.map(dog => {
                return {
                  value: dog.id,
                  label: dog.name
                }
              })
              }
            />
          </div>
        </div>

        {this.state.dog &&
          <section className="section" id="section_dog_show">
            <div className="columns">
              <div className="column is-half-desktop is-full-tablet">
                <figure className="image is-4by4">
                  <img src={this.state.dog.image? this.state.dog.image : 'media/no_image_available2.gif'} alt={this.state.dog.name} className="dog-show-image"/>
                </figure>
              </div>
              <div className="column is-two-thirds-desktop">
                <div className="title is-3" id="dog_show_title">{this.state.dog.name}</div>
                <hr id="hr1"/ >


                <div className="column is-full-desktop is-full-tablet" id="dog_show_card">
                  <div><strong>Breed for:</strong> {this.state.dog.bred_for}</div>

                  <br />
                  <div><strong>Temperament:</strong> {this.state.dog.temperament}</div>
                </div>
              </div>
            </div>
          </section>
        }
      </div>
    )
  }
}

export default withRouter(SearchDog)
