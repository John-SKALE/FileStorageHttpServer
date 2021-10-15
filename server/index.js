// https://expressjs.com/
/*

https://expressjs.com/en/4x/api.html#req
https://expressjs.com/en/4x/api.html#res

app.method("/my-path", function callback(request, response){
	response.json("whatever we want")
})

*/

const express = require("express");
const multer  = require('multer');
const path = require("path")

const getDirectoryContents = require("./methods/get-folder");
const createDirectory = require("./methods/create-folder");
const deleteDirectory = require("./methods/delete-folder");

const upload = multer({ dest: path.join(__dirname, 'uploads/') })

const app = express();

app.use(express.static('public'))

app.get("/", (req, res)=>{
	res.sendFile(
		path.join(__dirname, "public/index.html")
	)
})

app.get("/directory", async (req,res)=>{
	var directoryPath = req.query.directorypath;
	const results = await getDirectoryContents(directoryPath)
	res.json(results)
})

app.post("/directory", upload.none(), async (req, res)=>{
	var directoryPath = req.body.directorypath
	const results = await createDirectory(directoryPath);
	res.json(results);
})

app.delete("/directory", upload.none(), async (req, res)=>{
	var directoryPath = req.body.directorypath
	const results = await deleteDirectory(directoryPath);
	res.json(results);	
})

const getFile = require("./methods/get-file");
const createFile = require("./methods/create-file");
const deleteFile = require("./methods/delete-file");

app.get("/file", async (req, res)=>{
	var filePath = req.query.filepath;
	const results = await getFile(directoryPath)
	res.json(results)

})

app.post("/file", upload.single("file"), async (req, res)=>{
	var filePath = req.body.filepath;
	const results = await getFile(directoryPath)
	res.json(results)
	
})

app.delete("/file", upload.none(), async (req, res)=>{
	var filePath = req.body.filepath;
	const results = await deleteFile(filePath)
	res.json(results)
})


app.listen(process.env.PORT || 8080, ()=>{
	console.log("availabe at http://localhost:" + (process.env.PORT || 8080))
});
