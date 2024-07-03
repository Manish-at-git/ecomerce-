import React, { useState } from "react";
import { useAddImagesMutation } from "../../Slices/admin/images";
import { Input } from "@nextui-org/react";

const ImageUpload = ({ imagePaths, setImagePaths }) => {
  const [previews, setPreviews] = useState([]);
  const [uploadImage] = useAddImagesMutation();

  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const response = await uploadImage(formData).unwrap();
      setImagePaths([...imagePaths, response.path]);
      setPreviews([...previews, URL.createObjectURL(e.target.files[0])]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} className="flex justify-center items-center'" />
      {previews.length ? previews.map((item) =>  <img src={item} alt="Preview" width="100" />) : <></>}
    </div>
  );
};

export default ImageUpload;


// import React, { useState, useEffect } from "react";

// const UploadAndDisplayImage = () => {
//   const [images, setImages] = useState([]);
//   const [imageURLS, setImageURLs] = useState([]);
//   console.log(images, "images")

//   useEffect(async () => {
//     if (images.length < 1) return;
   
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);

//     try {
//       const response = await uploadImage(formData).unwrap();
//       setImagePath(response.path);
//       setPreview(URL.createObjectURL(e.target.files[0]));
//       const newImageUrls = [];
//       images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
//       setImageURLs(newImageUrls);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
    
//   }, [images]);

//   function onImageChange(e) {
//     setImages(e.target.files]);
//   }

//   return (
//     <>
//       <input type="file" multiple accept="image/*" onChange={onImageChange} />
//       {imageURLS.map((imageSrc) => (
//         <img src={imageSrc} alt="not fount" width={"250px"} />
//       ))}
//     </>
//   );
// };

// export default UploadAndDisplayImage;