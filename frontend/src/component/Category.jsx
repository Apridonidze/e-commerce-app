import { useState } from "react";; //importing state

import '../styles/layout.css'
const Category = ({ setCategory, category, fetchProducts,offset }) => {

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
    ]; //defining categories with its subcategories

    const [openIndex, setOpenIndex] = useState(null); //state to toggle subCategory list

    const toggleSubmenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };//toggling subcategory

    return(
        <div className="category-sidebar d-flex align-items-start gap-2 p-3" >
        
            <button className="btn border border-2" style={{minWidth:'140px'}} onClick={() => {setCategory(null);fetchProducts(offset,null)}} disabled={!category ? true : false} >All Products</button> 
            
            <ul className="list-unstyled d-flex flex-nowrap gap-2 align-items-center " style={{overflowX: "hidden", maxWidth: '50vw' , width :'100%'}}>
                {categories.map((cat, index) => (
                    <li key={cat.slug}>
                        <button className="btn btn-light d-flex justify-content-between align-items-center flex-shrink-0" style={{minWidth : '220px'}} onClick={() => toggleSubmenu(index)}>{cat.name} <span>{openIndex === index ? "-" : "+"}</span></button>
                        <div className={`list-unstyled-background ${openIndex !== null ? 'd-flex' : 'd-none'} opacity-0 position-absolute w-100 h-100 bg-dark start-0 top-0`} style={{zIndex : 1000}} onClick={() => setOpenIndex(null)}></div>
                        <ul className={`list-unstyled position-absolute bg-white ps-3 mt-1 ${openIndex === index ? 'd-block' : 'd-none'}`} style={{zIndex : 10001}}>
                                {cat.subcategories.map((sub, i) => (
                                <li key={i} className="mb-1">
                                <button className="btn p-1 text-start" style={{ border: category === sub ? '1px solid red' : '1px solid blue'}} onClick={() => setCategory(sub)}>{sub}</button>
                            </li>
                        ))}
                        </ul>
                    </li>))}
            </ul>
        </div>
    );
};


export default Category; //exporting component