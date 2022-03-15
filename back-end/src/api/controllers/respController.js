const Resp = require('../models/resp')

const signupResp = (req, res) => {

    const resp = new Resp(req.body);
    resp.save((err, resp) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.send(resp)
    })

}

const LoginResp = (req, res) => {

    const {
        email,
        password
    } = req.body;

    Resp.findOne({
        email
    }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                isLogged: false,
                error: 'User not Found with this email@'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                isLogged: false,
                error: 'Email and Password dont Match !'
            })
        }

        return res.status(200).json({ isLogged: true,user })
    })


}
export {
    LoginResp,
    signupResp,
}