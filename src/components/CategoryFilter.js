"use client"

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <div className="filter-container">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            <span className="category-text">{category}</span>
            {activeCategory === category && <div className="active-indicator"></div>}
          </button>
        ))}
      </div>
      <div className="filter-line"></div>
    </div>
  );
};

export default CategoryFilter;
