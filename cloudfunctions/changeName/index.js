const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
exports.main = async (event, context) => {
    const { memberId } = event
    return await db.collection('members').doc(memberId).update({
        data: {
        name: '新名字'
        }
    })
}