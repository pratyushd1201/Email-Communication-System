const express = require('express');
const bodyParser = require('body-parser');
const postmark = require('postmark');

const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 3000;

const postmarkClient = new postmark.ServerClient('85ee4ea8-1d26-44b2-b843-4507c328e6d4');
app.options('*', cors())
app.use(bodyParser.json());

app.get("/simple-cors", cors(), (req, res) => {
    console.info("GET /simple-cors");
    res.json({
      text: "Simple CORS requests are working. [GET]"
    });
  });

app.post('/api/send-email', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { name, XYZ_services } = req.body;

    if (!name || !XYZ_services) {
        return res.status(400).send({ error: 'Name and XYZ_services are required' });
    }

    try {
        const response = await postmarkClient.sendEmailWithTemplate({
            From: 'pd.20u10367@btech.nitdgp.ac.in', // Replace with your sender email
            To: 'pd.20u10367@btech.nitdgp.ac.in', // Replace with your recipient email
            TemplateId: 36369499, // Replace with your template ID
            TemplateModel: {
                name: name,
                XYZ_services: XYZ_services
            }
        });
        res.status(200).send(response);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
