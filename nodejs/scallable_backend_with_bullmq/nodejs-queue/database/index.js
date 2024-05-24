

const sendWhatsappMessage = async()=>{
   return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Message sent")
        },10)
    })
}

module.exports = sendWhatsappMessage