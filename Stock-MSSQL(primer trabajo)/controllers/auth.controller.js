const {boom, isBoom} = require('@hapi/boom');
const AuthService = require('../services/auth.service');

module.exports = {

  auth: async = (req, res) => {

    return AuthService.auth(req.body.email, req.body.password).then(function(value) {
        const payload = { check:  true};
        const token = jwt.sign(payload, req.app.get('key'), { expiresIn: 1440 });
        return res.status(200).json({id : value.id,  message: value.message, token: token})
    })
    .catch(function(err) {
        if(err.isBoom)
        return res.status(err.output.payload.statusCode).json(err.output.payload.message)
        else
        return res.status(500).json({message: "server error!"})
     
      })
    }
}


