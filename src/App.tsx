import Gallery from "./components/Gallery";
import Uploader from "./components/Uploader";

function App() {
  return (
    <main className="max-w-6xl mx-auto font-primary">
      <h1 className="text-4xl font-extrabold tracking-tight text-center my-4">
        Welcome to image gallery
      </h1>
      <Uploader />
      <Gallery />
    </main>
  );
}

export default App;
