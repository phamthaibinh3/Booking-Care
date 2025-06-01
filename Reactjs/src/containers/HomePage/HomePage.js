import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Specialty from './Section/Specialty';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import { after } from 'lodash';

class HomePage extends Component {

    // handleAfterChange = (index,dontAnimate) => {

    // }

    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // slickGoTo: this.handleAfterChange,
        };
        return (
            <>
                <Header isShowBanner={true}/>
                <Specialty
                    settings={settings}
                />
                <MedicalFacility
                    settings={settings}
                />
                <OutStandingDoctor
                    settings={settings}
                />
                <HandBook
                    settings={settings}
                />
                <About />
                <HomeFooter />
            </>
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
