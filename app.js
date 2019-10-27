const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'dist')));

//signup route
app.post('/signup', (req, res) => {
    const {
        firstName,
        lastName,
        email
    } = req.body;

    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }

    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const postData = JSON.stringify(data);

    const options = {

        url: 'https://us20.api.mailchimp.com/3.0/lists/5402b159e6',
        method: 'POST',
        headers: {
            Authorization: 'auth 6a8bf5fd67e5253bb32d39cffb917764-us20'
        },
        body: postData
    }
    request(options, (err, response) => {
        if (err) {
            res.redirect('/fail.html');
        
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success.html');
                console.log(err);
                
            } else {
                res.redirect('/fail.html');
    
            }
        }
    })
console.log(req.body);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));