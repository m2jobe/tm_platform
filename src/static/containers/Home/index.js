import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/home';
import './style.scss';
import reactLogo from './images/react-logo.png';
import tourLogo from './images/tour-logo.png';
import rockConcert from './images/rock-concert.jpg';
import rockcert from './images/rockcert.jpg';
import creatorDiv from './images/creatordiv.png';
import ReactTooltip from 'react-tooltip'
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width:'80%',
  }
};

const customStyles2 = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

class HomeView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
      //  dispatch: PropTypes.func.isRequired,
        homeVideos: PropTypes.array,
        livestreamRequested: PropTypes.string

    };

    constructor() {
      super();


      this.state = {
        modalIsOpen: false,
        modalIsOpen2: false,
        modalIsOpen3: false,
        currentURL: ""
      };

      this.playVideo = this.playVideo.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.afterOpenModal2 = this.afterOpenModal2.bind(this);
      this.closeModal2 = this.closeModal2.bind(this);
      this.openModal2 = this.openModal2.bind(this);
      this.afterOpenModal3 = this.afterOpenModal3.bind(this);
      this.closeModal3 = this.closeModal3.bind(this);
      this.openModal3 = this.openModal3.bind(this);
      this.requestLivestream = this.requestLivestream.bind(this);

    }

    playVideo(streamURL) {
      this.setState({modalIsOpen: true, currentURL: streamURL});
    }

    openModal2() {
      this.setState({modalIsOpen2: true});
    }

    openModal3() {
      this.setState({modalIsOpen3: true});
    }


    afterOpenModal() {
      // references are now sync'd and can be accessed.
    }

    closeModal2() {
      this.setState({modalIsOpen2: false});
    }

    afterOpenModal2() {
      // references are now sync'd and can be accessed.
    }

    closeModal3() {
      this.setState({modalIsOpen3: false});
    }

    afterOpenModal3() {
      // references are now sync'd and can be accessed.
    }


    closeModal() {
      this.setState({modalIsOpen: false});
    }



    static defaultProps = {
        statusText: '',
        userName: '',
        homeVideos: null
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    componentWillMount() {
      //fetch home videos
      //this.props.actions.fetchHomeVideos();
    }

    componentDidMount() {
      this.props.actions.fetchHomeVideos();
    }

    componentDidUpdate(prevProps, prevState){
      if(prevProps.livestreamRequested != this.props.livestreamRequested) {
        alert("Request sent.");
        window.location.reload();
      }
    }

    requestLivestream() {
      var artistName = $('#artistName').val();
      var eventDate = $('#eventDate').val();
      var eventLocation = $('#eventLocation').val();
      var userEmail = $('#userEmail').val();

      if(artistName !== "" && eventDate !== "" && eventLocation !== "" && userEmail !== "") {
        this.props.actions.requestLivestream(artistName, userEmail, eventDate, eventLocation);
      } else {
        alert("Please don't leave any fields empty!");
      }

    }
    render() {
        var myBigGreenDialog = {
          backgroundColor: '#00897B',
          color: '#ffffff',
          width: '70%',
          height: '600px',
          marginTop: '-300px',
          marginLeft: '-35%',
        };

        return (
            <div className="">
              <div className="collapse bg-dark" id="navbarHeader">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-8 col-md-7 py-4">
                      <h4 className="text-white">About</h4>
                      <p className="text-muted">We have all faced the issues of sold out tickets, overpriced tickets and just generally not being able to make that one show for a number of reasons. Tourmonkeys livestreams and stores your favourite shows in HD, giving you access to watch these shows anytime and anywhere!</p>
                    </div>
                    <div className="col-sm-4 offset-md-1 py-4">
                      <h4 className="text-white">Contact</h4>
                      <ul className="list-unstyled">
                        <li><a href="#" className="text-white">Follow on Twitter</a></li>
                        <li><a href="#" className="text-white">Like on Facebook</a></li>
                        <li><a href="#" className="text-white">Email me</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{backgroundColor: 'black'}}  className="navbar navbar-dark box-shadow">
                <div style={{width:'90%'}} className="row">
                  <div className="col-sm-6">
                    <a style={{float: 'left'}} href="#" className="navbar-brand d-flex align-items-center">
                      <img style={{width:'30px', height:'36px', marginRight:'1vw'}}
                          src="https://i.imgur.com/SAgIP9z.png"
                          alt="Tourmonkeys Livestream"
                      />
                      <strong>Tourmonkeys</strong>
                    </a>
                  </div>
                  <div className="col-sm-6" style={{float:'right', marginTop:'1vh'}}  >
                    <button style={{float:'right'}}  className="navbar-toggler d-flex align-items-center" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon" />
                    </button>
                    <button style={{float:'right', marginRight:'1vw', padding:'1.45vh'}}  className="navbar-toggler d-flex align-items-center" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="text"> Login </span>
                    </button>
                  </div>
                </div>
              </div>

                <section id="homeBackImage" className="jumbotron text-center">
                  <div className="container">
                    <img className="page-logo margin-bottom-medium"
                        src={tourLogo}
                        alt="Tourmonkeys Livestream"
                    />
                    <p className="lead text-muted homepage-text">Never miss a concert again! Tourmonkeys lets you watch your favourite artist whenever and wherever they go on tour!</p>
                    <div className="row">
                      <div className="col-sm-6">
                        <a onClick={this.openModal2} style={{float:'right', backgroundColor:'#23cfcc', borderColor:'#23cfcc'}} className="btn btn-warning btn-lg">Request a Livestream</a>
                      </div>
                      <div className="col-sm-6">
                        <a onClick={this.openModal3} style={{float:'left', backgroundColor:'#d94f4f', borderColor:'#d94f4f'}}  className="btn btn-danger btn-lg">Join Tourmonkeys</a>
                      </div>
                    </div>
                  </div>
                </section>


                <div id="videoTeaser" className="album py-5 bg-light">
                  <div className="container">
                  {this.props.homeVideos ?
                    <div className="row">
                    {this.props.homeVideos.map(function(video, idx){
                       return (
                         <div key={idx}  className="col-md-4">
                           <div className="card mb-4 box-shadow">
                             <div className="thumb">
                               <a onClick={() => this.playVideo(video.streamURL)}>
                                 <span className="play">►</span>
                                 <div className="overlay" />
                               </a>
                               <img className="card-img-top" src={"http://content.jwplatform.com/thumbs/"+video.streamURL+"-720.jpg"} alt={video.streamName} />
                             </div>
                             <div className="card-body">
                               <p  data-tip data-for="sadFace" data-multiline={true} className="card-text" style={{color:'#232323', fontWeight:'700'}}>{video.streamName}</p>
                               <p className="card-text"><small>{video.streamAuthor}  <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                               <div className="d-flex justify-content-between align-items-center">
                                 <div className="btn-group">
                                   <button type="button" className="btn btn-sm btn-secondary">{video.streamViews} Views</button>
                                   <button type="button" className="btn btn-sm btn-primary">{video.streamLikes} &#x1f44d;</button>
                                   <button type="button" className="btn btn-sm btn-danger">{video.streamDuration}</button>

                                 </div>
                                 <small className="text-muted">9 mins ago</small>
                               </div>
                             </div>
                             <ReactTooltip id="sadFace" place="right" type="dark" effect="float" multiline={true}>
                               <span>{video.streamDescription}</span>
                             </ReactTooltip>
                           </div>
                         </div>
                       )
                     },this)}


                    </div>
                  :
                  null
                  }
                  </div>

                </div>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Stream Modal"
                >
                <div style={{position: 'relative', paddingBottom: '56.25%', overflow: 'hidden'}}>
                  <iframe src={"https://content.jwplatform.com/players/"+this.state.currentURL+"-yJ29b8c4.html"} width="100%" height="100%" frameBorder={0} scrolling="auto" allowFullScreen style={{position: 'absolute'}} />
                </div>

                </Modal>

                <Modal
                  isOpen={this.state.modalIsOpen2}
                  onAfterOpen={this.afterOpenModal2}
                  onRequestClose={this.closeModal2}
                  style={customStyles}
                  contentLabel="Request Modal"
                >
                  <div style={{padding:'7vw'}}>
                    <div className="form-group">
                      <label htmlFor="artistName">Artist Name</label>
                      <input type="text" className="form-control" id="artistName"  placeholder="Enter Artist Name" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="artistName">Your Email</label>
                      <input type="email" className="form-control" id="userEmail"  placeholder="Enter Your Email" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="eventLocation">Event Location</label>
                      <input type="text" className="form-control" id="eventLocation"  placeholder="Enter Event Location" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="eventDate">Event Date</label>
                      <input type="text" className="form-control" id="eventDate"  placeholder="Enter Event Date" />
                    </div>


                    <button onClick={this.requestLivestream} type="submit" className="btn btn-primary">Request Livestream</button>
                  </div>
                </Modal>

                <Modal
                  isOpen={this.state.modalIsOpen3}
                  onAfterOpen={this.afterOpenModal3}
                  onRequestClose={this.closeModal3}
                  style={customStyles2}
                  contentLabel="Reg Modal"
                >
                  <div style={{width: 'max-content'}} className="container">
                  <button onClick={this.closeModal3} type="button" style={{padding:'1vh', fontSize:'16px'}} className="close pull-right" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                    <div className="row">
                        <div className="form-body">
                          <ul style={{display:'-webkit-box !important'}} className="nav nav-tabs final-login">
                            <li style={{display:'inline'}} className="active"><a data-toggle="tab" href="#sectionA">Sign In</a></li>
                            <li style={{display:'inline'}} ><a data-toggle="tab" href="#sectionB">Join us!</a></li>
                          </ul>
                          <div className="tab-content">
                            <div id="sectionA" className="tab-pane fade in active">
                              <div className="innter-form">
                                <form className="sa-innate-form" method="post">
                                  <label>Email Address</label>
                                  <input type="text" name="username" />
                                  <label>Password</label>
                                  <input type="password" name="password" />
                                  <button type="submit">Sign In</button><br/><br/>
                                  <a href>Forgot Password?</a>
                                </form>
                              </div>
                              <div className="social-login">
                                <p>- - - - - - - - - - - - - Sign In With - - - - - - - - - - - - - </p>
                                <ul>
                                  <li><a href><i className="fa fa-facebook" /> Facebook</a></li>
                                  <li><a href><i className="fa fa-google-plus" /> Google+</a></li>
                                  <li><a href><i className="fa fa-twitter" /> Twitter</a></li>
                                </ul>
                              </div>
                              <div className="clearfix" />
                            </div>
                            <div id="sectionB" className="tab-pane fade">
                              <div className="innter-form">
                                <form className="sa-innate-form" method="post">
                                  <label>Name</label>
                                  <input type="text" name="username" />
                                  <label>Email Address</label>
                                  <input type="text" name="username" />
                                  <label>Password</label>
                                  <input type="password" name="password" />
                                  <button type="submit">Join now</button>
                                  <p>By clicking Join now, you agree to hifriendss User Agreement, Privacy Policy, and Cookie Policy.</p>
                                </form>
                              </div>
                              <div className="social-login">
                                <p>- - - - - - - - - - - - - Register With - - - - - - - - - - - - - </p>
                                <ul>
                                  <li><a href><i className="fa fa-facebook" /> Facebook</a></li>
                                  <li><a href><i className="fa fa-google-plus" /> Google+</a></li>
                                  <li><a href><i className="fa fa-twitter" /> Twitter</a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>

                </Modal>

                <section id="creatorsDiv" className=" text-center">
                  <div style={{padding:'7vh'}} className="container">
                    <div className="row">
                      <div className="col-sm-6 pull-left">
                        <img className="peoplesRhymer"
                            src={creatorDiv}
                            alt="Tourmonkeys Livestream"
                        />
                      </div>
                      <div className="col-sm-6">
                        <h4 style={{color: 'white'}} className="margin-bottom-medium">
                          Want to livestream performances to your audience?
                        </h4>
                        <h5 style={{color: '#ddd'}} className=" margin-bottom-medium">
                          Join Tourmonkeys and start livestreaming concerts for your followers!
                        </h5>
                        <div className="row">
                          <div className="col-sm-12 ">
                            <a href="#" style={{backgroundColor:'#e67e22', borderColor:'#e67e22'}} className="btn btn-warning btn-lg">Become a Tourmonkey</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>



                {/*Footer*/}
                <footer className="page-footer center-on-small-only blue-grey lighten-5 pt-0">
                  <div style={{backgroundColor: '#282828', color:'#d8d8d8'}}>
                    <div className="container">
                      {/*Grid row*/}
                      <div className="row py-4 d-flex align-items-center">
                        {/*Grid column*/}
                        <div className="col-12 col-md-5 text-left mb-4 mb-md-0">
                          <h6 className="mb-0 white-text text-center text-md-left"><strong>Get connected with us on social networks!</strong></h6>
                        </div>
                        {/*Grid column*/}
                        {/*Grid column*/}
                        <div className="col-12 col-md-7 text-center text-md-right">
                          {/*Facebook*/}
                          <a className="icons-sm fb-ic ml-0"><i className="fa fa-facebook white-text mr-lg-4"> </i></a>
                          {/*Twitter*/}
                          <a className="icons-sm tw-ic"><i className="fa fa-twitter white-text mr-lg-4"> </i></a>
                          {/*Google +*/}
                          <a className="icons-sm gplus-ic"><i className="fa fa-google-plus white-text mr-lg-4"> </i></a>
                          {/*Linkedin*/}
                          <a className="icons-sm li-ic"><i className="fa fa-linkedin white-text mr-lg-4"> </i></a>
                          {/*Instagram*/}
                          <a className="icons-sm ins-ic"><i className="fa fa-instagram white-text mr-lg-4"> </i></a>
                        </div>
                        {/*Grid column*/}
                      </div>
                      {/*Grid row*/}
                    </div>
                  </div>
                  {/*Footer Links*/}
                  <div className="container mt-5 mb-4 text-center text-md-left">
                    <div className="row mt-3">
                      {/*First column*/}
                      <div className="col-md-3 col-lg-4 col-xl-3 mb-r dark-grey-text">
                        <h6 className="title font-bold"><strong>Tourmonkeys</strong></h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
                        <p>Tourmonkeys is a platform that gives access to users the ability to watch live performances as they happen as well as on demand access to rewatch livestreamed events.</p>
                      </div>
                      {/*/.First column*/}
                      {/*Second column*/}
                      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-r dark-grey-text">
                        <h6 className="title font-bold"><strong>Products</strong></h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
                        <p><a href="#!" className="footer-info dark-grey-text">Main App</a></p>
                        <p><a href="#!" className="footer-info dark-grey-text">Creators</a></p>
                      </div>
                      {/*/.Second column*/}
                      {/*Third column*/}
                      <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-r dark-grey-text">
                        <h6 className="title font-bold"><strong>Useful links</strong></h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
                        <p><a href="#!" className="footer-info dark-grey-text">Your Account</a></p>
                        <p><a href="#!" className="footer-info dark-grey-text">Become a Tourmonkey</a></p>
                        <p><a href="#!" className="footer-info dark-grey-text">Help</a></p>
                      </div>
                      {/*/.Third column*/}
                      {/*Fourth column*/}
                      <div className="col-md-4 col-lg-3 col-xl-3 dark-grey-text">
                        <h6 className="title font-bold"><strong>Contact</strong></h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
                        <p><i className="fa fa-envelope mr-3" /> contact@tourmonkeys.com</p>
                      </div>
                      {/*/.Fourth column*/}
                    </div>
                  </div>
                  {/*/.Footer Links*/}
                  {/* Copyright*/}
                  <div style={{textAlign: 'center', marginBottom: '2vh'}} className="footer-copyright">
                    <div className="container-fluid">
                      © 2017 Copyright: <a href="https://www.tourmonkeys.com"><strong> tourmonkeys.com</strong></a>
                    </div>
                  </div>
                  {/*/.Copyright */}
                </footer>
                {/*/.Footer*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText,
        homeVideos: state.home.homeVideos,
        livestreamRequested: state.home.livestreamRequested
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
