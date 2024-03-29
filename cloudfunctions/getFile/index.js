// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    console.log('event', event)
    const { fileID } =  event
    const res = await cloud.downloadFile({
        fileID,
    })
    console.log('res', res)
    const buffer = res.fileContent
    return buffer
}