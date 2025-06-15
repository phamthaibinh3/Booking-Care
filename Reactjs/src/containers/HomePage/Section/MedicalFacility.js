import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import specialtyImg from '../../../assets/images/specialty/ong-nghiem.jpg'
import { withRouter } from 'react-router';
import { getAllClinic } from '../../../services/userService';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic()
    }
    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='speacialty-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-custommize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Hệ thống Thu Cúc 1</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Hệ thống Thu Cúc 2</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Hệ thống Thu Cúc 3</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Hệ thống Thu Cúc 4</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Hệ thống Thu Cúc 5</div>
                            </div>
                            <div className='section-custommize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Hệ thống Thu Cúc 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
