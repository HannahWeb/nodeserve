const { updateList, getList } = require('../controller/list')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleListRouter = (req, res) => {
	const method = req.method

	// 更新列表
	if (method === 'POST' && req.path === '/api/list/update') {
		const result =  updateList(req.body)

		return result.then(data => {
			return new SuccessModel()
		}).catch(() => {
			return new ErrorModel('更新失败')
		})
	}

	// 查询列表
	if (method === 'GET' && req.path === '/api/list/get') {
		const result =  getList()

		return result.then(data => {
			return new SuccessModel(data)
		}).catch(() => {
			return new ErrorModel('更新失败')
		})
	}

}

module.exports = handleListRouter
