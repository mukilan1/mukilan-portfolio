"use client"

const GalleryNavbar = () => {
  return (
    <div className="gallery-navbar">
      <div className="container mx-auto px-4">
        <div className="navbar-content">
          <div className="navbar-brand">
            <a href="/" className="brand-logo">M</a>
          </div>
          
          <nav className="navbar-links">
            <ul>
              <li><a href="/" className="nav-link">Home</a></li>
              <li><a href="/gallery" className="nav-link active">Gallery</a></li>
              <li><a href="/#projects" className="nav-link">Projects</a></li>
              <li><a href="/#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default GalleryNavbar;
