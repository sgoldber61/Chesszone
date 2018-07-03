const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  const user = this;
  
  bcrypt.genSalt(SALT_WORK_FACTOR).then((salt) => bcrypt.hash(user.password, salt)
  ).then((hash) => {
    user.password = hash;
    next();
  }).catch((err) => console.log(err));
});

userSchema.methods.comparePassword = function(candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
