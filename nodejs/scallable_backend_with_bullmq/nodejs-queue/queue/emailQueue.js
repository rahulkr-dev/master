const { Worker } = require("bullmq");
const sendWhatsappMessage = require("../database");
let count =0
const emailWorker = new Worker("email-queue", async (job) => {
    try {
        const res = await sendWhatsappMessage();
        count++
        if(count % 60 ==0){
            console.log(count)
        }
    } catch (error) {
        console.error("Error occurred while processing email job:", error);
    }
}, {
    connection: {
        host: "localhost",
        port: 6379,
    },
    limiter: {
        max: 100,
        duration: 1000,
    },
    removeOnComplete:{
        count:100
    }
});

module.exports = emailWorker;
