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
import '../../../../node_modules/react-text-overflow-tooltip/lib/react-text-overflow-tooltip.css'

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

class MainView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
      //  dispatch: PropTypes.func.isRequired,
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
        homeVideos: null,
        upcomingStreams: null
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
      this.props.actions.fetchHomeLivestream();

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
          <div>
            <nav className="navbar navbar-transparent navbar-fixed-top navbar-color-on-scroll">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-index">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                  <a href="http://www.creative-tim.com">
                    <div className="logo-container">
                      <div className="logo">
                        <img src="assets/img/logo.png" alt="Creative Tim Logo" rel="tooltip" title="<b>Material Kit</b> was Designed & Coded with care by the staff from <b>Creative Tim</b>" data-placement="bottom" data-html="true" />
                      </div>
                      <div className="brand">
                        Tourmonkeys
                      </div>
                    </div>
                  </a>
                </div>
                <div className="collapse navbar-collapse" id="navigation-index">
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <a href="#pablo"><i className="material-icons">email</i></a>
                    </li>
                    <li>
                      <a href="#pablo"><i className="material-icons">face</i></a>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="material-icons">settings</i>
                        <b className="caret" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li className="dropdown-header">Dropdown header</li>
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li className="divider" />
                        <li><a href="#">Separated link</a></li>
                        <li className="divider" />
                        <li><a href="#">One more separated link</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* End Navbar */}
            <div className="wrapper">
              <div className="header header-filter" style={{backgroundImage: 'url("assets/img/bg2.jpeg")'}}>
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
                <div className="section section-basic">
                  <div className="container">
                    <div className="title">
                      <h2>Upcoming Livestreams</h2>
                    </div>
                    {this.props.upcomingStreams  ?
                    <div className="row">
                    {this.props.upcomingStreams.map(function(video, idx){
                       return (
                         <div key={idx} className="col-md-4">
                           <div className="title">
                             <TextOverflowTooltip maxWidth="100%" style={{fontSize: '1.1vw'}}> <h3>{video.streamName}</h3> </TextOverflowTooltip>
                             <div className="thumb">
                               <a onClick={() => this.playVideo(video.streamURL)}>
                                 <span className="play">►</span>
                                 <div className="overlay" />
                               </a>
                               <img style={{width:'100%', height:'100%'}} src={"http://content.jwplatform.com/thumbs/"+video.streamURL+"-720.jpg"} alt={video.streamName} className="img-rounded img-responsive img-raised" />
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
                                   <button className="btn btn-primary btn-round">
                                     <i className="material-icons">remove_red_eyes</i> {video.streamViews} Views
                                   </button>
                                   <button className="btn btn-primary btn-round">
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
                    null
                  }
                  </div>
                </div>

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
                             <TextOverflowTooltip maxWidth="100%" style={{fontSize: '1.1vw'}}> <h3>{video.streamName}</h3> </TextOverflowTooltip>
                             <div className="thumb">
                               <a onClick={() => this.playVideo(video.streamURL)}>
                                 <span className="play">►</span>
                                 <div className="overlay" />
                               </a>
                               <img src={"http://content.jwplatform.com/thumbs/"+video.streamURL+"-720.jpg"} alt="Raised Image" className="img-rounded img-responsive img-raised" />
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
                                   <button className="btn btn-primary btn-round">
                                     <i className="material-icons">remove_red_eyes</i> {video.streamViews} Views
                                   </button>
                                   <button className="btn btn-primary btn-round">
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
                    null
                  }
                  </div>
                </div>
                <div className="section section-download">
                  <div className="container">
                    <div className="row text-center">
                      <div className="col-md-8 col-md-offset-2">
                        <h2>Do you love Tourmonkeys?</h2>
                        <h4>If you love the Tourmonkeys platform and what we do please leave us a quick review here</h4>
                      </div>
                      <div className="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4">
                        <a href="http://www.creative-tim.com/product/material-kit" className="btn btn-primary btn-lg">
                          <i className="material-icons">cloud_download</i> Leave Review
                        </a>
                      </div>
                    </div>
                    <div className="row sharing-area text-center">
                      <h3>Thank you for supporting us!</h3>
                      <a href="#" className="btn btn-twitter">
                        <i className="fa fa-twitter" />
                        Tweet
                      </a>
                      <a href="#" className="btn btn-facebook">
                        <i className="fa fa-facebook-square" />
                        Share
                      </a>
                      <a href="#" className="btn btn-google-plus">
                        <i className="fa fa-google-plus" />
                        Share
                      </a>
                      <a href="#" className="btn btn-github">
                        <i className="fa fa-github" />
                        Star
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
                        <a href="http://www.creative-tim.com">
                          Creative Tim
                        </a>
                      </li>
                      <li>
                        <a href="http://presentation.creative-tim.com">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="http://blog.creative-tim.com">
                          Blog
                        </a>
                      </li>
                      <li>
                        <a href="http://www.creative-tim.com/license">
                          Licenses
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <div className="copyright pull-right">
                    © 2016, made with <i className="material-icons">favorite</i> by Creative Tim for a better web.
                  </div>
                </div>
              </footer>
            </div>
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
        livestreamRequested: state.home.livestreamRequested
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
export { MainView as HomeViewNotConnected };
