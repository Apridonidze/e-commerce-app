import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { BACKEND_URL } from "../../../config"; //importing backend url from config file
import { useRef, useState, useEffect } from "react"; //importing react states

const EditProduct = ({ setToggleEdit, toggleEdit, setToggleAlert }) => {

    const categories = [
        {
            "name": "Select Product Category",
            "slug": "",
            "subcategories": []
        },
        {
            "name": "Electronics",
            "slug": "electronics",
            "subcategories": [
            "Select Product Sub-Category",
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
            "Select Product Sub-Category",
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
            "Select Product Sub-Category",
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
            "Select Product Sub-Category",
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
            "Select Product Sub-Category",
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
            "Select Product Sub-Category",
            "Car Accessories",
            "Auto Parts",
            "Motorcycle Gear"
            ]
        },
        {
            "name": "Kids & Toys",
            "slug": "kids-toys",
            "subcategories": [
            "Select Product Sub-Category",
            "Toys",
            "Baby Essentials",
            "Kids Clothing"
            ]
        }
    ]; //array of categories and subcategories


    const [ cookies ] = useCookies(['token']); //defining cookies

    const NumberRegex = /\d/;
    const regexContainsSpecial = /[^\w\s]/; //regex for input filtering

    const formData = new FormData();//object for images
    let imagesArray = []; //defining variable for product images

    if (toggleEdit?.product?.images) {//checking if targeted product has images

        try {//parsing product image
            imagesArray = JSON.parse(toggleEdit.product.images);
        } catch (e) {//in case of error setting imagesArray variable as empty array
            imagesArray = [];
        };
    };

    const getImageSrc = (img) => {//formatting images based on image type passed down to make images displayable
        if (typeof img === "string") { //checking if type of given imaage is string
            return `data:image/jpeg;base64,${img}`; //returning image in base64 format
        }
        return URL.createObjectURL(img);// else creating url for image if its type is not string
    };

    const [images,setImages] = useState(imagesArray);
    const [name , setName] = useState(toggleEdit.product.title);
    const [description , setDescription] = useState(toggleEdit.product.description);
    const [selectedCat , setSelectedCat] = useState(toggleEdit.product.category);
    const [selectedSub, setSelectedSub] = useState(toggleEdit.product.subcategory);
    const [price ,setPrice] = useState(toggleEdit.product.price);
    const [toggleSalesPrice, setToggleSalesPrice] = useState(toggleEdit.product.sales_price === null ? false : true);
    const [salesPrice,setSalesPrice] = useState(toggleEdit.product.sales_price);
    const [amount, setAmount] = useState(JSON.stringify(toggleEdit.product.amount)); //setting products data in states by default

    const [imageErr , setImageErr] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [descErr, setDescErr] = useState('');
    const [categoryErr, setCategoryErr] = useState('');
    const [subCategoryErr, setSubCategoryErr] = useState('');
    const [priceErr ,setPriceErr] = useState('');
    const [salesPriceErr, setSalesPriceErr] = useState('');
    const [amountErr ,setAmountErr] = useState(''); //states for errors texts
;
    const imageRef = useRef(null);
    const nameRef = useRef(null);
    const descRef = useRef(null);
    const categoryRef = useRef(null);
    const subCategoryRef = useRef(null);
    const priceRef = useRef(null);
    const salesPriceRef = useRef(null);
    const amountRef = useRef(null); //refs for inputs
    
    const handleUploadProduct = async (e) => {
        
        e.preventDefault(); //preventing page refresh when function is triggered

        let isValid;
        let data; //defining variables for data given
        
        const now = new Date();
        const date = now.toLocaleDateString('en-GB'); //defining current date to seee when product is edited

        // validating images field
        if(images.length < 1){isValid = false ; setImageErr(`This Field Can't Be Empty`); imageRef.current.classList.add('is-invalid');imageRef.current.classList.remove('is-valid')}
        else {isValid = true; setImageErr('') ;imageRef.current.classList.add('is-valid') ;imageRef.current.classList.remove('is-invalid')};

        // validating input field
        if(name.trim() == '' || name.trim() == null || name.trim() == undefined){isValid = false ; setNameErr(`This Field Can't Be Empty`); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(name.trim().length <= 3){isValid = false; setNameErr('Enter Valid Product Name'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(regexContainsSpecial.test(name) === true){isValid = false; setNameErr('Your Product Name Should Not Contain Special Characters'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else {isValid = true; setNameErr('') ;nameRef.current.classList.add('is-valid') ;nameRef.current.classList.remove('is-invalid'); data = {...data,name:name}};

        // validating description field
        if(description.trim() == '' || description.trim() == null || description.trim() == undefined){isValid = false ; setDescErr(`This Field Can't Be Empty`); descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else if(description.trim().length <= 3){isValid = false; setDescErr('Enter Valid Product Description'); descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else {isValid = true; setDescErr('') ;descRef.current.classList.add('is-valid') ;descRef.current.classList.remove('is-invalid'); data = {...data, description : description}};

        // validating price field
        if(price.trim() == '' || price.trim() == null || price.trim() == undefined){isValid = false ; setPriceErr(`This Field Can't Be Empty`); priceRef.current.classList.add('is-invalid');priceRef.current.classList.remove('is-valid')}
        else if(Number(price) === 0 || Number(price) >= 100000 || Number(price) <= 0){isValid = false; setPriceErr('Enter Valid Price'); priceRef.current.classList.add('is-invalid');priceRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(price) === false){isValid = false ; setPriceErr('Enter Valid Price (Numbers Only)')}
        else if (Number(salesPrice) > Number(price) || Number(salesPrice) === Number(price)){isValid = false ; setPriceErr('Sales Price Should Not Be Greater Than Original Price'); priceRef.current.classList.add('is-invalid');priceRef.current.classList.remove('is-valid')}
        else {isValid = true; setPriceErr('') ;priceRef.current.classList.add('is-valid') ;priceRef.current.classList.remove('is-invalid'); data = {...data, price : Number(price)}};

        // validating in sale price field
        if(toggleSalesPrice){ //checking if product is checked to be in sale , if so then filter is activated

            if(salesPrice.trim() == '' || salesPrice.trim() == null || salesPrice.trim() == undefined){isValid = false ; setSalesPriceErr(`This Field Can't Be Empty`); salesPriceRef.current.classList.add('is-invalid');salesPriceRef.current.classList.remove('is-valid')}
            else if(Number(salesPrice) === 0 || Number(price) >= 100000 || Number(price) <= 0){isValid = false; setSalesPriceErr('Enter Valid Price'); salesPriceRef.current.classList.add('is-invalid');salesPriceRef.current.classList.remove('is-valid')}
            else if (NumberRegex.test(salesPrice) === false){isValid = false ; setSalesPriceErr('Enter Valid Price (Numbers Only)'); salesPriceRef.current.classList.add('is-invalid');salesPriceRef.current.classList.remove('is-valid')}
            else if (Number(salesPrice) > Number(price) || Number(salesPrice) === Number(price)){isValid = false ; setSalesPriceErr('Sales Price Should Not Be Greater Than Original Price'); salesPriceRef.current.classList.add('is-invalid');salesPriceRef.current.classList.remove('is-valid')}
            else {isValid = true; setSalesPriceErr('') ;salesPriceRef.current.classList.add('is-valid') ;salesPriceRef.current.classList.remove('is-invalid'); data = {...data, salesPrice : Number(salesPrice)}}
        
        }

        if(!toggleSalesPrice){ //checking if sales price is disabled

            if (!salesPriceRef.current) return ; //returnign empty promise if ref is undefined

            salesPriceRef.current.classList.remove('is-valid') ;
            salesPriceRef.current.classList.remove('is-invalid'); //removing styling

            setSalesPriceErr('');//reseting error message
            data = { ...data, salesPrice: null };//defining salesPrice as null (valid for backend)

        };
        
        // validating category field
        if(selectedCat.trim() == '' || selectedCat.trim() == null || selectedCat.trim() == undefined){isValid = false ; setCategoryErr(`This Field Can't Be Empty`); categoryRef.current.classList.add('is-invalid');categoryRef.current.classList.remove('is-valid')}
        else {isValid = true; setCategoryErr('') ;categoryRef.current.classList.add('is-valid') ;categoryRef.current.classList.remove('is-invalid'); data = {...data, category : selectedCat}};

        // validating subcategory field
        if(selectedSub.trim() == '' || selectedSub.trim() == null || selectedSub.trim() == undefined){isValid = false ; setSubCategoryErr(`This Field Can't Be Empty`); subCategoryRef.current.classList.add('is-invalid');subCategoryRef.current.classList.remove('is-valid')}
        else if(selectedSub.trim().length <= 3){isValid = false; setSubCategoryErr('Enter Valid Product Description'); subCategoryRef.current.classList.add('is-invalid');subCategoryRef.current.classList.remove('is-valid')}
        else {isValid = true; setSubCategoryErr('') ;subCategoryRef.current.classList.add('is-valid') ;subCategoryRef.current.classList.remove('is-invalid'); data = {...data, subCategory : selectedSub}};

        // validating product amount field
        if(amount.trim() == '' || amount.trim() == null || amount.trim() == undefined){isValid = false ; setAmountErr(`This Field Can't Be Empty`); amountRef.current.classList.add('is-invalid');amountRef.current.classList.remove('is-valid')}
        else if(Number(amount) === 0 || Number(amount) >= 100000 || Number(amount) <= 0){isValid = false; setAmountErr('Enter Valid Amount'); amountRef.current.classList.add('is-invalid');amountRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(Number(amount)) === false){isValid = false ; setAmountErr('Enter Valid Amount (Numbers Only)')}
        else {isValid = true; setAmountErr('') ;amountRef.current.classList.add('is-valid') ;amountRef.current.classList.remove('is-invalid'); data = {...data, amount : Number(amount), date : date}};


        if(isValid){ //checking if isValid variable equals to true

            const base64ToBlob = (base64, mime = "image/jpeg") => { //function to convert images from base64 to blob for backend

                const byteChars = atob(base64);
                const byteNumbers = new Array(byteChars.length);

                for (let i = 0; i < byteChars.length; i++) {
                    byteNumbers[i] = byteChars.charCodeAt(i);
                }

                return new Blob([new Uint8Array(byteNumbers)], { type: mime });
            };

            images.forEach((img) => { //checking each images type 
                if (typeof img === "string") { //if image type is string then we are passing that iamge to converter
                    const blob = base64ToBlob(img);
                    formData.append("images", blob, "image.jpg"); //setting converted image in object
                } else {//else skipping operation and dirrectly setting image in object
                    formData.append("images", img);
                }
            });

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            }); //appending data in object and sending to backend

            try {//making api request to backend to save edited product data

                const response = await axios.put(`${BACKEND_URL}/api/product/${toggleEdit.product.products_id}`, formData ,{headers: {Authorization: `Bearer ${cookies.token}`,"Content-Type": "multipart/form-data"}});
                
                if(response.status === 200) setToggleAlert({status: true, type: "Success", statusCode: response.status, message: "Product Edited Successfully."});
                
                setTimeout(() => {setToggleEdit({status : false, product: null})}, 3000)

            } catch (err) {

                if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});

                return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});

            };
        };
    };

    useEffect(() => {
        return () => {
            images.forEach(img => {if (typeof img !== "string") URL.revokeObjectURL(img)});
        };
    }, [images]);//checking each images if they have string type , if not (then it should already be url) then preventing images from turning into urls to prevent errors

    useEffect(() => {

        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = ''

    },[]); //disabling body scrolling when component is triggered

    return(
        <div className="manage-product-container bg-white" style={{left : '40vw' }} tabIndex={9999}>
            <div className="manage-products-top">
                <h4>Edit Product</h4>
            </div>

            <div className="manage-products-main">

                <form onSubmit={handleUploadProduct} enctype="multipart/form-data">

                    <div className="images-container">
                        {images.map((img, imgId) => {return <img src={getImageSrc(img)} style={{maxWidth: '200px' , height : 'auto', cursor : 'pointer'}} alt={img.name} key={imgId} onClick={() => {const newImages = images.filter((_, id) => id !== imgId) ; setImages(newImages)}}/>})}
                    </div>

                    <div className="form-floating">
                        <input type="file" multiple  className="form-control" onChange={(e) => {const files = Array.from(e.target.files); setImages(prev => [...prev, ...files])}}  accept="image/*" ref={imageRef}/>
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
                        <span>{salesPriceErr}</span>
                    </div>

                    <div className="form-group">
                        <input type="checkbox" id="salesCheckbox" onChange={() => setToggleSalesPrice(!toggleSalesPrice)}/>
                        <label htmlFor="salesCheckbox">On Sale</label>
                    </div>

                    {toggleSalesPrice ? <div className="form-floating">
                        <input className="form-control" id="salesPriceId" placeholder="Product Sales Price (In GEL)" ref={salesPriceRef} onChange={(e) => setSalesPrice(e.target.value)} value={salesPrice}/>
                        <label htmlFor="salesPriceId">Sales Price (In GEL)</label>
                        <span>{priceErr}</span>
                    </div> : <></>}

                    <select className="form-select" name="" id="" onChange={(e) => setSelectedCat(e.target.value)} value={selectedCat} ref={categoryRef}>
                        {categories.map((cat, catId) => (
                            <option value={cat.name} key={catId}>{cat.name}</option>
                        ))}
                    </select>
                    <span>{categoryErr}</span>

                    {selectedCat && 
                        <select className="form-select" onChange={(e) => setSelectedSub(e.target.value)} value={selectedSub} ref={subCategoryRef}>
                            {categories.filter(cat => cat.name === selectedCat)[0].subcategories.map((sub, subId) => <option key={subId} value={sub}>{sub}</option>)}
                        </select>
                    }
                    <span>{subCategoryErr}</span>

                    <div className="form-floating">
                        <input className="form-control" id="amountId" placeholder="Stock / Amount In WareHouse" ref={amountRef} onChange={(e) => setAmount(e.target.value)} value={amount}/>
                        <label htmlFor="priceId">Stock / Amount In WareHouse</label>
                        <span>{amountErr}</span>
                    </div>
                    
                    <input type="submit" value='Edit Product'/>
                    <button className="btn btn-danger" onClick={() => setToggleEdit({status : false , product : null})}>Cancel</button>
                </form>

            </div>

        </div>
    );
};

export default EditProduct; //exporting component