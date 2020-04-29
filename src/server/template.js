module.exports = ({ assets, body }) => `<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>The HTML5 Herald</title>
  <meta name="description" content="The HTML5 Herald">
  <meta name="author" content="SitePoint">
  <link rel="stylesheet" href="${assets.main.css}">
</head>

<body>
  <div id="app-root">${body}</div>
  <script type="text/javascript" src="${assets.main.js}"></script>
</body>
</html>
`
