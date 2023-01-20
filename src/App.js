import React, { Component } from 'react'
import './App.css'
import Navigation from './Components/Navigation/Navigation'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Logo from './Components/Logo/Logo'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import ParticlesComponent from './Components/Config/Particles'
import Register from './Components/Register/Register'
import 'tachyons'
import SignIn from './Components/SignIn/SignIn'

const DEFAULT_STATE = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
}

class App extends Component {
  constructor() {
    super()
    this.state = DEFAULT_STATE
    this.calculateFaceLocation = this.calculateFaceLocation.bind(this)
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    })
  }

  calculateFaceLocation = (response) => {
    const regions = response.outputs[0].data.regions
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    const clarifaiFace = regions.map((item) => {
      const boundaries = item.region_info.bounding_box
      return {
        leftCol: boundaries.left_col * width,
        topRow: boundaries.top_row * height,
        rightCol: width - boundaries.right_col * width,
        bottomRow: height - boundaries.bottom_row * height,
      }
    })
    return clarifaiFace
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }


  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://face-recognition-api-cnwg.onrender.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://face-recognition-api-cnwg.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)

        }
        const boxes = this.calculateFaceLocation(response)
        this.displayFaceBox(boxes)
      })
      .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(() => {
        return { ...DEFAULT_STATE }
      })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, route, boxes } = this.state
    return (
      <div className="App">
        <ParticlesComponent />
        <div className="up">
          <Logo />
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
        </div>
        {route === 'home' ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition
              boxes={boxes}
              imageUrl={this.state.input}
            />
          </div>
        ) : route === 'signin' ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    )
  }
}

export default App
