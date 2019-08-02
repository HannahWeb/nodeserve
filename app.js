const querystring = require('querystring')
const handleListRouter = require('./src/router/list')


// 用于处理 post data
const getPostData = (req) => {
	const promise = new Promise((resolve, reject) => {
		if (req.method !== 'POST') {//如果不是post方法,设置resolve参数为空并执行
			resolve({})
			return
		}
		if (req.headers['content-type'] !== 'application/json') {
			resolve({})
			return
		}
		let postData = ''
		req.on('data', chunk => {//node 自带事件，侦听post数据流
			postData += chunk.toString()
		})
		req.on('end', () => {//侦听事件流结束
			if (!postData) {//如果事件流结束也没有值 设置resolve参数为空并执行
				resolve({})
				return
			}
			resolve(
				JSON.parse(postData)
			)
		})
	})
	return promise
}

const serverHandler = (req, res) => {
	// 设置返回格式为JSON
	res.setHeader('Content-type', 'application/json')

	// 处理req
	const url = req.url
	req.path = url.split('?')[0]//请求地址？前的内容

	// 解析query == GET
	req.query = querystring.parse(url.split('?')[1])//如果是？nm='x'&&age=10,解析参数为json

	// 处理 post data
	getPostData(req).then(postData => {
		req.body = postData
		// 处理list router
		const listResult = handleListRouter(req, res)
		if (listResult) {
			listResult.then((result) => {
				res.end(
					JSON.stringify(result)
				)
			})
			return
		}
		// router匹配失败，404 处理
		res.writeHead(404, {'Content-type': 'text/plain'})
		res.write('404 Not Found\n')
		res.end()
	})




}

module.exports = serverHandler
