import express, { urlencoded } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4000;
const hostname = "127.0.0.1";
const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
app.use(urlencoded({extended: false}));
app.use(express.json());

async function imageGenerator() {
    const image = await axios.get("https://api.unsplash.com/photos/random", {
        params: { client_id: unsplashAccessKey },
    });

    // console.log(image.data.urls.regular);
    return image.data.urls.regular;
}

app.get("/api/random/image", async (req, res) => {
    try {
        const img = await imageGenerator();
        res.json({img});
    }
    catch(error) {
        console.log("Error catching random image: " + error);
        res.status(500).json({error});
    }
});

app.listen(port, hostname, () => {
    console.log("Server started at posrt: " + port);
});
