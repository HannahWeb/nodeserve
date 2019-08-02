const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../../data/a.json')
const updateList = (listData = {}) => {

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath,JSON.stringify(listData),function(err){
            if (err) {
                console.log(err)
                reject()
            } else {
                resolve()
            }
        })
    })


}

const getList = (listData = {}) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', function (err, data) {
            if (err) {
                console.log(err)
                reject()
            } else {
                resolve(JSON.parse(data))
            }
        })
    })
}

module.exports = {
    updateList,
    getList
}
