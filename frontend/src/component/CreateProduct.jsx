import axios from "axios";
import { useRef, useState } from "react"

import { BACKEND_URL } from "../../config";
import { useCookies } from "react-cookie";

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

    const [ cookies ] = useCookies(['token'])

    const regexContainsSpecial = /[^\w\s]/;
    const NumberRegex = /\d/;

    const [images,setImages] = useState([])
    const [name , setName] = useState('')
    const [description , setDescription] = useState('')
    const [selectedCat , setSelectedCat] = useState('')
    const [selectedSub, setSelectedSub] = useState('')
    const [price ,setPrice] = useState('')

    const [imageErr , setImageErr] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [descErr, setDescErr] = useState('')
    const [categoryErr, setCategoryErr] = useState('')
    const [subCategoryErr, setSubCategoryErr] = useState('')
    const [priceErr ,setPriceErr] = useState('')

    const imageRef = useRef(null)
    const nameRef = useRef(null)
    const descRef = useRef(null)
    const categoryRef = useRef(null)
    const subCategoryRef = useRef(null)
    const priceRef = useRef(null)
    
    const handleUploadProduct = async (e) => {
        
        e.preventDefault();

        let isValid
        let data

        if(images.length < 1){isValid = false ; setImageErr(`This Field Can't Be Empty`); imageRef.current.classList.add('is-invalid');imageRef.current.classList.remove('is-valid')}
        else {isValid = true; setImageErr('') ;imageRef.current.classList.add('is-valid') ;imageRef.current.classList.remove('is-invalid')}

        if(name.trim() == '' || name.trim() == null || name.trim() == undefined){isValid = false ; setNameErr(`This Field Can't Be Empty`); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(name.trim().length <= 3){isValid = false; setNameErr('Enter Valid Product Name'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(regexContainsSpecial.test(name) === true){isValid = false; setNameErr('Your Product Name Should Not Contain Special Characters'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else {isValid = true; setNameErr('') ;nameRef.current.classList.add('is-valid') ;nameRef.current.classList.remove('is-invalid'); data = {...data,name:name}}

        if(description.trim() == '' || description.trim() == null || description.trim() == undefined){isValid = false ; setDescErr(`This Field Can't Be Empty`); descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else if(description.trim().length <= 3){isValid = false; setDescErr('Enter Valid Product Description'); descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else {isValid = true; setDescErr('') ;descRef.current.classList.add('is-valid') ;descRef.current.classList.remove('is-invalid'); data = {...data, description : description}}

        if(price.trim() == '' || price.trim() == null || price.trim() == undefined){isValid = false ; setPriceErr(`This Field Can't Be Empty`); priceRef.current.classList.add('is-invalid');priceRef.current.classList.remove('is-valid')}
        else if(Number(price) === 0 || Number(price) >= 100000 || Number(price) <= 0){isValid = false; setPriceErr('Enter Valid Price'); priceRef.current.classList.add('is-invalid');priceRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(Number(price)) === false){isValid = false ; setPriceErr('Enter Valid Price (Numbers Only)')}
        else {isValid = true; setPriceErr('') ;priceRef.current.classList.add('is-valid') ;priceRef.current.classList.remove('is-invalid'); data = {...data, price : Number(price)}}

        if(selectedCat.trim() == '' || selectedCat.trim() == null || selectedCat.trim() == undefined){isValid = false ; setCategoryErr(`This Field Can't Be Empty`); categoryRef.current.classList.add('is-invalid');categoryRef.current.classList.remove('is-valid')}
        else if(selectedCat.trim().length <= 3){isValid = false; setCategoryErr('Enter Valid Product Description'); descRef.current.classList.add('is-invalid');categoryRef.current.classList.remove('is-valid')}
        else {isValid = true; setCategoryErr('') ;categoryRef.current.classList.add('is-valid') ;categoryRef.current.classList.remove('is-invalid'); data = {...data, category : selectedCat}}

        if(selectedSub.trim() == '' || selectedSub.trim() == null || selectedSub.trim() == undefined){isValid = false ; setSubCategoryErr(`This Field Can't Be Empty`); subCategoryRef.current.classList.add('is-invalid');subCategoryRef.current.classList.remove('is-valid')}
        else if(selectedSub.trim().length <= 3){isValid = false; setSubCategoryErr('Enter Valid Product Description'); subCategoryRef.current.classList.add('is-invalid');subCategoryRef.current.classList.remove('is-valid')}
        else {isValid = true; setSubCategoryErr('') ;subCategoryRef.current.classList.add('is-valid') ;subCategoryRef.current.classList.remove('is-invalid'); data = {...data, subCategory : selectedSub}}

        if(isValid){

            const formData = new FormData();

            for(let img of images){
                formData.append('images', img)
            }

            Object.entries(data).forEach(([key,value]) => {
                formData.append(key,value)
            })

            try{

                await axios.post(`${BACKEND_URL}/products`, formData , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp))

            }catch(err){
                console.log(err)
            }

        }

    }

    return(
        <div className="create-product-container position-relative bg-white mx-auto top-25" style={{zIndex : 2}}>
            <form onSubmit={handleUploadProduct} enctype="multipart/form-data">

                <div className="form-floating">
                    <input type="file" multiple  className="form-control" onChange={(e) => setImages(e.target.files)}  accept="image/*" ref={imageRef}/>
                    <span>{imageErr}</span>
                </div>

                <div className="form-floating">
                    <input className="form-control" type="text" id="title" placeholder="Product Name" ref={nameRef} onChange={(e) => setName(e.target.value)} value={name}/>
                    <label htmlFor="title">Product Name</label>
                    <span>{nameErr}</span>
                </div>

                <div className="form-floating">
                    <input className="form-control" type="text" id="title" placeholder="Product Description" ref={descRef} onChange={(e) => setDescription(e.target.value)} value={description}/>
                    <label htmlFor="title">Product Description</label>
                    <span>{descErr}</span>
                </div>

                <div className="form-floating">
                    <input className="form-control" id="priceId" placeholder="Product Price (In GEL)" ref={priceRef} onChange={(e) => setPrice(e.target.value)} value={price}/>
                    <label htmlFor="priceId">Product Price (In GEL)</label>
                    <span>{priceErr}</span>
                </div>

                <select className="form-select" name="" id="" onChange={(e) => setSelectedCat(e.target.value)} value={selectedCat} ref={categoryRef}>
                    {categories.map((cat, catId) => (
                        <option value={cat.name} key={catId}>{cat.name}</option>
                    ))}
                </select>
                <span>{categoryErr}</span>

                {selectedCat && 
                    <select onChange={(e) => setSelectedSub(e.target.value)} value={selectedSub} ref={subCategoryRef}>
                        {categories.filter(cat => cat.name === selectedCat)[0].subcategories.map((sub, subId) => <option key={subId} value={sub}>{sub}</option>)}
                    </select>
                }
                <span>{subCategoryErr}</span>
                
                <input type="submit" value='Add Product'/>
                
            </form>
        </div>
    )
}



export default CreateProduct