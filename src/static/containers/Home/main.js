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
import TextOverflowTooltip from 'react-text-overflow-tooltip';
import '../../../../node_modules/react-text-overflow-tooltip/lib/react-text-overflow-tooltip.css';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import firebase from 'firebase';
import { compose } from 'redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from 'react-loader-advanced';
import Avatar from 'react-avatar';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',

    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

class MainView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        homeVideos: PropTypes.array,
        upcomingStreams: PropTypes.array,
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
      this.afterOpenModal2 = this.afterOpenModal2.bind(this);
      this.closeModal2 = this.closeModal2.bind(this);
      this.openModal2 = this.openModal2.bind(this);

      this.afterOpenModal3 = this.afterOpenModal3.bind(this);
      this.closeModal3 = this.closeModal3.bind(this);
      this.openModal3 = this.openModal3.bind(this);
      this.requestLivestream = this.requestLivestream.bind(this);

    }





    login = () => {
        var password = $('#pwds').val();
        var email = $('#usrd').val();
        if (email && password) {
            firebase.login({
              email: email,
              password: password
            })
        }
    };

    signUp = () => {
      var password = $('#password').val();
      var email = $('#email').val();
      var displayName = $('#username').val();

      if (username && password && email) {
          //this.props.actions.authRegisterUser(email, password, password, username, this.state.redirectTo);
          //delete above line
          firebase.createUser(
            { email, password },
            { displayName, email }
          )
      }
    }

    playVideoLivestream(streamURL) {
      //window.location.replace("player/"+streamURL)
        NotificationManager.warning("Details coming soon", '');

    }


    playVideo(streamURL) {
      //window.location.replace("player/"+streamURL)
      if(this.props.firebase.auth.email) {
        this.props.dispatch(push('/player/'+streamURL));
      } else {
        this.openModal2();
        NotificationManager.warning("Login Now to watch", '');
      }

    }

    openModal2() {
      this.setState({modalIsOpen2: true});
    }


    closeModal2() {
      this.setState({modalIsOpen2: false});
    }

    afterOpenModal2() {
      // references are now sync'd and can be accessed.
    }

    openModal3() {
      this.setState({modalIsOpen3: true});
    }


    closeModal3() {
      this.setState({modalIsOpen3: false});
    }

    afterOpenModal3() {
      // references are now sync'd and can be accessed.
    }

    static defaultProps = {
        statusText: '',
        userName: '',
        homeVideos: null,
        upcomingStreams: null
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    componentWillMount() {


    }


    componentDidMount() {
      window.scrollTo(0, 0);
      this.props.actions.fetchHomeVideos();
      this.props.actions.fetchHomeLivestream();

    }

    componentDidUpdate(prevProps, prevState){
      if(prevProps.livestreamRequested != this.props.livestreamRequested) {
        alert("Request sent.");
        window.location.reload();
      }
      if(prevProps.firebase.authError != this.props.firebase.authError) {
        NotificationManager.success(this.props.firebase.authError.message, 'Error authenticating');
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if(!this.props.firebase.auth.email) {
        if(nextProps.firebase.auth.email && this.props.firebase.auth.email != nextProps.firebase.auth.email) {
          this.closeModal2();
        }
      } else {
        if(!nextProps.firebase.auth.email) {
          this.closeModal3();
        }
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

    logout = () => {
        firebase.logout()
    };

    triggerForgotPassword() {
      $('#triggerForgotDiv').show();
    }

    recoverPasword () {
      var emailAddress = $('#recoveryEmail').val();
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        NotificationManager.success("Recovery email sent.", '');
      }).catch(function(error) {
        // An error happened.
        console.log(error);
        NotificationManager.error(error, error.message);
      });
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
          <div>
            <Modal
              ariaHideApp={false}
              isOpen={this.state.modalIsOpen3}
              onAfterOpen={this.afterOpenModal3}
              onRequestClose={this.closeModal3}
              style={customStyles}
              contentLabel="Logout Modal"
            >
              <div style={{width: 'max-content'}} className="container">
              <button onClick={this.closeModal3} type="button" style={{padding:'1vh', fontSize:'16px'}} className="close pull-right" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
                <div style={{width:'35vw'}} className="row">
                    <div className="form-body">
                      <div className="tab-content">
                        <div id="sectionA" className="tab-pane fade in active">
                          <div className="social-login">
                            <ul>
                              <li style={{width:'100%'}} ><a onClick={this.logout}><i className="fa fa-sign-out" /> Logout</a></li>
                            </ul>
                          </div>
                          <div className="clearfix" />
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal
              ariaHideApp={false}
              isOpen={this.state.modalIsOpen2}
              onAfterOpen={this.afterOpenModal2}
              onRequestClose={this.closeModal2}
              style={customStyles}
              contentLabel="Login Modal"
            >
              <div style={{width: 'max-content'}} className="container">
              <button onClick={this.closeModal2} type="button" style={{padding:'1vh', fontSize:'16px'}} className="close pull-right" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
                <div style={{paddingBottom:'20px'}} className="row">
                    <div className="form-body">
                      <ul style={{display:'-webkit-box !important'}} className="nav nav-tabs final-login">
                        <li style={{display:'inline'}} className="active"><a data-toggle="tab" href="#sectionA">Sign In</a></li>
                        <li style={{display:'inline'}} ><a data-toggle="tab" href="#sectionB">Join us!</a></li>
                      </ul>
                      <div className="tab-content">
                        <div id="sectionA" className="tab-pane fade in active">
                          <div className="innter-form">
                            <div className="sa-innate-form" method="post">
                              <label>Email Address</label>
                              <input type="text" id="usrd" name="username" />
                              <label>Password</label>
                              <input type="password" id="pwds" name="password" />
                              <button onClick={this.login} >Sign In</button><br/><br/>
                              <a onClick={this.triggerForgotPassword}>Forgot Password?</a>
                              <div style={{display:'none'}} id="triggerForgotDiv" >
                                <br/><br/>
                                <label>Enter Email Address to get recovery steps</label>
                                <input type="text" id="recoveryEmail" name="recoveryEmail" />
                                <button onClick={this.recoverPasword} >Recover Password</button>
                                <br/><br/>
                              </div>
                            </div>
                          </div>
                          <div className="social-login">
                            <p>- - - - - - - - - - - - - Sign In With - - - - - - - - - - - - - </p>
                            <ul>
                              <li><a  onClick={() => firebase.login({ provider: 'facebook', type: 'popup' })}><i className="fa fa-facebook" /> Facebook</a></li>
                              <li><a  onClick={() => firebase.login({ provider: 'google', type: 'popup' })}><i className="fa fa-google-plus" /> Google+</a></li>
                              <li><a  onClick={() => firebase.login({ provider: 'twitter', type: 'popup' })}><i className="fa fa-twitter" /> Twitter</a></li>
                            </ul>
                          </div>
                          <div className="clearfix" />
                        </div>
                        <div id="sectionB" className="tab-pane fade">
                          <div className="innter-form">
                            <div className="sa-innate-form" method="post">
                              <label>Name</label>
                              <input type="text" id="username" name="username" />
                              <label>Email Address</label>
                              <input type="text" id="email" name="email" />
                              <label>Password</label>
                              <input type="password" id="password" name="password" />
                              <button onClick={this.signUp} >Join now</button><br/><br/>
                              <p>By clicking Join now, you agree to hifriendss User Agreement, Privacy Policy, and Cookie Policy.</p>
                            </div>
                          </div>
                          <div className="social-login">
                            <p>- - - - - - - - - - - - - Register With - - - - - - - - - - - - - </p>
                            <ul>
                              <li><a  onClick={() => firebase.login({ provider: 'facebook', type: 'popup' })}><i className="fa fa-facebook" /> Facebook</a></li>
                              <li><a  onClick={() => firebase.login({ provider: 'google', type: 'popup' })}><i className="fa fa-google-plus" /> Google+</a></li>
                              <li><a  onClick={() => firebase.login({ provider: 'twitter', type: 'popup' })}><i className="fa fa-twitter" /> Twitter</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </Modal>
            <nav className="navbar navbar-transparent navbar-fixed-top navbar-color-on-scroll">
              <div className="container">
                <div className="collapse navbar-collapse" id="navigation-index">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </button>
                    <a href="#">
                      <div className="logo-container">
                        <div className="logo">
                          <img src={tourLogo} alt="Tourmonkeys Livesteam Logo" data-placement="bottom" data-html="true" />
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="nav navbar-nav navbar-right">
                    <li>
                      {this.props.firebase.auth.email ?
                        <a onClick={this.openModal3}>
                        {this.props.firebase.auth.photoURL
                          ?
                          <Avatar  src={this.props.firebase.auth.photoURL} />
                          :
                          this.props.firebase.auth.email
                        }

                        </a>
                        :
                        <a onClick={this.openModal2}><i className="material-icons">face</i> login</a>
                      }
                    </li>
                  </div>
                </div>
              </div>
            </nav>
            {/* End Navbar */}
            <div className="wrapper">
              <div className="header header-filter">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                      <div className="brand">
                        <h1>Tourmonkeys.</h1>
                        <h3>Watch Performances Live and On Demand!</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main main-raised">
                {this.props.upcomingStreams && this.props.upcomingStreams.length > 0 ?
                <div className="section section-basic">
                  <div className="container">
                    <div className="title">
                      <h2>Upcoming Livestreams</h2>
                    </div>
                    <div className="row">
                    {this.props.upcomingStreams.map(function(video, idx){
                       return (
                         <div key={idx} className="col-md-4">
                           <div className="title">
                             <TextOverflowTooltip id={video.streamURL + "_tooltip"} maxWidth="100%" style={{fontSize: '1.1vw'}}> <h3>{video.streamName}</h3> </TextOverflowTooltip>
                             <div className="thumb">
                               <a onClick={() => this.playVideoLivestream(video.streamURL)}>
                                 <span className="play">►</span>
                                 <div className="overlay" />
                               </a>
                               <img style={{width:'100%', height:'100%'}} src={"https://content.jwplatform.com/thumbs/"+video.streamURL+"-720.jpg"} alt={video.streamName} className="img-rounded img-responsive img-raised" />
                             </div>
                           </div>
                           {/* Tabs with icons on Card */}
                           <div className="card card-nav-tabs">
                             <div className="header header-success">
                               <div className="row" style={{padding:'10px', background: 'transparent', marginTop: '-4vh', marginLeft: '-0.8vw', boxShadow: 'none !important'}}>
                                 <button className="btn pull-left" style={{background: 'transparent', boxShadow: 'none'}}>
                                   <i className="material-icons">videocam</i> {video.streamAuthor}
                                 </button>
                                 <button className="btn pull-right" style={{background: 'transparent', boxShadow: 'none'}}>
                                   <i className="material-icons">access_time</i> 04:39
                                 </button>
                               </div>
                               {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
                               <div className="nav-tabs-navigation" style={{background: 'transparent', marginTop: '-1vh', padding:'10px'}}>
                                 <div className="nav-tabs-wrapper">
                                   <ul className="nav nav-tabs" data-tabs="tabs">
                                     <li className="active">
                                       <a href={"#profile"+video.streamURL} data-toggle="tab">
                                         <i className="material-icons">face</i>
                                         Stats
                                       </a>
                                     </li>
                                     <li>
                                     <a href={"#messages"+video.streamURL} data-toggle="tab">
                                         <i className="material-icons">chat</i>
                                         Details
                                       </a>
                                     </li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             <div style={{marginTop: '-3vh'}} className="content">
                               <div className="tab-content text-center">
                                 <div className="tab-pane active" id={"profile"+video.streamURL}>
                                   <button style={{border: 'none'}} className="btn btn-primary btn-round">
                                     <i className="material-icons">remove_red_eyes</i> {video.streamViews} Views
                                   </button>
                                   <button style={{border: 'none'}} className="btn btn-primary btn-round">
                                     <i className="material-icons">star</i> {video.streamLikes} Likes
                                   </button>
                                 </div>
                                 <div className="tab-pane" id={"messages"+video.streamURL}>
                                   <p> {video.streamDescription}</p>
                                 </div>
                               </div>
                             </div>
                           </div>
                           {/* End Tabs with icons on Card */}
                         </div>
                       )
                     },this)}

                    </div>

                  </div>
                </div>
                :
                null
              }
                <div className="section section-basic">
                  <div className="container">
                    <div className="title">
                      <h2>Browse Streams</h2>
                    </div>
                    {this.props.homeVideos ?
                    <div className="row">
                    {this.props.homeVideos.map(function(video, idx){
                       return (
                         <div key={idx} className="col-md-4">
                           <div className="title">
                             <TextOverflowTooltip id={video.streamURL + "_tooltip"} maxWidth="100%" style={{fontSize: '1.1vw'}}> <h3>{video.streamName}</h3> </TextOverflowTooltip>
                             <div className="thumb">
                               <a onClick={() => this.playVideo(video.streamURL)}>
                                 <span className="play">►</span>
                                 <div className="overlay" />
                               </a>
                               <img src={"https://content.jwplatform.com/thumbs/"+video.streamURL+"-720.jpg"} alt="Raised Image" className="img-rounded img-responsive img-raised" />
                             </div>
                           </div>
                           {/* Tabs with icons on Card */}
                           <div className="card card-nav-tabs">
                             <div className="header header-success">
                               <div className="row" style={{padding:'10px', background: 'transparent', marginTop: '-4vh', marginLeft: '-0.8vw', boxShadow: 'none !important'}}>
                                 <button className="btn pull-left" style={{background: 'transparent', boxShadow: 'none'}}>
                                   <i className="material-icons">videocam</i> {video.streamAuthor}
                                 </button>
                                 <button className="btn pull-right" style={{background: 'transparent', boxShadow: 'none'}}>
                                   <i className="material-icons">access_time</i> 04:39
                                 </button>
                               </div>
                               {/* colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" */}
                               <div className="nav-tabs-navigation" style={{background: 'transparent', marginTop: '-1vh', padding:'10px'}}>
                                 <div className="nav-tabs-wrapper">
                                   <ul className="nav nav-tabs" data-tabs="tabs">
                                     <li className="active">
                                       <a href={"#profile"+video.streamURL} data-toggle="tab">
                                         <i className="material-icons">face</i>
                                         Stats
                                       </a>
                                     </li>
                                     <li>
                                     <a href={"#messages"+video.streamURL} data-toggle="tab">
                                         <i className="material-icons">chat</i>
                                         Details
                                       </a>
                                     </li>
                                   </ul>
                                 </div>
                               </div>
                             </div>
                             <div style={{marginTop: '-3vh'}} className="content">
                               <div className="tab-content text-center">
                                 <div className="tab-pane active" id={"profile"+video.streamURL}>
                                   <button style={{border: 'none'}} className="btn btn-primary btn-round">
                                     <i className="material-icons">remove_red_eyes</i> {video.streamViews} Views
                                   </button>
                                   <button  style={{border: 'none'}} className="btn btn-primary btn-round">
                                     <i className="material-icons">star</i> {video.streamLikes} Likes
                                   </button>
                                 </div>
                                 <div className="tab-pane" id={"messages"+video.streamURL}>
                                   <p> {video.streamDescription}</p>
                                 </div>
                               </div>
                             </div>
                           </div>
                           {/* End Tabs with icons on Card */}
                         </div>
                       )
                     },this)}
                    </div>
                    :
                    <Loader show={true} message={      <div> Loading Streams... </div>}>
                    <div style={{width:'90%', height:'40vh'}}>
                    </div>
                    </Loader>

                  }
                  </div>
                </div>
                <div className="section section-download">
                  <div className="container">
                    <div className="row text-center">
                      <div className="col-md-8 col-md-offset-2">
                        <h2>Do you love Tourmonkeys?</h2>
                        <h4>If you love the Tourmonkeys platform and what we do please give us a follow on our social mdia</h4>
                      </div>
                    </div>
                    <div className="row sharing-area text-center">
                      <h3>Thank you for supporting us!</h3>
                      <a href="https://twitter.com/tourmonkeys" target="_blank" className="btn btn-twitter">
                        <i className="fa fa-twitter" />
                        Tweet
                      </a>
                      <a href="https://www.facebook.com/tourmonkeys/"  target="_blank" className="btn btn-facebook">
                        <i className="fa fa-facebook-square" />
                        Like
                      </a>
                      <a href="https://www.instagram.com/tourmonkeys" target="_blank" className="btn btn-google-plus">
                        <i className="fa fa-instagram" />
                        Follow
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="footer">
                <div className="container">
                  <nav className="pull-left">
                    <ul>
                      <li>
                        <a href="https://www.tourmonkeys.com">
                          Tourmonkeys
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <div className="copyright pull-right">
                    © 2017, made with <i className="material-icons">favorite</i> by Tourmonkeys Team.
                  </div>
                </div>
              </footer>
            </div>
            <NotificationContainer/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText,
        homeVideos: state.home.homeVideos,
        upcomingStreams: state.home.upcomingStreams,
        livestreamRequested: state.home.livestreamRequested,
        firebase: state.firebase,
        auth: state.firebase.auth
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default compose(firebaseConnect(),connect(mapStateToProps, mapDispatchToProps))(MainView);
export { MainView as MainViewNotConnected };
