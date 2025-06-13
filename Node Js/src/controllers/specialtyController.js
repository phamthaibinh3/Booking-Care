import specialtyService from "../services/specialtyService";

let createNewSpecialty = async(req,res) => {
    try {
        let data = await specialtyService.createNewSpecialty(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllSpecialty = async(req,res) => {
    try {
        let data = await specialtyService.getAllSpecialty();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createNewSpecialty,getAllSpecialty
}