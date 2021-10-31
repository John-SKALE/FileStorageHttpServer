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

app.get("/directory", async (req,res,next)=>{
	try {
		var directoryPath = req.query.directorypath;
		const results = await getDirectoryContents(directoryPath)
		res.json(results)		
	}catch(err){
		next(err);
	}
})

app.post("/directory", upload.none(), async (req, res, next)=>{
	try {
		var directoryPath = req.body.directorypath
		const results = await createDirectory(directoryPath);
		res.json(results);
	}catch(err){
		next(err)
	}
})

app.delete("/directory", upload.none(), async (req, res, next)=>{
	try {
		var directoryPath = req.body.directorypath
		const results = await deleteDirectory(directoryPath);
		res.json(results);	
	}catch(err){
		next(err)
	}
})

const getFile = require("./methods/get-file");
const createFile = require("./methods/create-file");
const deleteFile = require("./methods/delete-file");

app.get("/file", async (req, res, next)=>{
	try {
		var filePath = req.query.filepath;
		const results = await getFile(filePath)
		res.json(results)		
	}catch(err){
		next(err);
	}

})

app.post("/file", upload.single("file"), async (req, res, next)=>{
	try {
		var originPath = req.file;
		var filePath = req.body.filepath;
		console.log("origin file:", originPath);
		console.log("target file:", filePath);
		const results = await createFile(originPath.path,filePath)
		res.json(results)
	}catch(err){
		next(err)
	}
})

app.delete("/file", upload.none(), async (req, res, next)=>{
	try {
		var filePath = req.body.filepath;
		const results = await deleteFile(filePath)
		res.json(results)		
	}catch(err){
		next(err);
	}
})

app.use((err, req, res, next)=>{
	console.error(err);
	res.status(500);
	res.json({ error: err.message || err})

})


app.listen(process.env.PORT || 8080, ()=>{
	console.log("availabe at http://localhost:" + (process.env.PORT || 8080))
});
