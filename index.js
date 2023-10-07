import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';

const app = express();
const PORT = process.env.PORT || 8082;
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
})
app.get('/filteredimage', async (req, res) => {
    let { image_url } = req.query;
    console.log(image_url)
    if (!image_url) {
        console.log("URL is Valid")
        res.status(400).send('Image URL is required');
    }
    let filteredImage;
    try {
        filteredImage = await filterImageFromURL(image_url);
        console.log(filteredImage);
        if (filteredImage === "error") {
            res.status(415).send('URL is not an Image');
        }
        else {
            console.log('Process completed');
            res.status(200).sendFile(filteredImage);
            setTimeout(() => {
                deleteLocalFiles([filteredImage])
            }, 1500)
        }
    } catch (e) {
        console.error(e);
        res.status(415).send('An error occur');
    }

})
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});