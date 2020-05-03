module.exports = ({ assets, body }) => `<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>The HTML5 Herald</title>
  <meta name="description" content="The HTML5 Herald">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
  <meta name="author" content="SitePoint">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${assets.main.css}">
</head>

<body>
  <div id="app-root">${body}</div>
  <script type="text/javascript" src="${assets.main.js}"></script>
</body>
</html>
`
