const { exec } = require("child_process");
console.log("App Listen on port", process.env.APP_PORT)
console.log(process.env.DATABASE_USER)

exec("npm run start:dev", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});