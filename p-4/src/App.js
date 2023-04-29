import { useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import Modal from "./components/Modal";

const override = {
  position: "fixed",
  top: "47%",
  left: " 47%",
  zIndex: "9999",
};

function App() {
  const surpriseMe = [
    "An image that showcases the power and potential of AI, depicting a futuristic world where intelligent machines and humans coexist in harmony.",
    "An image that represents the concept of blockchain, using vibrant colors and geometric shapes to convey the idea of a secure and decentralized digital ledger.",
    "A serene and calming nature scene with a cascading waterfall in the background and a family of deer grazing in the foreground.",
    "A majestic mountain range at sunset, with the sun casting a warm glow over the rugged peaks and valleys.",
    "A colorful and vibrant underwater scene with a school of exotic fish swimming through coral reefs and sea plants.",
  ];
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // let width = img.width;
          // let height = img.height;
  
          // // Calculate the new width and height
          // if (width > height) {
          //   if (width > maxWidth) {
          //     height *= maxWidth / width;
          //     width = maxWidth;
          //   }
          // } else {
          //   if (height > maxHeight) {
          //     width *= maxHeight / height;
          //     height = maxHeight;
          //   }
          // }
  
          // Set the new width and height of the canvas
          canvas.width = maxWidth;
          canvas.height = maxHeight;
  
          // Draw the uploaded image onto the canvas and resize it
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
  
          // Convert the canvas to a new resized image
          canvas.toBlob((blob) => {
            const newFile = new File([blob], file.name, { type: 'image/png' });
            resolve(newFile);
          }, 'image/png', 0.75);
        };
      };
    });
  }

  async function uploadImage(e) {
    let resizedFile = await resizeImage(e.target.files[0],256,256);
    const formData = new FormData();
    formData.append("file", resizedFile);
    setSelectedImage(resizedFile);
    setModalOpen(true);
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getImages() {
    try {
      setImages(null);
      setLoading(true);
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/images`, options);
      const data = await response.json();
      setImages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function generateVariations(){
    try {
      setImages(null);
      setModalOpen(false);
      setLoading(true);
      const options = {
        method:"POST"
      }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/variations`,options);
      const data = await response.json();
      setImages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);  
    }
  }

  return (
    <div className="App">
      <section className="search-selection">
        <p>
          Start with a detailed description
          <span
            className="surprise"
            onClick={() => {
              const randomNumber = Math.floor(Math.random() * 5);
              setValue(surpriseMe[randomNumber]);
            }}
          >
            Surprise Me
          </span>
        </p>
        <div className="input-container">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Some awesome prompt..."
          />
          <button onClick={getImages}>Generate</button>
        </div>
        <p className="extra-info">
          Or,{" "}
          <span>
            <label htmlFor="file">upload an image</label>
            <input
              onChange={uploadImage}
              id="file"
              accept="image/*"
              type="file"
              hidden
            />
          </span>{" "}
          to edit.
        </p>
        {modalOpen && (
          <div className="overlay">
            <Modal
              setModalOpen={setModalOpen}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              generateVariations={generateVariations}
            />
          </div>
        )}
      </section>
      <section className="image-section">
        {images?.map((image, _index) => {
          return (
            <img
              key={_index}
              src={image.url}
              alt={`Generated by openAI, prompt was ${value}`}
            />
          );
        })}
      </section>
      <GridLoader
        color={"#000"}
        loading={loading}
        cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;
