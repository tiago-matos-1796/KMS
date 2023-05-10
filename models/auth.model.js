module.exports = mongoose => {
    const schema = mongoose.Schema({
            _id: {type: String, require: true},
            token: {type: String, required: true},
        },
        {
            collection: 'auth'
        });
    return mongoose.model('auth', schema);
};


