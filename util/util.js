import axios from "axios";
import fs from "fs";
import jimp from "jimp";

export async function filterImageFromURL(inputURL) {

    return new Promise(async (resolve, reject) => {
        try {
            const imageBuffer = await axios({
                method: 'get',
                url: inputURL,
                responseType: 'arraybuffer'
            });
            const photo = await jimp.read(imageBuffer.data);

            const outpath =
                "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
            await photo
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .write(outpath, (img) => {
                    resolve(outpath);
                });

        } catch (error) {
            reject(error);
        }
    });
}

export async function deleteLocalFiles(files) {
    for (let file of files) {
        fs.unlinkSync(file);
    }
}