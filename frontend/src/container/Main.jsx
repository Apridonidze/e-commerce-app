import Header from "../component/Header"
import Sidebar from "../component/Sidebar"

const Main = () => {

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


    return(
        <div className="main-container">
            <div className="main-start">
                <Sidebar /> 
            </div>
            <div className="main-end">
                <Header />
            </div>
        </div>
    )
}

export default Main