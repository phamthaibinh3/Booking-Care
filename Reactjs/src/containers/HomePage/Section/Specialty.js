import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'

import Slider from "react-slick";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import specialtyImg from '../../../assets/images/specialty/ong-nghiem.jpg'

class Specialty extends Component {

    render() {
        
        // const responsive = {
        //     superLargeDesktop: {
        //         // the naming can be any, depends on you.
        //         breakpoint: { max: 4000, min: 3000 },
        //         items: 5
        //     },
        //     desktop: {
        //         breakpoint: { max: 3000, min: 1024 },
        //         items: 3
        //     },
        //     tablet: {
        //         breakpoint: { max: 1024, min: 464 },
        //         items: 2
        //     },
        //     mobile: {
        //         breakpoint: { max: 464, min: 0 },
        //         items: 1
        //     }
        // };
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='speacialty-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-custommize'>
                                <div  className='bg-image section-specialty'/>
                                <div>Cơ xường khớp 1</div>
                            </div>
                            <div className='section-custommize'>
                                <div  className='bg-image section-specialty'/>
                                <div>Cơ xường khớp 2</div>
                            </div>
                            <div className='section-custommize'>
                                <div  className='bg-image section-specialty'/>
                                <div>Cơ xường khớp 3</div>
                            </div>
                            <div className='section-custommize'>
                                <div  className='bg-image section-specialty'/>
                                <div>Cơ xường khớp 4</div>
                            </div>
                            <div className='section-custommize'>
                                <div  className='bg-image section-specialty'/>
                                <div>Cơ xường khớp 5</div>
                            </div>
                            <div className='section-custommize'>
                                <div  className='bg-image section-specialty'/>
                                <div>Cơ xường khớp 6</div>
                            </div>
                        </Slider>
                    </div>


                    {/* <Carousel responsive={responsive}>
                        <div>Item 1</div>
                        <div>Item 2</div>
                        <div>Item 3</div>
                        <div>Item 4</div>
                    </Carousel>; */}
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
