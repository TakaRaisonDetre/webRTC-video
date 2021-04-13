import React , {Component} from 'react'


class App extends Component {
  constructor(props){
    super(props)
    this.localVideoref = React.createRef()

  }

  

  render(){
  
  const constraints = {video: true}
  const success = (stream)=>{
    this.localVideoref.current.srcObject = stream
  }
  const failure = (e) =>{
    console.log('getUserMedia Error', e)
  }
   // deprecated 
  //navigator.getUserMedia(constraints, success, failure)
   navigator.mediaDevices.getUserMedia(constraints)
    .then(success).catch(failure) 

  // (async()=>{
  //   const stream = await navigator.mediaDevices.getUserMedia(constraints)
  //    success(stream)
  // })().catch(failure)


    return (
      <div>
        <video ref={this.localVideoref} autoPlay></video>
      </div>
    );
  }
  
}

export default App;
