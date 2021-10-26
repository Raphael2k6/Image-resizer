export const minifyImg = (dataUrl, newWidth, imageType = 'image/jpeg', resolve, imageArguments = 0.7) => {
    let image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;
    (new Promise((resolve) => {
        image = new Image();
        image.src = dataUrl;

        resolve('');
    })).then((d) => {
        oldWidth = image.width;
        oldHeight = image.height;
        newHeight = Math.floor((oldHeight / oldWidth) * newWidth);
        canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        newDataUrl = canvas.toDataURL(imageType, imageArguments);
        resolve(newDataUrl);
    });
};

export const imageUrlToFile = (ImageURL, name, sliceSize) => {
    sliceSize = sliceSize || 512;
    var block = ImageURL.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    var byteCharacters = atob(realData);
    var byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return new File([blob], name, {type: contentType});
};

export const handleResize = async (fileObject, callback) => {
    const reader = new FileReader();
    const maxUploadFileSize = 1048576;
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (fileObject.size > maxUploadFileSize && imageTypes.includes(fileObject.type)) {
        reader.addEventListener('load', async () => {
            minifyImg(
                reader.result,
                1000,
                fileObject.type,
                (data) => {
                    const newFile = imageUrlToFile(data, fileObject.name);
                    callback(newFile);
                });
        }, false);
    } else {
        callback(fileObject);
    }

    if (fileObject) {
        reader.readAsDataURL(fileObject);
    }
};
