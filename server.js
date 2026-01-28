require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const setupSwaggerDocs = require('./swagger');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  next();
});

// Setup Swagger API documentation
setupSwaggerDocs(app);

// HTML view for displaying contacts
const contactsHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Contacts Dashboard</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #1e1e1e; color: #d4d4d4; }
        header { background: #2d2d2d; padding: 20px; text-align: center; border-bottom: 2px solid #3498db; }
        header h1 { color: #3498db; }
        .container { max-width: 1400px; margin: 20px auto; padding: 0 20px; }
        .nav { background: #252526; padding: 15px; margin: 20px 0; border-radius: 4px; border-left: 4px solid #3498db; }
        .nav a { display: inline-block; margin-right: 20px; color: #3498db; text-decoration: none; font-weight: 500; }
        .nav a:hover { text-decoration: underline; }
        .loading { text-align: center; padding: 40px; color: #858585; }
        .error { background: #3d2626; color: #f48771; padding: 20px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #f48771; }
        pre { background: #1e1e1e; border: 1px solid #3e3e42; padding: 20px; border-radius: 4px; overflow-x: auto; font-size: 14px; line-height: 1.6; }
        .string { color: #ce9178; }
        .number { color: #b5cea8; }
        .key { color: #9cdcfe; }
        .null { color: #569cd6; }
        .contact-item { background: #252526; padding: 20px; margin: 15px 0; border-left: 4px solid #3498db; border-radius: 4px; }
        .contact-item pre { margin: 10px 0; padding: 15px; background: #1e1e1e; }
      </style>
    </head>
    <body>
      <header>
        <h1>📋 All Contacts</h1>
      </header>
      <div class="container">
        <div class="nav">
          <a href="/api-docs">📖 API Docs</a>
          <a href="/companies">🏢 Companies</a>
        </div>
        <div id="content">
          <div class="loading">Loading contacts...</div>
        </div>
      </div>
      <script>
        function syntaxHighlight(json) {
          json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key';
              } else {
                cls = 'string';
              }
            } else if (/true|false/.test(match)) {
              cls = 'null';
            } else if (/null/.test(match)) {
              cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
          });
        }

        fetch('/contacts')
          .then(r => r.json())
          .then(data => {
            const content = document.getElementById('content');
            if (data.length === 0) {
              content.innerHTML = '<div class="error">No contacts found</div>';
            } else {
              let html = '<div style="color: #858585; margin: 20px 0; font-size: 14px;">Total: ' + data.length + ' contacts</div>';
              data.forEach((contact, index) => {
                const jsonStr = JSON.stringify(contact, null, 2);
                html += '<div class="contact-item"><pre>' + syntaxHighlight(jsonStr) + '</pre></div>';
              });
              content.innerHTML = html;
            }
          })
          .catch(err => {
            document.getElementById('content').innerHTML = '<div class="error">Error loading contacts: ' + err.message + '</div>';
          });
      </script>
    </body>
    </html>
`;

// Root endpoint - serve contacts HTML view
app.get('/', (req, res) => {
  res.send(contactsHtml);
});

app.use('/', require('./routes'));
    

  mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    }
    else {
      app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`);});
    }
  });