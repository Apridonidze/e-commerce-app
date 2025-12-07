import { useState } from "react"

const CreateProduct = () => {
    
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

    const [selectedCat , setSelectedCat] = useState('')
    const [selectedSub, setSelectedSub] = useState('')

    
    return(
        <div className="create-product-container">
            <form>
                <div className="form-floating">
                    <input className="form-control" type="text" id="title" placeholder="Product Name"/>
                    <label htmlFor="title">Product Name</label>
                </div>

                <div className="form-floating">
                    <input className="form-control" type="text" id="title" placeholder="Product Description"/>
                    <label htmlFor="title">Product Description</label>
                </div>

                <select className="form-select" name="" id="" onChange={(e) => setSelectedCat(e.target.value)} value={selectedCat}>
                    {categories.map((cat, catId) => (
                        <option value={cat.name} key={catId}>{cat.name}</option>
                    ))}
                </select>

                {selectedCat && <select onChange={(e) => setSelectedSub(e.target.value)}>
                        {categories.filter(cat => cat.name === selectedCat)[0].subcategories.map((sub, subId) => <option key={subId} value={sub}>{sub}</option>)}
                    </select>}
                
                
               

            </form>
        </div>
    )
}



export default CreateProduct