const express = require('express');
const bodyParser = require('body-parser');
const postmark = require('postmark');
const path = require('path');

const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 3000;

const postmarkClient = new postmark.ServerClient('//My Postmark Token');
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
            From: 'pratyush.d1201@gmail.com', // Replace with your sender email
            To: 'pratyush.d1201@gmail.com', // Replace with your recipient email
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

const fs = require('fs');
const http = require('http');

// Prefer serving the production build if it exists, otherwise serve the raw public folder.
const buildDir = path.join(__dirname, '..', 'build');
const publicDir = fs.existsSync(buildDir) ? buildDir : path.join(__dirname, '..', 'public');

// Intercept raw requests that include %PUBLIC_URL% before Express attempts to decode params.
app.use((req, res, next) => {
    if (req.originalUrl && req.originalUrl.indexOf('/%PUBLIC_URL%/') === 0) {
        const rewritten = req.originalUrl.replace('/%PUBLIC_URL%', '');
        return res.redirect(rewritten);
    }
    next();
});

app.use(express.static(publicDir));

// Fallback to index.html for non-API routes (so client-side routing works)
app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

// Create an HTTP server that rewrites any literal %PUBLIC_URL% segments
// before Express sees the request so Express doesn't attempt to decode them.
const server = http.createServer((req, res) => {
    try {
        if (req.url && req.url.indexOf('/%PUBLIC_URL%/') === 0) {
            req.url = req.url.replace('/%PUBLIC_URL%', '');
        }
    } catch (e) {
        // If anything unexpected happens, continue and let Express handle errors.
    }
    app(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
