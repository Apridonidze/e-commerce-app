import { useState } from "react";

const Category = ({ setCategory, category, setProducts, fetchProducts,offset }) => {

    const categories = [
        
        {
            "name": "Electronics",
            "slug": "electronics",
            "subcategories": [
            "Smartphones & Accessories",
            "Laptops & Computers",
            "PC Parts & Components",
            "Gaming Consoles",
            "Audio & Headphones",
            "Smart Home",
            "Cameras & Drones"
            ]
        },
        {
            "name": "Home & Living",
            "slug": "home-living",
            "subcategories": [
            "Furniture",
            "Kitchen & Dining",
            "Home Decor",
            "Lighting",
            "Cleaning Appliances"
            ]
        }, 
        {
            "name": "Fashion",
            "slug": "fashion",
            "subcategories": [
            "Men's Clothing",
            "Women's Clothing",
            "Shoes",
            "Accessories",
            "Watches & Jewelry"
            ]
        },
        {
            "name": "Beauty & Personal Care",
            "slug": "beauty",
            "subcategories": [
            "Skincare",
            "Haircare",
            "Makeup",
            "Grooming Tools"
            ]
        },
        {
            "name": "Sports & Outdoors",
            "slug": "sports-outdoors",
            "subcategories": [
            "Fitness Equipment",
            "Outdoor Gear",
            "Sportswear",
            "Cycling Accessories"
            ]
        },
        {
            "name": "Automotive",
            "slug": "automotive",
            "subcategories": [
            "Car Accessories",
            "Auto Parts",
            "Motorcycle Gear"
            ]
        },
        {
            "name": "Kids & Toys",
            "slug": "kids-toys",
            "subcategories": [
            "Toys",
            "Baby Essentials",
            "Kids Clothing"
            ]
        }
    ]

    const [openIndex, setOpenIndex] = useState(null);

    const toggleSubmenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
{/* <button onClick={() => {setCategory(null);fetchProducts(offset,null)}}>Clear Filters</button> */}
    return(
       <div className="category-sidebar border p-3">
      <h5 className="mb-3">Categories</h5>
      <ul className="list-unstyled">
        {categories.map((cat, index) => (
          <li key={cat.slug} className="mb-2">
            <button
              className="btn btn-light w-100 text-start d-flex justify-content-between align-items-center"
              onClick={() => toggleSubmenu(index)}
            >
              {cat.name}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            <ul className={`list-unstyled ps-3 mt-1 ${openIndex === index ? 'd-block' : 'd-none'}`}>
              {cat.subcategories.map((sub, i) => (
                <li key={i}>
                  <button className="btn btn-link p-1 text-start" onClick={() => setCategory(sub)}>{sub}</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    )
}

//highlight the selected category


export default Category 