import db from '../models/index.js';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: false,
                // nest:false
            })
            resolve({
                errCode: 0,
                data: user
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                ],
                attributes: {
                    exclude: ['password']
                },
                raw: false
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}

let checkRequiredFields = (inputId) => {
    let arrFields = ['doctorId', 'contentHTML', 'contentMarkdown', 'action', 'selectedPrice', 'selectedPayment', 'selectedProvince',
        'clinicName', 'clinicAddress', 'note', 'specialtyId'
    ]

    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputId[arrFields[i]]) {
            isValid = false;
            element = arrFields[i];
            break;
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObj = checkRequiredFields(inputData);
            if (checkObj.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter: ${checkObj.element}`
                });
            } else {
                // Upsert to Markdown table
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    });
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    });
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        await doctorMarkdown.save();
                    }
                }

                // Upsert to Doctor_Infor table
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    },
                    raw: false
                });
                if (doctorInfor) {
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.nameClinic = inputData.clinicName;
                    doctorInfor.addressClinic = inputData.clinicAddress;
                    doctorInfor.note = inputData.note;
                    doctorInfor.specialtyId = inputData.specialtyId;
                    doctorInfor.clinicId = inputData.clinicId;
                    await doctorInfor.save(); // Đúng: cập nhật Doctor_Infor
                } else {
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        paymentId: inputData.selectedPayment,
                        provinceId: inputData.selectedProvince,
                        nameClinic: inputData.clinicName,
                        addressClinic: inputData.clinicAddress,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId
                    });
                }
                resolve({ errCode: 0, errMessage: 'Save doctor detail succeed' });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] },
                            ]
                        }
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

// let bulkCreateSchedule = (data) => {
//     return new Promise(async (resolve, reject) => {
//         console.log('Data from service: ', data);

//         try {
//             if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Missing required parameter'
//                 })
//             } else {
//                 let schedule = data.arrSchedule;
//                 if (schedule && schedule.length > 0) {
//                     schedule = schedule.map(item => {
//                         item.maxNumber = MAX_NUMBER_SCHEDULE;
//                         return item;
//                     })
//                 }

//                 //get all existing data
//                 let existing = await db.Schedule.findAll({
//                     where: { doctorId: data.doctorId, date: data.formattedDate },
//                     attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
//                     raw: true
//                 });

//                 // //convert data
//                 // if(existing && existing.length > 0) {
//                 //     existing = existing.map(item => {
//                 //         item.date = new Date(item.date).getTime();
//                 //         return item;
//                 //     })
//                 // }

//                 //compare
//                 let toCreate = _.differenceWith(schedule, existing, (a, b) => {
//                     return a.timeType === b.timeType && a.date === b.date;
//                 });

//                 //create new schedule
//                 if (toCreate && toCreate.length > 0) {
//                     await db.Schedule.bulkCreate(toCreate);
//                 }
//                 resolve({
//                     errCode: 0,
//                     errMessage: 'Create schedule succeed'
//                 })
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                // Đảm bảo date là chuỗi số timestamp
                let schedule = data.arrSchedule.map(item => {
                    item.maxNumber = MAX_NUMBER_SCHEDULE;
                    item.date = String(item.date); // ép sang chuỗi
                    return item;
                });

                // Lấy tất cả ngày (timestamp dạng chuỗi) có trong schedule
                const allDates = schedule.map(item => item.date);

                // Lấy tất cả lịch đã tồn tại của bác sĩ trong các ngày này
                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: allDates
                    },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                });

                // Loại bỏ lịch trùng
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Create schedule succeed'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] }
                    ],
                    raw: false,
                    nest: true
                });

                if (!dataSchedule) dataSchedule = [];

                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getExtraInforDoctorById = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Doctor_Infor.findOne({
                    where: { doctorId: idInput },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] }
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getProfileDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: doctorId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] },
                            ]
                        }
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getListPatientForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                {
                                    model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']
                                }
                            ]
                        }
                    ],
                    raw: false,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHome, getAllDoctors, saveDetailInforDoctor,
    getDetailDoctorById, bulkCreateSchedule, getScheduleByDate,
    getExtraInforDoctorById, getProfileDoctorById,
    getListPatientForDoctor
}