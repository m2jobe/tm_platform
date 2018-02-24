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
import ReactJWPlayer from 'react-jw-player';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';

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
      //  dispatch: PropTypes.func.isRequired,

    };

    constructor() {
      super();


      this.state = {
        modalIsOpen: false,
        currentURL: "",
        isFull: false,
      };

      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.openModal = this.openModal.bind(this);


    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
      // references are now sync'd and can be accessed.
    }



    closeModal() {
      this.setState({modalIsOpen: false});
    }



    static defaultProps = {
        statusText: '',
        userName: '',

    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    componentWillMount() {
      //fetch home videos
      //this.props.actions.fetchHomeVideos();
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState){
      console.log(this.state.firebase);
    }




    goFull = () => {
      this.setState({ isFull: true });
    }

    render() {


        return (
          <div className="App">
            <div style={{width:'100vw', height:'100vh'}} className="row">
              <div  style={{ height:'100%'}} className="col-sm-8">
                <ReactJWPlayer
                  playerId='1'
                  playerScript='https://content.jwplatform.com/libraries/yJ29b8c4.js'
                  playlist='http://content.jwplatform.com/feeds/4xaVHf2W.json'
                />
              </div>

              <div className="col-sm-4">
              <div>
                <h1>Todos</h1>
                <div>
                  {JSON.stringify(this.state.todos, null, 2)}
                </div>
                <button onClick={() => firebase.watchEvent('value', todosPath)}>
                  Load Todos
                </button>
              </div>

              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default compose(
  withFirebase,
  connect((state) => ({
    todos: state.firebase.data[todosPath],
    // todos: state.firebase.ordered[todosPath] // for ordered data (array)
  }, mapStateToProps, mapDispatchToProps))
)(PlayerView)

//export default connect(mapStateToProps, mapDispatchToProps)(PlayerView);
export { PlayerView as PlayerViewNotConnected };
