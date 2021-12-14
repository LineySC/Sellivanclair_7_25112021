const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === "feed_image") callback(null, "./images/feed/");
        else if (file.fieldname === "profil_image") callback(null, "./images/profils/");
        else{
            console.log("Errueur dans la destination")
        }
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

module.exports = upload