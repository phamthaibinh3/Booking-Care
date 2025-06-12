import patientService from "../services/patientService";
let postPatientBookAppointment = async (req, res) => {
    try {
        let data = await patientService.postPatientBookAppointment(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error: ', e);

        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })

    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let data = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: 0,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    postPatientBookAppointment, postVerifyBookAppointment
}