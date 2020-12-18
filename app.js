const http = require("http");
const url = require("url");
const fs = require("fs");

const lookup = require("mime-types").lookup;

const server = http.createServer((req, res) => {
	let parsedURL = url.parse(req.url, true);
	let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
	if (path == "") {
		path = "index.html";
	}

	let file = __dirname + "/public/" + path;
	fs.readFile(file, function (err, content) {
		if (err) {
			res.writeHead(404);
			res.end();
		} else {
			res.setHeader("X-Content-Type-Options", "nosniff");
			let mime = lookup(path);
			res.writeHead(200, { "Content-type": mime });
			res.end(content);
		}
	});
});

server.listen(3000, () => {
	console.log("Listening in port 3000");
});
