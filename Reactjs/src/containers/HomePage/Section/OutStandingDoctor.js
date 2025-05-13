import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
class OutStandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='speacialty-header'>
                        <span className='title-section'>Bác sĩ nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-custommize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến Sĩ Nguyễn Văn A</div>
                                        <div>Cơ Xương Khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custommize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến Sĩ Nguyễn Văn A</div>
                                        <div>Cơ Xương Khớp 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custommize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến Sĩ Nguyễn Văn A</div>
                                        <div>Cơ Xương Khớp 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custommize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến Sĩ Nguyễn Văn A</div>
                                        <div>Cơ Xương Khớp 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custommize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến Sĩ Nguyễn Văn A</div>
                                        <div>Cơ Xương Khớp 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-custommize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến Sĩ Nguyễn Văn A</div>
                                        <div>Cơ Xương Khớp 6</div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
