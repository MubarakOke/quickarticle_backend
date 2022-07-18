const decodeToken= require('./decodeToken')


module.exports = async (req)=>{
    const token= req.headers.authorization
    let decodedID= null
    try{
        decodedID= await decodeToken(token.split(' ')[1])
        return decodedID
    }
    catch{
        return decodedID
    }
}