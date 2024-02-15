const { cloudinary } = require('../cloudinary');
const fs = require("fs");

module.exports.uploadToCloudinary = async (localPath) => {

    const folderName = "YelpCamp";
    const pathOnCloudinary = folderName + "/" + localPath.replace('uploads\\', '/');
    return cloudinary.uploader
        .upload(localPath, { public_id: pathOnCloudinary })
        .then((result) => {
            // Remove file from local uploads folder 
            fs.unlinkSync(localPath);
            return {
                message: "Success",
                url: result.url,
                filename: pathOnCloudinary.replace('//', '/')
            };
        })
        .catch((error) => {
            // Remove file from local uploads folder 
            fs.unlinkSync(localPath);
            return { message: error };
        });
}
