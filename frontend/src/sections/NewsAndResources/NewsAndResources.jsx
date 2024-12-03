import React from "react";
import "./NewsAndResources.css";

const articles = [
  {
    id: 1,
    title: "Top Tips for Buying a Used Car",
    category: "Buying Guide",
    description: "Learn essential tips for making a safe and smart purchase.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/two-people-reaching-an-agreement-about-a-car-sale-royalty-free-image-1665671206.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "How to Get the Best Price for Your Car",
    category: "Selling Guide",
    description: "Maximize the value of your car when selling it online.",
    image:
      "https://img.vehicleservicepros.com/files/base/cygnus/vspc/image/2022/09/16x9/Untitled___2022_09_01T113849.327.6310d29075f42.png?auto=format,compress&fit=max&q=45&w=640&width=640",
    link: "#",
  },
  {
    id: 3,
    title: "Car Maintenance Checklist",
    category: "Maintenance",
    description:
      "Keep your car in top condition with this comprehensive checklist.",
    image: "https://anyline.com/app/uploads/2023/12/automotive_10.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Latest Trends in the Used Car Market",
    category: "Market Insights",
    description: "Understand what’s driving the market in 2024.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkrnorDh_f9CldF2UOXMKxHIo7-XeqYh6OHQ&s",
    link: "#",
  },
];

const NewsAndResources = () => {
  return (
    <div className="container">
      <div className="news-header">
        <h1 className="news-title">News and Resources</h1>
        <p className="news-description">
          Discover the latest tips, guides, and insights to make smarter car
          decisions.
        </p>
      </div>
      <div className="news-grid">
        {articles.map((article) => (
          <div key={article.id} className="news-card">
            <img
              src={article.image}
              alt={article.title}
              className="news-image"
            />
            <div className="news-content">
              <h2 className="news-card-title">{article.title}</h2>
              <p className="news-category">{article.category}</p>
              <p className="news-text">{article.description}</p>
              <a href={article.link} className="news-link">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAndResources;
