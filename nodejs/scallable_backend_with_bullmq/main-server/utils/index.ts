
 type emailPayload = {
    from:string,
    to:string,
    subject:string,
    body:string
}
export async function addUserToCourse(){
    console.log("Added to course...")
}

export async function sendEmailSync(email:emailPayload){
    await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Email Sent Successfully")
        },2000)
    })

}