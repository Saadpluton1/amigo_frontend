import imageUrl from "utils/ImageUrl";

async function isImageExist(url) {
return new Promise((resolve) => {
    var img = new Image();
    img.addEventListener("load", () => {
        resolve(url)
    });

    img.addEventListener("error", () =>{
        resolve(imageUrl('noimage.png'))
    }
    );
    img.src = url;
    });
}

export default isImageExist;