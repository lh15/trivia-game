// require mongoose
var mongoose = require('mongoose');
// // define Schema variable
var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// define User Schema
var UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true, minlength: 2 },
    last_name: { type: String, required: true, minlength: 2 },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String, required: true, validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
            }, message: "Password failed validation. Must have number, upper and special, between 8-32 chars"
        }
    }
}, { timestamps: true });

//hash pass before saving
UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        //this uses the bcrypt async version
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
//compare passwords
// cb is an optional callback to be fired once the data has been compared. uses eio making it asynchronous. If cb is not specified, a Promise is returned if Promise support is available.
// err - First parameter to the callback detailing any errors.
// isMatch - Second parameter to the callback providing whether the data and encrypted forms match [true | false].
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {return cb(err)};
        cb(null, isMatch);
    });
};
// register the schemas as models
// set our models by passing them their respective Schemas
mongoose.model('User', UserSchema);

// store our models in variables
var User = mongoose.model('User');
