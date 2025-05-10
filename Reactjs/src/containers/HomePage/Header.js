import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss'
import logo from '../../assets/logo.png'
import { FormattedMessage } from 'react-intl';
class HomePage extends Component {

    render() {


        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i class="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className='language-vi'>VN</div>
                            <div className='language-en'>EN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className='title2'>
                            <FormattedMessage id="banner.title2" />
                        </div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child1"/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child2"/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child3"/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child4"/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child5"/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id="banner.text-child6"/></div>
                            </div>
                            
                        </div>
                    </div>


                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
