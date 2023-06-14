import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const Home = () => {
  return <h1>Home Page</h1>;
};

const About = () => {
  return <h1>About Page</h1>;
};

const Contact = () => {
  return <h1>Contact Page</h1>;
};

const NotFound = () => {
  return <h1>404 Not Found</h1>;
};

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/about">About</Link>
          </li>
          <li>
          <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

  export default App;