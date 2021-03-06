import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/home';
import './style.scss';
import Modal from 'react-modal';
import TextOverflowTooltip from 'react-text-overflow-tooltip';
import '../../../../node_modules/react-text-overflow-tooltip/lib/react-text-overflow-tooltip.css'
import ReactJWPlayer from 'react-jw-player';
import { withFirebase } from 'react-redux-firebase';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import firebase from 'firebase';
import { compose } from 'redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import UserAvatar from 'react-user-avatar';
import Moment from 'react-moment';
import Loader from 'react-loader-advanced';

const todosPath = 'chat';

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



class PlayerView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        fetchedVideo: PropTypes.array,
        videoLikedData : PropTypes.string,
        triggerLikeFeedback: PropTypes.string
    };

    constructor(props) {
      super(props);


      this.state = {
        modalIsOpen: false,
        currentURL: "",
        isFull: false,
        liked: 0,
        videoLikedData: null,
        likebuttonicon: "❤️",
        likebutton: "Love it",
        triggerLikeFeedback: '',
        fetchLikesNow: true,
        modalIsOpen2: false,

      };


      this.playVideo = this.playVideo.bind(this)

      this.submitMessage = this.submitMessage.bind(this)
      this.goToMain = this.goToMain.bind(this)
      this.toggleLike = this.toggleLike.bind(this)

      this.afterOpenModal2 = this.afterOpenModal2.bind(this);
      this.closeModal2 = this.closeModal2.bind(this);
      this.openModal2 = this.openModal2.bind(this);
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


    toggleLike() {
      if(this.props.firebase.auth.email) {

        if(this.state.liked == 0) {
          this.props.actions.triggerLike(this.props.match.params.videoID, this.props.firebase.auth.email);
          this.setState({liked:1, likebuttonicon: "❤️", likebutton: "Loved it!" })
        } else {
          this.props.actions.triggerLike(this.props.match.params.videoID, this.props.firebase.auth.email);
          this.setState({liked:0, likebuttonicon: "💔",likebutton: "Not for me!"})
        }
      }else {
        NotificationManager.warning('Please sign in to make a live comment!', 'Sign In', 3000);
        this.openModal2();
      }
    }
    
    submitMessage(){
        if(this.props.firebase.auth.email) {

        var messageToSend = $('#messageToSend').val().trim();
        if(!messageToSend) {
          NotificationManager.warning('Please type a message!', 'Oops', 3000);

        } else {
            var id;
            if(this.state.messages) {
              id = this.state.messages.length;
            } else {
              id = 1;
            }

            var userName = "Anon"

            if(this.props.firebase.auth.displayName) {
              userName = this.props.firebase.auth.displayName
            } else {
              userName = this.props.firebase.auth.email

            }

            const newMessage ={
              id: id,
              text: messageToSend,
              userName:userName,
              created: Math.floor(Date.now() / 1000)
            }

            firebase.database().ref('messages/'+this.props.match.params.videoID+'/'+id).set(newMessage)
            $('#messageToSend').val('');


        }
        }else {
          NotificationManager.warning('Please sign in to make a live comment!', 'Sign In', 3000);
          this.openModal2();
        }
    }




    static defaultProps = {
        statusText: '',
        userName: '',
        fetchedVideo: null

    };


    componentWillMount() {
      var videoID = this.props.match.params.videoID;
      this.props.actions.fetchVideo(videoID);
    }

    componentWillUpdate(nextProps, nextState) {
      if(!this.props.firebase.auth.email) {
        if(nextProps.firebase.auth.email && this.props.firebase.auth.email != nextProps.firebase.auth.email) {
          NotificationManager.success("Logged in as " + nextProps.firebase.auth.email, '');
          this.closeModal2();
          window.scrollTo(0, 0)
          this.props.actions.getVideoLikes(this.props.match.params.videoID, this.props.firebase.auth.email);
        }
      }
    }

    componentDidMount() {
      window.scrollTo(0, 0)


      console.log(this.props.match.params.videoID);



      firebase.database().ref('messages/'+this.props.match.params.videoID).on('value', (snapshot) => {
          const currentMessages = snapshot.val()
          console.log(currentMessages);
          if (currentMessages != null){
            this.setState({
              messages: currentMessages
            })
          }
      });


    }



    componentDidUpdate(prevProps, prevState){
      console.log(this.props.fetchedVideo);
      if(prevProps.videoLikedData != this.props.videoLikedData) {

        if(this.props.videoLikedData === "liked") {
          this.setState({liked: 1, likebuttonicon:"❤️",likebutton:  "Loved it!" });
        }
      }

      if(prevProps.triggerLikeFeedback != this.props.triggerLikeFeedback) {
          this.props.actions.fetchVideo(this.props.match.params.videoID);
      }

      if(prevProps.fetchedVideo == null && prevProps.fetchedVideo != this.props.fetchedVideo) {
        this.props.actions.fetchRecommendations("videoID",1);
      }

      if(this.state.fetchLikesNow) {
        if(this.props.firebase.auth.email) {
          this.props.actions.getVideoLikes(this.props.match.params.videoID, this.props.firebase.auth.email);
          this.setState({fetchLikesNow: false})
        }
      }
    }




    goFull = () => {
      this.setState({ isFull: true });
    }

    goToMain = () => {
        this.props.dispatch(push('/'));
    };

    playVideo(streamURL) {
      //window.location.replace("player/"+streamURL)
      if(this.props.firebase.auth.email) {
        //this.props.dispatch(push(streamURL));
        window.location.replace(streamURL)
      } else {
        this.props.dispatch(push('/'));
        NotificationManager.warning("Not logged in", '');
      }

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


    render() {


        return (
          <div className="container-fluid">
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
                            </ul>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </Modal>

            {this.props.fetchedVideo ?
              <div>
            <div style={{background:'black'}} className="row">
              <div className="navbar-header" style={{padding: '10px', width:'100%', display:'inline-bock'}}>
                <button onClick={this.goToMain} type="button" className="btn btn-default navbar-btn pull-left">
                  <span className="glyphicon glyphicon-chevron-left"/>
                </button>
                <div className="navbar-brand-centered" style={{textAlign:'center'}}><h3> {this.props.fetchedVideo[0].streamName} </h3></div>
              </div>
              <div style={{padding:'40px', marginTop:'-10px'}} className="col-sm-12">
                <ReactJWPlayer
                  customProps={{
                  sharing: {
                  link: ''
                  }
                  }}
                  playerId='1'
                  playerScript='https://content.jwplatform.com/libraries/yJ29b8c4.js'
                  playlist={'https://content.jwplatform.com/feeds/'+this.props.fetchedVideo[0].streamURL+'.json'}
                />
              </div>
            </div>
            <div className="row">

                <div className="col-sm-5">
                  <div style={{marginTop:'5vh'}} className="">
                    <div className="form-group card text-center">
                      <div className="card-header">
                        Streamed By {this.props.fetchedVideo[0].streamAuthor}.
                      </div>
                      <div className="card-block">
                        <h4 className="card-title">{this.props.fetchedVideo[0].streamName}</h4>
                        <p className="card-text">{this.props.fetchedVideo[0].streamDescription}.</p>
                        {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                      </div>
                      <div className="card-footer text-muted">
                        Streamed on {this.props.fetchedVideo[0].streamDate}
                        <br/><br/><hr/><br/>
                        <p>
                          <a  onClick={this.toggleLike} title="Love it" className="lovebtn lovebtn-counter" data-count={this.state.liked}><span >{this.state.likebuttonicon}</span> {this.state.likebutton}</a>
                        </p>
                        <br/>
                        <div className="tab-pane active" id={"profile1"}>
                          <button style={{border: 'none'}} className="btn btn-primary btn-round">
                            <i className="material-icons">remove_red_eyes</i> {this.props.fetchedVideo[0].streamViews} Views
                          </button>
                          <button  style={{border: 'none'}} className="btn btn-primary btn-round">
                            <i className="material-icons">star</i> {this.props.fetchedVideo[0].streamLikes} Likes
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="title">
                        <h2>Browse Similar Streams</h2>
                      </div>
                      {this.props.recommendedVideos ?
                      <div className=" align-items-start">
                      {this.props.recommendedVideos.map(function(video, idx){
                         return (
                           <div key={idx} style={{width:'100%'}}>
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
                             </div><br/>
                             {/* End Tabs with icons on Card */}
                           </div>
                         )
                       },this)}

                      </div>
                      :
                      <Loader show={true} message={      <div> Loading Streams... </div>}>
                      <div style={{width:'90%', height:'30vh'}}>
                      </div>
                      </Loader>
                    }
                    </div>
                  </div>
                </div>

              <div className="col-sm-7">
                {this.state.messages ?
                 <div>
                 <br/>
                 <br/><br/>
                 {(this.state.messages.length-1)==1 ?
                   <div>
                       <h4> {this.state.messages.length-1} Comment </h4>
                   </div>
                 :
                 null
                 }
                 {(this.state.messages.length-1)>1 ?
                   <div>
                       <h4> {this.state.messages.length-1} Comments </h4>
                   </div>
                 :
                 null
                 }
                 <hr/>
               </div>
                 :

                 null
                 }
                 <div className='commentDiv form-group'>
                       {this.state.messages ?


                       <ul className="commentBox">
                       {this.state.messages.map(function (message) {
                           return (
                             <li className="comment" key={message.id}>
                               <UserAvatar size="35" name={message.userName}/>
                                   <div className="commentText">{message.text} </div>
                                   <br/> <br/>
                                   <div className="commentDate pull-right"><Moment unix format="MMM Do YY">{message.created}</Moment></div>
                             </li>

                           );

                       },this ) }
                       </ul>
                       :

                       <div> <p> No comments </p> </div>
                        }

                       <div className="makeComment">

                         <textarea  id="messageToSend" className="form-control"> </textarea>

                         <br/>
                         <button className="btn btn-primary" onClick={this.submitMessage} > Send Message </button>
                     </div>
                 </div>
              </div>
            </div>
            </div>
            :
            <Loader show={true} message={      <div> Loading Streams... </div>}>
            <div style={{width:'100%', height:'100%'}}>
            </div>
            </Loader>
            }
            <NotificationContainer/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recommendedVideos: state.home.recommendedVideos,
        fetchedVideo: state.home.fetchedVideo,
        statusText: state.auth.statusText,
        firebase: state.firebase,
        videoLikedData: state.home.videoLikedData,
        triggerLikeFeedback: state.home.triggerLikeFeedback,
        auth: state.firebase.auth

    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default compose(firebaseConnect(),connect(mapStateToProps, mapDispatchToProps ))(PlayerView);
export { PlayerView as PlayerViewNotConnected };
