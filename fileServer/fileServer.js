const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());


// Upload Endpoint
app.post('/upload', (req, res) => {

    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded'})
    }

    const file = req.files.file;
    const fileNameSplit = file.name.split('.');
    const timestampFilename = fileNameSplit[0] + '-' + Date.now() + '.' + fileNameSplit[1]


    file.mv(`${__dirname}/public/uploads/${timestampFilename}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err)
        }

        res.json({ fileName: timestampFilename, filePath: `/uploads/${timestampFilename}` })
    })
});

app.listen(4300, () => console.log('File Server started...'));