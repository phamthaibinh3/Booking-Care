require('dotenv').config();
import nodemailer from 'nodemailer'

let sendSipleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Phạm Thái Bình" <thaibinh100402@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt khám bệnh",
        html: getBodyHTMLEmail(dataSend), // HTML body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đặt lịch khám bệnh online trên Bookingcare</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p> Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và 
        hoàn tất thủ tục đặt lịch khám bệnh,</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
    <h3>Hello ${dataSend.patientName}!</h3>
    <p>You have received this email because you booked a medical appointment online on Bookingcare.</p>
    <p>Appointment Information:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>If the above information is correct, please click the link below to confirm and complete your appointment booking procedure.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Thank you very much!</div>
        `
    }
    return result
}

module.exports = {
    sendSipleEmail
}