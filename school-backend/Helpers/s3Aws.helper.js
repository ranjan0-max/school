const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const path = require('path');

// Server Crads from Env
const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Upload File In AWS...

/**
 *
 * @param {Binary file} file
 * @param {folder name string} folder
 * @param {universaly unique identification string } nameId
 * @returns
 */

const uploadFile = (file, folder, nameId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!file) {
                return reject(new Error('No file provided'));
            }

            const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedFileTypes.includes(file.mimetype)) {
                return reject(new Error('Unsupported file type'));
            }

            const extension = path.extname(file.originalname).slice(1);
            const fileName = `${folder.toLowerCase()}/${nameId || Math.floor(Math.random() * 1000000000)}-${Date.now()}.${extension}`;

            const command = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype
            });

            await client.send(command);
            resolve(fileName);
        } catch (error) {
            console.error('UploadError:', error);
            reject(error);
        }
    });
};

// Get File From AWS...(URL FOR 60 MINTS)

const getTempUrl = async (fileName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: fileName
            });
            const url = await getSignedUrl(client, command, { expiresIn: 3600 });
            resolve(url);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const s3Delete = function (fileName) {
    return new Promise((resolve, reject) => {
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: fileName
        };

        const command = new DeleteObjectCommand(deleteParams);

        client.send(command, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = {
    uploadFile,
    getTempUrl,
    s3Delete
};
