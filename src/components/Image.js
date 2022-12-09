const { default: isImageExist } = require("helper/isImageExist")
const { useEffect, useState } = require("react")

const Image = ({ path = '', alt = 'Image not found',...restProps }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const _image = await isImageExist(path)
            setImage(_image);
        })()
    }, [path]);
    return <img src={image} alt={alt} {...restProps}/>
}

export default Image