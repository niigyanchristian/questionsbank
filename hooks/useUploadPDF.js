const {getStorage, ref, getDownloadURL,uploadBytesResumable, deleteObject} = require('firebase/storage');
const app = require('../firebase');

const storage = getStorage(app);
const uploadPDF = async (file)=>{

    const dateTime = Date().toString();

    const storageRef = ref(storage, `files/${file.originalname+ " "+ dateTime}`);
    const metadata = {
        contentType: file.mimetype,
    };
    const snapshopt = await uploadBytesResumable(storageRef, file.buffer,metadata);
    const downloadURL = await getDownloadURL(snapshopt.ref);

    return downloadURL;

}
const deletePDF = async (pdf)=>{
    const desertRef = ref(storage, pdf);
    deleteObject(desertRef).then(async () => {
        // File deleted successfully
        console.log("PDF has been deleted successfuly !!!!");
        return true;
      }).catch(async (error) => {
        console.log("Error occured in PDF deletion !!!!",error);
        return false;
      });

}


module.exports = {
    uploadPDF,
    deletePDF
}