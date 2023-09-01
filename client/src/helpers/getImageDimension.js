const imageDimensions = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      resolve({ width, height });
    };

    img.onerror = () => {
      reject('There was some problem with the image.');
    };

    img.src = URL.createObjectURL(file);
  });

export const getInfo = async ({ target: { files } }) => {
  const [file] = files;

  try {
    return await imageDimensions(file);
  } catch (error) {
    console.error(error);
  }
};
