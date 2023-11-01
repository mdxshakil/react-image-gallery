import Gallery from "./components/Gallery";
import Uploader from "./components/Uploader";

function App() {
  return (
    <main className="max-w-6xl mx-auto font-primary">
      <h1 className="text-3xl md:text-4xl text-gray-700 font-bold tracking-wide text-center my-12 px-2">
        Welcome to image gallery
      </h1>
      <Uploader />
      <Gallery />
    </main>
  );
}

export default App;
