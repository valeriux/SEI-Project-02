import React from 'react'
import axios from 'axios'
import Loading from './Loading'

class DogCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dog: []
    }

  }

  componentDidMount(){
    const dog = {}
    axios.get('https://api.thedogapi.com/v1/images/search', {
      params: {
        breed_id: this.props.id
      }
    })
      .then(res => {
        if(!res.data[0]) dog.image = null
        else dog.image = res.data[0].url
        this.setState({ dog })
      })

  }


  render() {
    if(!this.state.dog) return <Loading />


    return(


      <div className="card">
        <div className="card-image">
          <figure className="image is-5by4" >
            <img src={this.state.dog.image? this.state.dog.image : 'media/no_image_available2.gif'}
              alt={this.props.name} />
          </figure>


          <div id="subtitle_is5" className="subtitle is-size-4">{this.props.name}</div>
        </div>
      </div>

    )
  }
}

export default DogCard
