import "./App.css";
import { useEffect, useState, Fragment, suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import Searchbar from "./components/Searchbar";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import Spinner from "./components/Spinner";
import { createResource as fetchData } from "./helper";
import React, { lazy, Suspense } from "react";

// import { DataContext } from './context/DataContext'

function App() {
  let [searchTerm, setSearchTerm] = useState("");
  let [message, setMessage] = useState("Search for Music!");
  //   let [data, setData] = useState([]); (commented out to try out suspense and see whats happening in dev tools)
  let [data, setData] = useState(null);

  const API_URL = "https://itunes.apple.com/search?term=";
  // added for suspense
  useEffect(() => {
    if (searchTerm) {
      document.title = `${searchTerm}Music`;
      console.log(fetchData(searchTerm));
      setData(fetchData(searchTerm));
    }
  }, [searchTerm]);

  //removed for suspense
  //   useEffect(() => {
  //     if (search) {
  //       const fetchData = async () => {
  //         document.title = `${search} Music`;
  //         const response = await fetch(API_URL + search);
  //         const resData = await response.json();
  //         if (resData.results.length > 0) {
  //           setData(resData.results);
  //         } else {
  //           setMessage("Not Found");
  //         }
  //       };
  //       fetchData();
  //     }
  //   }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearchTerm(term);
  };

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      );
    }
  };

  return (
    <div className="App">
      <Searchbar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}

//   return (
//     <div>
//       {message}
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Fragment>
//                 <Searchbar handleSearch={handleSearch} />
//                 <Gallery data={data} />
//               </Fragment>
//             }
//           />
//           <Route path="/album/:id" element={<AlbumView />} />
//           <Route path="/artist/:id" element={<ArtistView />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

export default App;
