module.exports = mongoose => {
    const schema = mongoose.Schema({
            description: {type: String, require: true},
            type: {type: String, required: true},
            created_by: {type: String, require: true},
            created_at: {type: Date, default: Date.now}
        },
        {
            collection: 'log'
        });
    return mongoose.model('log', schema);
};