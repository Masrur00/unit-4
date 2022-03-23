const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(`mongodb+srv://mas_alam:arif9718masai@cluster-masai.x7vfv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
}