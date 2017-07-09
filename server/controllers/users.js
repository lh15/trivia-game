var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
    register: function (req, res) {
        var newUser = new User({ first_name: req.body.first_name, last_name: req.body.last_name,  email: req.body.email, password: req.body.pw });
        // save triggers validations then pre then saves to db
        newUser.save(function (err) {
            if (err) {
                res.json({ errors: err });
            } else {
                res.json({ user: newUser });
            }
        })
    },
    login: function (req, res) {
        console.log(req.body);
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                console.log(err);
                res.json({ errors: err });
            } else if (!user) {
                console.log("user not found");
                res.json({ errors: "The user does not exist" });
            }
            else {
                console.log("user exists");
                // test a password using bcrypts async method
                user.comparePassword(req.body.pw, function (err, isMatch) {
                    if (err) {
                        console.log(err);
                        res.json({ errors: err });
                    }
                    else if (isMatch){
                        res.json({ user: user });
                    }
                    else{
                        res.json({ errors: "Password does not match" });
                    }
                });
            }

        });
    },
}