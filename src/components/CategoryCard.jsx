function CategoryCard({ category }) {
    return (
        <div className="category-box">
            <div className="menu-categories">
                <img
                    src={category.image}
                    alt={category.name}
                    className={category.className || ""}
                />
            </div>

            <p className="name">
                {category.name}
            </p>
        </div>
    );
}

export default CategoryCard;