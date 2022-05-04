import GalleryItem from "./GalleryItem";

function Gallery(props) {
  console.log(props.data);
  const myData = props.data.result.read();

  const display = myData.map((item, index) => {
    return <GalleryItem item={item} key={index} />;
  });
  return <div>{display}</div>;
}

export default Gallery;
