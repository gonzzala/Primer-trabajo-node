function validatorLogin(req, res, next) {
      const token = req.headers['access-token'];
      if (token) {
         jwt.verify(token, req.app.get('key'), (err, decoded) => {   
          req.decoded = decoded;    
           if (err) {
             next(res.status(500).json({message: 'invalid token'}));
           } 
             else {
             next();
             }
            
         });
        }
       }

module.exports = validatorLogin;