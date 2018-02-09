import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';
import reactLogo from './images/react-logo.png';
import tourLogo from './images/tour-logo.png';

class HomeView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        statusText: '',
        userName: ''
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {
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
              <div className="navbar navbar-dark bg-dark box-shadow">
                <div style={{width:'90%'}} className="row">
                  <div className="col-sm-6">
                    <a style={{float: 'left'}} href="#" className="navbar-brand d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx={12} cy={13} r={4} /></svg>
                      <strong>Tourmonkeys</strong>
                    </a>
                  </div>
                  <div className="col-sm-6" style={{float:'right', marginTop:'1vh'}}  >
                    <button style={{float:'right'}}  className="navbar-toggler d-flex align-items-center" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon" />
                    </button>
                    <button style={{float:'right'}}  className="navbar-toggler d-flex align-items-center" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="text"> Login </span>
                    </button>
                  </div>
                </div>
              </div>

                <section className="jumbotron text-center">
                  <div className="container">
                    <img className="page-logo margin-bottom-medium"
                        src={tourLogo}
                        alt="Tourmonkeys Livestream"
                    />
                    <p className="lead text-muted">Never miss a concert again! Tourmonkeys lets you Watch your favourite artist whenever and wherever they go on tour!</p>
                    <div className="row">
                      <div className="col-sm-6">
                        <a href="#" style={{float:'right'}} className="btn btn-warning btn-lg">Request a Livestream</a>
                      </div>
                      <div className="col-sm-6">
                        <a href="#" style={{float:'left'}}  className="btn btn-danger btn-lg">Join Tourmonkeys</a>
                      </div>
                    </div>
                  </div>
                </section>


                <div className="album py-5 bg-light">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-primary">12k &#x1f44d;</button>
                                <button type="button" className="btn btn-sm btn-danger">45:00</button>

                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-danger">12k &#x1f44d;</button>
                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-danger">12k &#x1f44d;</button>
                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-danger">12k &#x1f44d;</button>
                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-danger">12k &#x1f44d;</button>
                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-danger">12k &#x1f44d;</button>
                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-danger">12k &#x1f44d;</button>
                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-danger">12k &#x1f44d;</button>
                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                          <img className="card-img-top" src="http://via.placeholder.com/350x250" alt="Card image cap" />
                          <div className="card-body">
                            <p className="card-text" style={{color:'#232323', fontWeight:'700'}}>Flobots</p>
                            <p className="card-text"><small>Tourmonkeys Livesteam <span style={{color:'#3498db'}}>&#10003;</span></small></p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-secondary">307K Views</button>
                                <button type="button" className="btn btn-sm btn-danger">12k &#x1f44d;</button>
                              </div>
                              <small className="text-muted">9 mins</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <section className="jumbotron text-center">
                  <div className="container">
                    <img className="page-logo margin-bottom-medium"
                        src={tourLogo}
                        alt="Tourmonkeys Livestream"
                    />
                    <p className="lead text-muted">Never miss a concert again! Tourmonkeys lets you Watch your favourite artist whenever and wherever they go on tour!</p>
                    <div className="row">
                      <div className="col-sm-6">
                        <a href="#" style={{float:'right'}} className="btn btn-warning btn-lg">Request a Livestream</a>
                      </div>
                      <div className="col-sm-6">
                        <a href="#" style={{float:'left'}}  className="btn btn-danger btn-lg">Join Tourmonkeys</a>
                      </div>
                    </div>
                  </div>
                </section>

                {/*Footer*/}
                <footer className="page-footer center-on-small-only blue-grey lighten-5 pt-0">
                  <div style={{backgroundColor: '#21d192'}}>
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
                        <h6 className="title font-bold"><strong>Company name</strong></h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
                        <p>Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit
                          amet, consectetur adipisicing elit.</p>
                      </div>
                      {/*/.First column*/}
                      {/*Second column*/}
                      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-r dark-grey-text">
                        <h6 className="title font-bold"><strong>Products</strong></h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
                        <p><a href="#!" className="dark-grey-text">MDBootstrap</a></p>
                        <p><a href="#!" className="dark-grey-text">MDWordPress</a></p>
                        <p><a href="#!" className="dark-grey-text">BrandFlow</a></p>
                        <p><a href="#!" className="dark-grey-text">Bootstrap Angular</a></p>
                      </div>
                      {/*/.Second column*/}
                      {/*Third column*/}
                      <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-r dark-grey-text">
                        <h6 className="title font-bold"><strong>Useful links</strong></h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
                        <p><a href="#!" className="dark-grey-text">Your Account</a></p>
                        <p><a href="#!" className="dark-grey-text">Become an Affiliate</a></p>
                        <p><a href="#!" className="dark-grey-text">Shipping Rates</a></p>
                        <p><a href="#!" className="dark-grey-text">Help</a></p>
                      </div>
                      {/*/.Third column*/}
                      {/*Fourth column*/}
                      <div className="col-md-4 col-lg-3 col-xl-3 dark-grey-text">
                        <h6 className="title font-bold"><strong>Contact</strong></h6>
                        <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
                        <p><i className="fa fa-home mr-3" /> New York, NY 10012, US</p>
                        <p><i className="fa fa-envelope mr-3" /> info@example.com</p>
                        <p><i className="fa fa-phone mr-3" /> + 01 234 567 88</p>
                        <p><i className="fa fa-print mr-3" /> + 01 234 567 89</p>
                      </div>
                      {/*/.Fourth column*/}
                    </div>
                  </div>
                  {/*/.Footer Links*/}
                  {/* Copyright*/}
                  <div className="footer-copyright">
                    <div className="container-fluid">
                      © 2017 Copyright: <a href="https://www.MDBootstrap.com"><strong> MDBootstrap.com</strong></a>
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
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
