export const fileToB64 = (file) => new Promise(
    //https://gist.github.com/n1ru4l/dc99062577b746e0783410b1298ab897
    (resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }
);
export default fileToB64