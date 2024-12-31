import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const Upload = () => {

    const [text, setText] = useState("");
    const [text1, setText1] = useState("");
    console.log("asdfasdfads", text);

    //   const history = useHistory();

    const fileInputRef = useRef(null);
    const fileInputRef1 = useRef(null);

    const [selectedFile, setSelectedFile] = useState();
    const [imageData, setImageData] = useState([]);
    const [collectionName, setcollectionName] = useState("testCollection");

    const [inputs, setInputs] = useState({
        title: "",
        supply: "",
        // description: "",
        cost: "",
        propertyPrice: "",
        maxMintAmount: "",
        metadata: "",
        location: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        annualRentalIncome: "",
        overviewText: "",
        generalInfo: "",
        // add more fields as
        file: null,
        file1: [],
    });
    const [show, setShow] = useState(false);

    console.log("inputsss", inputs);
    const setEditor = (data) => {
        console.log("we get here is ", data);
        setInputs({ ...inputs, description: data, length: data.length - 8 });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [thumbnailImg, setThumbnailImg] = useState(null);
    const [galleryIMG, setGalleryIMG] = useState(null);

    console.log(galleryIMG, thumbnailImg, "imagesssssss");

    // const handleFileUpload = (event, type) => {
    //   const file = event.target.files[0];

    //   console.log(file, "fileeeeee......");

    //   const selectedFiles = Array.from(event.target.files);

    //   if (selectedFiles.length === 0) return; // If no files are selected, exit the function.

    //   setSelectedFile((prevFiles) => [
    //     ...(Array.isArray(prevFiles) ? prevFiles : []),
    //     ...selectedFiles,
    //   ]);

    //   if (file) {
    //     if (type === 'thumbnail') {
    //       const imageUrl1 = URL?.createObjectURL(file);
    //       console.log(file, "fileeeeee...... 1111");
    //       setThumbnailImg(imageUrl1);

    //       setInputs({ ...inputs, file }); // Set thumbnail image
    //     } else if (type === 'gallery') {
    //       // setSelectedFile(file);
    //       setImageData({ ...inputs });
    //       const imageUrl2 = URL?.createObjectURL(file);
    //       console.log(file, "fileeeeee...... 2222");
    //       const imageUrl3 = URL?.createObjectURL(file);
    //       setGalleryIMG(imageUrl2)

    //       setInputs({ ...inputs, file1: file }); // Set gallery image
    //     }
    //   }
    // };

    const [galleryimages, setGalleryImages] = useState([]);

    const handleFileUpload = (event, type) => {
        const files = event.target.files;
        console.log(files, "fileseeeee......");
        const selectedFiles = Array.from(event.target.files);

        if (files.length === 0) return; // Agar koi file select nahi hui toh function exit karein.
        if (type === "thumbnail") {
            const file = files[0]; // Thumbnail ke liye sirf ek file
            const imageUrl = URL?.createObjectURL(file);
            setThumbnailImg(imageUrl);
            setInputs((prevInputs) => ({ ...prevInputs, file })); // Thumbnail set karein

            if (selectedFiles.length === 0) return; // If no files are selected, exit the function.

            setSelectedFile((prevFiles) => [
                ...(Array.isArray(prevFiles) ? prevFiles : []),
                ...selectedFiles,
            ]);
        } else if (type === "gallery") {
            const selectedFiles = Array.from(files); // Gallery ke liye multiple files
            const galleryUrls = selectedFiles.map((file) =>
                URL?.createObjectURL(file)
            );
            setGalleryImages((prevGallery) => [...prevGallery, ...galleryUrls]); // Add new images to state
            setInputs((prevInputs) => ({
                ...prevInputs,
                file1: [...prevInputs.file1, ...selectedFiles], // Add new files to inputs
            }));
            setImageData({ ...inputs });
        }
    };

    // console.log(galleryimages, "galleryimagesgalleryimagesgalleryimages");

    // const handleGalleryImages = (event) => {
    //   const files = event.target.files;
    //   console.log(files, "fileseeeee......");

    //   const selectedFiles = Array.from(files); // Gallery ke liye multiple files
    //   const galleryUrls = selectedFiles.map((file) => URL?.createObjectURL(file));
    //   setGalleryImages((prevGallery) => [...prevGallery, ...galleryUrls]); // Add new images to state
    // };

    //api

    //  ========================================================= IPFS ======================================================= //

    let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkY2M5MGVjNC04NWYwLTRjZjktODg3ZS03NmM5MzJiMjMzYjkiLCJlbWFpbCI6InVzbWFuLm1hbGlrbnUxM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmJiZDFkZmM3YWI2ZDg0MzEwY2UiLCJzY29wZWRLZXlTZWNyZXQiOiI3ODNhMmMyOGY5Yzc4OGRmNGE3ZDQ4YjU2N2NjNzUwYjRkMWZjMDM0OWI0MGFjYzYwZjhjOTQ1ZmM4ZmI3MDE4IiwiZXhwIjoxNzYyODY5Mzk4fQ.hIRx3GiuH5vbStB6kuLL4Z9tiDRTyuRmPi4SPTOOi5I";
    const apikey = "2bbd1dfc7ab6d84310ce";
    const secretapikey =
        "783a2c28f9c788df4a7d48b567cc750b4d1fc0349b40acc60f8c945fc8fb7018";

    const [loader, setLoader] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState("");
    const [metaHash, setMetaHash] = useState("");

    const [existingHashes, setexistingHashes] = useState(null);

    // const selectMultipulImages = (e) => {
    //     const selectedFiles = Array.from(e.target.files);
    //     console.log(selectedFiles, "selectedFiles in fun");

    //     setSelectedFile(selectedFiles);
    // };

    const handleImageChange = async () => {
        // debugger
        console.log("Starting image upload process", selectedFile);

        if (!selectedFile || selectedFile.length === 0) {
            //   toast.error("No images selected.");
            return;
        }

        setLoader(true);
        setLoaderMessage("Uploading Images to IPFS...");

        const existingHashes111 = [];

        // const existingHashes = JSON.parse(localStorage.getItem("fileHashes") || "[]");
        console.log("here are we", selectedFile);

        try {
            if (selectedFile) {
                for (let i = 0; i < selectedFile?.length; i++) {
                    console.log(`Uploading image ${i + 1} of ${selectedFile.length}`);

                    const formData = new FormData();
                    formData.append("file", selectedFile[i]); // Append only the current file
                    const options = { pinataOptions: { cidVersion: 0 } };
                    formData.append("pinataOptions", JSON.stringify(options));
                    console.log("here are we 2");
                    const response = await fetch(
                        "https://api.pinata.cloud/pinning/pinFileToIPFS",
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            body: formData,
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`Failed to upload image ${i + 1}`);
                    }

                    const { IpfsHash } = await response.json();
                    if (IpfsHash) {
                        existingHashes111.push(IpfsHash);
                        console.log(`Image ${i + 1} uploaded successfully: ${IpfsHash}`);
                    } else {
                        throw new Error(`Failed to get IPFS hash for image ${i + 1}`);
                    }
                }
                // localStorage.setItem("fileHashesmm", 'hello  111');
                console.log("========>", existingHashes111);

                if (existingHashes111?.length > 0) {
                    setexistingHashes(existingHashes111);
                    localStorage.setItem("fileHashes", JSON.stringify(existingHashes111));
                }

                if (existingHashes111?.length > 0) {
                    //   toast.success("All images uploaded successfully!");
                    console.log("All IPFS hashes:", existingHashes111);
                }

                console.log(
                    existingHashes111,
                    "existingHashesexistingHashesexistingHashesexistingHashes"
                );

                return existingHashes111;
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            //   toast.error(`Failed to upload images: ${error.message}`);
        } finally {
            setLoader(false);
        }
    };

    async function upload() {
        const ipfsImgres = await handleImageChange();
        console.log(ipfsImgres, "ipfsImgres");

        const existingHashes = JSON.parse(localStorage.getItem("fileHashes"));
        const uploadedMetadataUrls = [];
        const metadataHashes = []; // Initialize an array to store metadata hashes

        try {
            // Prepare FormData with the JSON file
            const formDataMetadata = new FormData();
            // formDataMetadata.append("file", metadataFile, `${collectionName}/${i}`);

            console.log("here 0");
            // for (let i = 0; i < imageData.length; i++) {
            // const image = inputs;
            // const ipfsImageUrl = `https://ipfs.io/ipfs/${existingHashes[i]}/`;
            const ipfsImageUrl = `ipfs://${existingHashes[1]}`;
            console.log("here 1");
            // Create metadata object
            const metadata1 = {
                name: inputs.title,
                description: inputs.generalInfo,
                image: ipfsImageUrl,
                price: inputs.propertyPrice,
                id: 1,
            };
            console.log("here 2");

            // Convert metadata object to JSON and then to Blob
            const metadataJson = JSON.stringify(metadata1);
            const metadataBlob = new Blob([metadataJson], { type: "text/plain" });
            const metadataFile = new File([metadataBlob], `metadata-${1}.json`, {
                type: "text/plain",
            });
            console.log("here 3");

            formDataMetadata.append("file", metadataFile, `${collectionName}/${1}`);

            const metadata = JSON.stringify({
                name: collectionName,
            });
            console.log("here 6");

            formDataMetadata.append("pinataMetadata", metadata);

            const options = JSON.stringify({
                cidVersion: 0,
            });
            formDataMetadata.append("pinataOptions", options);

            // Upload the metadata file to Pinata
            const metadataUploadResponse = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS/",
                formDataMetadata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                        pinata_api_key: `${apikey}`,
                        pinata_secret_api_key: `${secretapikey}`,
                    },
                }
            );

            // Extract the IPFS hash for the metadata and form the URL
            const metadataIpfsHash = metadataUploadResponse.data.IpfsHash;
            const metadataIpfsUrl = `https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}/`;

            console.log(
                metadataUploadResponse,
                "metadataUploadResponse okokokokok.........."
            );

            uploadedMetadataUrls.push(metadataIpfsUrl);

            if (metadataIpfsHash) {
                metadataHashes.push(metadataIpfsHash); // Add hash to array
            } else {
                // toast.error("Failed to obtain IPFS hash for an image.");
            }

            localStorage.setItem("metadataHashes", JSON.stringify(metadataHashes));
            setMetaHash(JSON.stringify(metadataHashes));
            // localStorage.removeItem("fileHashes");  // Optionally, clear the image hashes

            const imgHashes = localStorage?.getItem("fileHashes");
            console.log(
                imgHashes,
                "fileHashes fileHashesfileHashesfileHashesfileHashesfileHashes"
            );

            // All metadata has been uploaded successfully
            console.log("All metadata uploaded successfully:", uploadedMetadataUrls);
            //   toast.success("All metadata uploaded successfully!");
            setLoader(false);
            setLoaderMessage("");

            // settoggle(!toggle);

            return metadataHashes;
        } catch (error) {
            console.error("Error during metadata upload:", error);
            //   toast.error("Error during metadata upload");
            setLoader(false);
            setLoaderMessage("");
            return null;
        }
    }

    //  ========================================================= IPFS ======================================================= //


    return (
        <>
            <div className="content">
                <section className="addnewproduct">
                    <div className="mainleftright">
                        <div className="leftside">
                            <div className="rightside">
                                <div className="innerrighrtside">
                                    <div className="updodngouterdiv">
                                        <div className="outtter_upload">
                                            <h3>Thumbnail Image</h3>
                                            <div className="uplood__div">
                                                <div className="dashedborderdiv">
                                                    <div
                                                        className="uploadbody"
                                                        style={{ position: "relative" }}
                                                        onClick={() => fileInputRef1.current.click()}
                                                    >
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef1}
                                                            style={{ display: "none" }}
                                                            onChange={(e) => handleFileUpload(e, "thumbnail")}
                                                        // onChange={(e) => hanldeImg(e)}
                                                        />
                                                        {thumbnailImg ? (
                                                            <>
                                                                {/* <label htmlFor="asdfasf">
                                  </label> */}
                                                                <img
                                                                    src={thumbnailImg}
                                                                    onClick={(e) =>
                                                                        handleFileUpload(e, "thumbnail")
                                                                    }
                                                                />
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setThumbnailImg(null);
                                                                    }}
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "5px",
                                                                        right: "5px",
                                                                        backgroundColor: "rgba(255, 0, 0, 0.8)",
                                                                        color: "white",
                                                                        border: "none",
                                                                        borderRadius: "50%",
                                                                        width: "18px",
                                                                        height: "18px",
                                                                        cursor: "pointer",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                                                                        fontSize: "12px",
                                                                        fontWeight: "bold",
                                                                        lineHeight: "1",
                                                                    }}
                                                                >
                                                                    &times; {/* HTML entity for a close icon */}
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="29"
                                                                height="28"
                                                                viewBox="0 0 29 28"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M11 11.6667C12.2887 11.6667 13.3333 10.622 13.3333 9.33333C13.3333 8.04467 12.2887 7 11 7C9.71133 7 8.66666 8.04467 8.66666 9.33333C8.66666 10.622 9.71133 11.6667 11 11.6667Z"
                                                                    stroke="black"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                                <path
                                                                    d="M15.6667 2.3335H11C5.16668 2.3335 2.83334 4.66683 2.83334 10.5002V17.5002C2.83334 23.3335 5.16668 25.6668 11 25.6668H18C23.8333 25.6668 26.1667 23.3335 26.1667 17.5002V11.6668"
                                                                    stroke="black"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                                <path
                                                                    d="M21.5 2.3335V9.3335L23.8333 7.00016"
                                                                    stroke="black"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                                <path
                                                                    d="M21.5 9.33333L19.1667 7"
                                                                    stroke="black"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                                <path
                                                                    d="M3.61499 22.1083L9.36666 18.2467C10.2883 17.6283 11.6183 17.6983 12.4467 18.41L12.8317 18.7483C13.7417 19.53 15.2117 19.53 16.1217 18.7483L20.975 14.5833C21.885 13.8017 23.355 13.8017 24.265 14.5833L26.1667 16.2167"
                                                                    stroke="black"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>
                                                        )}

                                                    </div>
                                                    {/* <div>
                                                        <h2>Click to upload</h2>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {galleryimages?.length > 0 && (
                                    <div className="mainouteruploddiv_prnt">
                                        <h3 style={{ paddingTop: "2rem", paddingBottom: "0px " }}>
                                            Uploaded Gallery Images
                                        </h3>

                                        <div
                                            className="mainouteruploddiv"
                                            style={{
                                                paddingLeft: "15px",
                                            }}
                                        >
                                            {galleryimages?.length > 0 &&
                                                galleryimages.map((image, index) => (
                                                    <div
                                                        className="inerimgdiv"
                                                        style={{ position: "relative" }}
                                                        key={index}
                                                    >
                                                        <img
                                                            className="uplodeimg"
                                                            src={image}
                                                            alt={`uploaded-${index}`}
                                                            style={{
                                                                width: "100px",
                                                                height: "100px",
                                                                objectFit: "cover",
                                                                border: "1px solid #ccc",
                                                                borderRadius: "5px",
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                setGalleryImages(
                                                                    (prevImages) =>
                                                                        prevImages.filter((_, i) => i !== index) // Remove the image at this index
                                                                )
                                                            }
                                                            style={{
                                                                position: "absolute",
                                                                top: "5px",
                                                                right: "5px",
                                                                backgroundColor: "rgba(255, 0, 0, 0.8)",
                                                                color: "white",
                                                                border: "none",
                                                                borderRadius: "50%",
                                                                width: "18px",
                                                                height: "18px",
                                                                cursor: "pointer",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                                                                fontSize: "12px",
                                                                fontWeight: "bold",
                                                                lineHeight: "1",
                                                            }}
                                                        >
                                                            &times; {/* HTML entity for a close icon */}
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="productdiv">
                                <p className="pt-0"> Name</p>
                                <input
                                    type="text"
                                    placeholder=" Name"
                                    className="appleinput"
                                    value={inputs.title}
                                    onChange={(e) =>
                                        setInputs({ ...inputs, title: e.target.value })
                                    }
                                />

                                <p>Price</p>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Price"
                                    className="appleinput"
                                    value={inputs.cost}
                                    onChange={(e) =>
                                        setInputs({ ...inputs, cost: e.target.value })
                                    }
                                    onWheel={(e) => e.target.blur()} // Prevent number input scroll behavior
                                />

                                <p>Description</p>
                                <textarea
                                    class="form-control"
                                    placeholder="Description"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={inputs.generalInfo}
                                    onChange={(e) =>
                                        setInputs({ ...inputs, generalInfo: e.target.value })
                                    }
                                ></textarea>
                            </div>
                            <div className="mainbuttonpro ">
                                <button
                                    className=" privew"
                                    type="submit"
                                    onClick={() => upload()}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        metaHash ?
                            <div className=" phonebutttton">
                                {metaHash}
                            </div>
                            : null
                    }
                </section>
            </div>
        </>
    );
};

export default Upload;
