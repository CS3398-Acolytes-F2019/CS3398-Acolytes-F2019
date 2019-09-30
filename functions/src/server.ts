import app from "./index";

function requestHandler()
{
    const port: number = 80;
    console.log(`App is running at http://localhost:${port}`);
    console.log("Press CTRL-C to stop\n");
}

const server = app.listen(80, requestHandler)

export default server;