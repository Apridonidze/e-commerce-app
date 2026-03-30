import { useEffect, useRef, useState } from "react";; //importing hooks

import '../styles/layout.css'; //importing css file

const Category = ({ setCategory, category, fetchProducts,offset }) => {

    const categories = [
        {
            icon: <i className="fa-solid fa-mobile-screen" style={{ color: "#1E90FF" }}></i>,
            name: "Electronics",
            slug: "electronics",
            subcategories: [
                { name: "Smartphones & Accessories", icon: <i className="fa-solid fa-mobile-screen" style={{ color: "#1E90FF" }}></i>, description: "Latest smartphones and essential accessories." },
                { name: "Laptops & Computers", icon: <i className="fa-solid fa-laptop" style={{ color: "#4682B4" }}></i>, description: "Personal and professional computing devices." },
                { name: "PC Parts & Components", icon: <i className="fa-solid fa-microchip" style={{ color: "#6A5ACD" }}></i>, description: "Hardware for building or upgrading PCs." },
                { name: "Gaming Consoles", icon: <i className="fa-solid fa-gamepad" style={{ color: "#FF4500" }}></i>, description: "Consoles and gaming systems for all ages." },
                { name: "Audio & Headphones", icon: <i className="fa-solid fa-headphones" style={{ color: "#8A2BE2" }}></i>, description: "Speakers, headphones, and audio equipment." },
                { name: "Smart Home", icon: <i className="fa-solid fa-house-chimney" style={{ color: "#32CD32" }}></i>, description: "Devices to automate and secure your home." },
                { name: "Cameras & Drones", icon: <i className="fa-solid fa-camera" style={{ color: "#FF1493" }}></i>, description: "Photography and aerial imaging tools." }
            ]
        },
        {
            icon: <i className="fa-regular fa-house" style={{ color: "#334c61" }}></i>,
            name: "Home & Living",
            slug: "home-living",
            subcategories: [
                { name: "Furniture", icon: <i className="fa-solid fa-couch" style={{ color: "#8B4513" }}></i>, description: "Comfortable and stylish furniture for every room." },
                { name: "Kitchen & Dining", icon: <i className="fa-solid fa-utensils" style={{ color: "#FF6347" }}></i>, description: "Cookware, utensils, and dining essentials." },
                { name: "Home Decor", icon: <i className="fa-solid fa-paint-roller" style={{ color: "#DAA520" }}></i>, description: "Decorative items to enhance your living space." },
                { name: "Lighting", icon: <i className="fa-solid fa-lightbulb" style={{ color: "#FFD700" }}></i>, description: "Indoor and outdoor lighting solutions." },
                { name: "Cleaning Appliances", icon: <i className="fa-solid fa-broom" style={{ color: "#00CED1" }}></i>, description: "Tools and machines to keep your home clean." }
            ]
        },
        {
            icon: <i className="fa-solid fa-shirt" style={{ color: "#FF69B4" }}></i>,
            name: "Fashion",
            slug: "fashion",
            subcategories: [
                { name: "Men's Clothing", icon: <i className="fa-solid fa-shirt" style={{ color: "#1E90FF" }}></i>, description: "Apparel for men including casual and formal wear." },
                { name: "Women's Clothing", icon: <i className="fa-solid fa-female" style={{ color: "#FF1493" }}></i>, description: "Trendy and classic clothing for women." },
                { name: "Shoes", icon: <i className="fa-solid fa-shoe-prints" style={{ color: "#8B0000" }}></i>, description: "Footwear for all occasions and styles." },
                { name: "Accessories", icon: <i className="fa-solid fa-bag-shopping" style={{ color: "#FF8C00" }}></i>, description: "Bags, belts, hats, and other fashion accessories." },
                { name: "Watches & Jewelry", icon: <i className="fa-solid fa-clock" style={{ color: "#DA70D6" }}></i>, description: "Timepieces and jewelry for every style." }
            ]
        },
        {
            icon: <i className="fa-solid fa-mobile-screen" style={{ color: "#FF69B4" }}></i>,
            name: "Beauty & Personal Care",
            slug: "beauty",
            subcategories: [
                { name: "Skincare", icon: <i className="fa-solid fa-face-smile" style={{ color: "#FFB6C1" }}></i>, description: "Products to nourish and protect your skin." },
                { name: "Haircare", icon: <i className="fa-solid fa-scissors" style={{ color: "#8B4513" }}></i>, description: "Shampoos, conditioners, and styling products." },
                { name: "Makeup", icon: <i className="fa-solid fa-magic-wand-sparkles" style={{ color: "#FF69B4" }}></i>, description: "Cosmetics for all skin tones and styles." },
                { name: "Grooming Tools", icon: <i className="fa-solid fa-cut" style={{ color: "#708090" }}></i>, description: "Tools for personal grooming and hygiene." }
            ]
        },
        {
            icon: <i className="fa-solid fa-basketball" style={{ color: "#FF8C00" }}></i>,
            name: "Sports & Outdoors",
            slug: "sports-outdoors",
            subcategories: [
                { name: "Fitness Equipment", icon: <i className="fa-solid fa-dumbbell" style={{ color: "#8B0000" }}></i>, description: "Equipment for home and gym workouts." },
                { name: "Outdoor Gear", icon: <i className="fa-solid fa-hiking" style={{ color: "#228B22" }}></i>, description: "Gear for camping, hiking, and adventure." },
                { name: "Sportswear", icon: <i className="fa-solid fa-shirt" style={{ color: "#1E90FF" }}></i>, description: "Clothing designed for athletic performance." },
                { name: "Cycling Accessories", icon: <i className="fa-solid fa-bicycle" style={{ color: "#32CD32" }}></i>, description: "Bikes and essential accessories for cyclists." }
            ]
        },
        {
            icon: <i className="fa-solid fa-car" style={{ color: "#A52A2A" }}></i>,
            name: "Automotive",
            slug: "automotive",
            subcategories: [
                { name: "Car Accessories", icon: <i className="fa-solid fa-car-side" style={{ color: "#B22222" }}></i>, description: "Interior and exterior car enhancements." },
                { name: "Auto Parts", icon: <i className="fa-solid fa-cogs" style={{ color: "#696969" }}></i>, description: "Replacement and performance parts for vehicles." },
                { name: "Motorcycle Gear", icon: <i className="fa-solid fa-motorcycle" style={{ color: "#FF4500" }}></i>, description: "Safety and performance gear for motorcyclists." }
            ]
        },
        {
            icon: <i className="fa-solid fa-baby" style={{ color: "#FF69B4" }}></i>,
            name: "Kids & Toys",
            slug: "kids-toys",
            subcategories: [
                { name: "Toys", icon: <i className="fa-solid fa-puzzle-piece" style={{ color: "#FFD700" }}></i>, description: "Fun and educational toys for children." },
                { name: "Baby Essentials", icon: <i className="fa-solid fa-baby" style={{ color: "#FFB6C1" }}></i>, description: "Products for newborns and infants." },
                { name: "Kids Clothing", icon: <i className="fa-solid fa-shirt" style={{ color: "#1E90FF" }}></i>, description: "Clothes designed for comfort and style." }
            ]
        }
    ]; //defining categories data

    const listRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);//defining refs

    const [openIndex, setOpenIndex] = useState(null); //state to toggle subCategory list
    const [dropDownPos, setDropdownPos] = useState({top: null,left: null}); //state to define max cordinates for dropdown components
    const [dropDownIndex ,setDropDownIndex] = useState({id : null , category : null});

    const toggleSubmenu = (e, index) => {
        const location = e.currentTarget.getBoundingClientRect()

        setDropdownPos({
            top: location.bottom + window.scrollY,
            left: location.left + window.scrollX,
        });// defining max cordinates for dropdown
        setOpenIndex(openIndex === index ? null : index);
    }; //settingopenIndex 

    const scrollLeft = () => {listRef.current.scrollBy({left: -300, behavior: "smooth"})};
    const scrollRight = () => {listRef.current.scrollBy({left: 300, behavior: "smooth"})}; //functions to scroll on sides 

    const handleScroll = () => {

        const el = listRef.current; //definign listRef to not be null
        if(!el) return; //returning empty promise if ref is undefined || null

        el.scrollLeft == 0 ? leftRef.current.classList.add('d-none') : leftRef.current.classList.remove('d-none'); //undisplaying leftRef
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 5 ? rightRef.current.classList.add('d-none') :rightRef.current.classList.remove('d-none'); //undisplaying rightRef
        
    };

    useEffect(() => {
        handleScroll();
    }, []); //calling function on mount to avoid undefined refs errors 

    return(
        <div className="category-sidebar d-flex align-items-start gap-2 ">
        
            <span className="button-div d-flex position-absolute " style={{backgroundColor : 'none'}}>
                <button onClick={scrollRight} ref={rightRef} className="btn1 btn border border-2 rounded-5 mt-2 position-relative" ><i class="fa-solid fa-angle-right"></i></button>
                <button onClick={scrollLeft} ref={leftRef} className="btn2 btn border border-2 rounded-5 mt-2 position-absolute" ><i class="fa-solid fa-angle-left"></i></button>
            </span>
            
            <ul className="list-unstyled d-flex flex-nowrap gap-2 align-items-center ms-2 " onScroll={handleScroll} ref={listRef}>
                
                <button className={`btn btn-light fw-medium  ${category ? " text-dark" : "text-white"}`} style={{minWidth:'160px', backgroundColor : !category ? '#006947': ''}} onClick={() => {setCategory(null);fetchProducts(offset,null)}} ><i className="fa-solid fa-th-large"></i> All Category</button> 
                
                {categories.map((cat, index) => (                
                    <li key={cat.slug} className="d-flex flex-column" >
                        
                        <button className="toggleDropDown btn btn-light d-flex justify-content-between align-items-center flex-shrink-0" style={{minWidth : '240px', borderBottom : openIndex === index ? '2px solid #006947' : '', backgroundColor : dropDownIndex.category == cat.name ? '#008a5e' : '' , color : dropDownIndex.category == cat.name ? 'white' : ''}} onClick={(e) => toggleSubmenu(e, index)}>{cat.icon} {cat.name} <span style={{rotate : openIndex === index ? '180deg' : "0deg", transition: 'all 0.2s'}}><i class="fa-solid fa-angle-down"></i></span></button>
                        <div className={`list-unstyled-background ${openIndex !== null ? 'd-flex' : 'd-none'} opacity-0 position-absolute w-100 h-100 bg-dark start-0 top-0`} style={{zIndex : 1000 }} onClick={() => setOpenIndex(null)}></div>
                        
                        <ul className={`list-unstyled rounded-2 position-absolute bg-white p-3 mt-1 ${openIndex === index ? 'd-block' : 'd-none'}`} style={{zIndex : 1001, left : dropDownPos?.left , top : dropDownPos?.top}}>
                            {cat.subcategories.map((sub, i) => (
                                <li key={i} className="my-2" style={{cursor :"pointer"}}>
                                    <span className="d-flex flex-column gap-2 p-2 text-dark rounded-0 w-100 " style={{borderBottom : sub.name == category ? '2px solid #006947' : '1px solid #dee2e6'}} onClick={() => {setCategory(sub.name) ; setDropDownIndex({id : i , category : cat.name})}}>
                                        <strong>{sub.icon} {sub.name}</strong>
                                        <small> {sub.description}</small>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </li>))}
            </ul>
        </div>
    );
};


export default Category; //exporting component