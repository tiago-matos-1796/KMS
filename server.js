const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(function (req, res, next) {
    res.setHeader("X-Powered-By", "ASP.NET");
    return next();
});

const db = require('./models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database!");
})
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
async function check() {
    const svm = await db.auth.find({_id: 'secure-vote'});
    if(svm.length === 0) {
        const auth = new db.auth({
            _id: process.env.ACCESS_USER,
            token: process.env.ACCESS_TOKEN
        });
        auth.save(auth);
    }
}
check();
require('./routes/keys.routes')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});