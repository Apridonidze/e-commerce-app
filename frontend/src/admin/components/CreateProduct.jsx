import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { BACKEND_URL } from "../../../config"; //importing backend url from config.jsx file
import { useRef, useState, useEffect } from "react" ; //importing react hooks

const CreateProduct = ({ setToggleCreateNew }) => {
    
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
    ]; //defining array of categories and its subcagegories to display mapped input for item

    const [ cookies ] = useCookies(['token']) ; //defining cookies

    const NumberRegex = /\d/;
    const regexContainsSpecial = /[^\w\s]/; //definig regex for inputs

    const [targetImage, setTargetImage] = useState(0);
    const [images,setImages] = useState([]);
    const [name , setName] = useState('');
    const [description , setDescription] = useState('');
    const [selectedCat , setSelectedCat] = useState('');
    const [selectedSub, setSelectedSub] = useState('');
    const [price ,setPrice] = useState('');
    const [toggleSalesPrice, setToggleSalesPrice] = useState(false);
    const [salesPrice,setSalesPrice] = useState('');
    const [amount, setAmount] = useState(''); //definign states for inputs

    const [imageErr , setImageErr] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [descErr, setDescErr] = useState('');
    const [categoryErr, setCategoryErr] = useState('');
    const [subCategoryErr, setSubCategoryErr] = useState('');
    const [priceErr ,setPriceErr] = useState('');
    const [salesPriceErr, setSalesPriceErr] = useState('');
    const [amountErr ,setAmountErr] = useState(''); //defining states for input error messages

    const imageRef = useRef(null);
    const nameRef = useRef(null);
    const descRef = useRef(null);
    const categoryRef = useRef(null);
    const subCategoryRef = useRef(null);
    const priceRef = useRef(null);
    const salesPriceRef = useRef(null);
    const amountRef = useRef(null); //defining refs for inputs to style them if they success/fail
    

    const handleUploadProduct = async (e) => { //create product function
        
        e.preventDefault(); //preventing page load when function is triggered

        let isValid;
        let data; //variables to validate and store product details
        
        const now = new Date();
        const date = now.toLocaleDateString('en-GB'); //getting current date to define when product is created

        //validating images
        if(images.length < 1){isValid = false ; setImageErr(`This Field Can't Be Empty`); imageRef.current.classList.add('is-invalid');imageRef.current.classList.remove('is-valid')}
        else if (images.length > 6){isValid = false ; setImageErr(`Image Limit Reached (max 6).`); imageRef.current.classList.add('is-invalid');imageRef.current.classList.remove('is-valid')}
        else {isValid = true; setImageErr('') ;imageRef.current.classList.add('is-valid') ;imageRef.current.classList.remove('is-invalid')};

        // validating prodcut title input
        if(name.trim() == '' || name.trim() == null || name.trim() == undefined){isValid = false ; setNameErr(`This Field Can't Be Empty`); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(name.trim().length <= 3){isValid = false; setNameErr('Enter Valid Product Name'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(regexContainsSpecial.test(name) === true){isValid = false; setNameErr('Your Product Name Should Not Contain Special Characters'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else {isValid = true; setNameErr('') ;nameRef.current.classList.add('is-valid') ;nameRef.current.classList.remove('is-invalid'); data = {...data,name:name}};

        //validating description input
        if(description.trim() == '' || description.trim() == null || description.trim() == undefined){isValid = false ; setDescErr(`This Field Can't Be Empty`); descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else if(description.trim().length <= 3){isValid = false; setDescErr('Enter Valid Product Description'); descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else {isValid = true; setDescErr('') ;descRef.current.classList.add('is-valid') ;descRef.current.classList.remove('is-invalid'); data = {...data, description : description}};

        // validating price input
        if(price.trim() == '' || price.trim() == null || price.trim() == undefined){isValid = false ; setPriceErr(`This Field Can't Be Empty`); priceRef.current.classList.add('is-invalid');priceRef.current.classList.remove('is-valid')}
        else if(Number(price) === 0 || Number(price) >= 100000 || Number(price) <= 0){isValid = false; setPriceErr('Enter Valid Price'); priceRef.current.classList.add('is-invalid');priceRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(price) === false){isValid = false ; setPriceErr('Enter Valid Price (Numbers Only)')}
        else if (Number(salesPrice) > Number(price) || Number(salesPrice) === Number(price)){isValid = false ; setPriceErr('Sales Price Should Not Be Greater Than Original Price'); priceRef.current.classList.add('is-invalid');priceRef.current.classList.remove('is-valid')}
        else {isValid = true; setPriceErr('') ;priceRef.current.classList.add('is-valid') ;priceRef.current.classList.remove('is-invalid'); data = {...data, price : Number(price)}};

        if(toggleSalesPrice){ //handling product sales price
            if(salesPrice.trim() == '' || salesPrice.trim() == null || salesPrice.trim() == undefined){isValid = false ; setSalesPriceErr(`This Field Can't Be Empty`); salesPriceRef.current.classList.add('is-invalid');salesPriceRef.current.classList.remove('is-valid')}
            else if(Number(salesPrice) === 0 || Number(price) >= 100000 || Number(price) <= 0){isValid = false; setSalesPriceErr('Enter Valid Price'); salesPriceRef.current.classList.add('is-invalid');salesPriceRef.current.classList.remove('is-valid')}
            else if (NumberRegex.test(salesPrice) === false){isValid = false ; setSalesPriceErr('Enter Valid Price (Numbers Only)'); salesPriceRef.current.classList.add('is-invalid');salesPriceRef.current.classList.remove('is-valid')}
            else if (Number(salesPrice) > Number(price) || Number(salesPrice) === Number(price)){isValid = false ; setSalesPriceErr('Sales Price Should Not Be Greater Than Original Price'); salesPriceRef.current.classList.add('is-invalid');salesPriceRef.current.classList.remove('is-valid')}
            else {isValid = true; setSalesPriceErr('') ;salesPriceRef.current.classList.add('is-valid') ;salesPriceRef.current.classList.remove('is-invalid'); data = {...data, salesPrice : Number(salesPrice)}}
        };

        if(!toggleSalesPrice){ //handling product disabled on sale price 
            if (salesPriceRef.current) {
                salesPriceRef.current.classList.remove('is-valid')
                salesPriceRef.current.classList.remove('is-invalid')
            }
            setSalesPriceErr('')
            data = { ...data, salesPrice: null }
        };
        
        // validating category input
        if(selectedCat.trim() == '' || selectedCat.trim() == null || selectedCat.trim() == undefined){isValid = false ; setCategoryErr(`This Field Can't Be Empty`); categoryRef.current.classList.add('is-invalid');categoryRef.current.classList.remove('is-valid')}
        else {isValid = true; setCategoryErr('') ;categoryRef.current.classList.add('is-valid') ;categoryRef.current.classList.remove('is-invalid'); data = {...data, category : selectedCat}};

        // validating subcategory input
        if(selectedSub.trim() == '' || selectedSub.trim() == null || selectedSub.trim() == undefined){isValid = false ; setSubCategoryErr(`This Field Can't Be Empty`); subCategoryRef.current.classList.add('is-invalid');subCategoryRef.current.classList.remove('is-valid')}
        else if(selectedSub.trim().length <= 3){isValid = false; setSubCategoryErr('Enter Valid Product Description'); subCategoryRef.current.classList.add('is-invalid');subCategoryRef.current.classList.remove('is-valid')}
        else {isValid = true; setSubCategoryErr('') ;subCategoryRef.current.classList.add('is-valid') ;subCategoryRef.current.classList.remove('is-invalid'); data = {...data, subCategory : selectedSub}}

        //validating product amount input
        if(amount.trim() == '' || amount.trim() == null || amount.trim() == undefined){isValid = false ; setAmountErr(`This Field Can't Be Empty`); amountRef.current.classList.add('is-invalid');amountRef.current.classList.remove('is-valid')}
        else if(Number(amount) === 0 || Number(amount) >= 100000 || Number(amount) <= 0){isValid = false; setAmountErr('Enter Valid Amount'); amountRef.current.classList.add('is-invalid');amountRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(Number(amount)) === false){isValid = false ; setAmountErr('Enter Valid Amount (Numbers Only)')}
        else {isValid = true; setAmountErr('') ;amountRef.current.classList.add('is-valid') ;amountRef.current.classList.remove('is-invalid'); data = {...data, amount : Number(amount), date : date}}


        if(isValid){ //triggering logic below when isValid variable is true

            const formData = new FormData(); //creating object to store product data to later pass to the backend

            images.forEach(img => {formData.append('images', img)});//mapping inside images array and inserting them separately in object
            Object.entries(data).forEach(([key, value]) => {formData.append(key, value)}); //inserting product details in object

            try { //insertin product details into backend via api

                const response = await axios.post(`${BACKEND_URL}/api/product`,formData,{headers: {Authorization: `Bearer ${cookies.token}`,"Content-Type": "multipart/form-data"}}); //calling api and passing data with image supported content type params
            
                if(response.status === 200) setToggleAlert({status: true, type: "Success", statusCode: response.status, message: "Product Edited Successfully."}); //triggering success message
                setTimeout(() => {setToggleCreateNew({status : false, product: null})}, 3000); //disabling component after 3 seconds when alert message is closed  aswell

            } catch (err) { //handling errors

                if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //handing 400 status code and passing error messages to alert message component

                return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //handling internal error messages and passing messages to alert message component
            };
        };
    };


    useEffect(() => {
        return () => images.forEach(img => {if (typeof img !== "string") URL.revokeObjectURL(img)});
    }, [images]);//checking each images if they have string type , if not (then it should already be url) then preventing images from turning into urls to prevent errors

    useEffect(() => {

        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = ''

    },[]); //disabling body scrolling when component is triggered

    const getImageSrc = (img) => {//formatting images based on image type passed down to make images displayable

        if(!img) return; //returning empty promise if img is not provided

        if (typeof img === "string") return `data:image/jpeg;base64,${img}`; //returning image in base64 format
        return URL.createObjectURL(img);// else creating url for image if its type is not string

    };
    
    return(
        <div className="manage-product-container" style={{left : '40vw' }} tabIndex={9999}>

            <div className="manage-product-top d-flex justify-content-between">
                <h4>Add New Product</h4>
                <button className="btn btn-none border-0" onClick={() => setToggleCreateNew(false)}><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div className="manage-product-main ">

                <form className="form-container" onSubmit={handleUploadProduct} enctype="multipart/form-data">

                    <div className="form-start">

                        <div className="target-image-container " >
                            {images?.length === 0 ? <></> : <span className="toggleDeleteImg  bg-danger p-2 rounded-3 m-1 " onClick={() => {const newImages = images.filter((_, id) => id !== targetImage) ; setImages(newImages); setTargetImage(0)}}><i class="fa-solid fa-trash text-white fs-6"></i></span>} 
                            <img src={getImageSrc(images[targetImage])} alt="No Images" className="targetImage mb-2 justify-content-center d-flex align-items-center" /> 
                        </div>

                        <div className="images-container my-3">
                            {images.map((img, imgId) => {return <img className="rounded-2" src={getImageSrc(img)} style={{maxWidth: '120px' , height : 'auto', cursor : 'pointer'}} onClick={() => setTargetImage(imgId)} alt={img.name} key={imgId} />})}
                        <div className="form-floating">
                        
                        {images?.length > 5 ? <></> : <button type="button" className="upload-btn" onClick={() => imageRef.current.click()}><i class="fa-regular fa-image fw-medium"></i> <br /> Add Images</button>}
                        
                        <input type="file" ref={imageRef} hidden multiple accept="image/*" onChange={(e) => {const files = Array.from(e.target.files);setImages(prev => [...prev, ...files]);e.target.value = null;}}/>

                            <span className="error-text">{imageErr}</span>
                        </div>
                        </div>
                    </div>

                    <div className="form-end">
                        
                        <div className="form-row">
                            <label htmlFor="title">Product Name</label>
                            <input className="form-control" type="text" id="title" placeholder="Product Name" ref={nameRef} onChange={(e) => setName(e.target.value)} value={name}/>
                            <span>{nameErr}</span>
                        </div>

                        <div className="form-row">
                            <label htmlFor="title">Product Description</label>
                            <textarea className="form-control" type="text" id="title" style={{height : '10rem'}} placeholder="Product Description" ref={descRef} onChange={(e) => setDescription(e.target.value)} value={description}/>
                            <span>{descErr}</span>
                        </div>

                        <div className="form-line">

                            <div className="form-row">
                                <label htmlFor="priceId">Product Price (In GEL)</label>
                                <input className="form-control" id="priceId" placeholder="Product Price (In GEL)" ref={priceRef} onChange={(e) => setPrice(e.target.value)} value={price}/>
                                <span>{priceErr}</span>
                            </div>

                        <div className="form-row">
                            <div className="form-check form-switch"style={{cursor : 'pointer'}} >
                                <input className="form-check-input" style={{cursor : 'pointer'}} type="checkbox" role="switch" id="salesCheckbox" checked={toggleSalesPrice ? true : false} onChange={(e) => {setToggleSalesPrice(e.target.checked)}}/>
                                <label htmlFor="salesCheckbox" style={{cursor : 'pointer'}}>On Sale</label>
                            </div>
                            <input className="form-control" id="salesPriceId" placeholder="Product Sales Price (In GEL)" disabled={!toggleSalesPrice} ref={salesPriceRef} onChange={(e) => setSalesPrice(e.target.value)} value={salesPrice}/>
                            <span>{salesPriceErr}</span>
                        </div> 

                        </div>

                        <div className="form-line">
                            
                        <div className="form-row">
                            <select className="form-select" onChange={(e) => setSelectedCat(e.target.value)} value={selectedCat} ref={categoryRef}>
                                {categories.map((cat, catId) => (
                                    <option value={cat.name} key={catId}>{cat.name}</option>
                                ))}
                            </select>
                            <span>{categoryErr}</span>
                        </div>

                            <div className="form-row">
                            {selectedCat && 
                                <select className="form-select" onChange={(e) => setSelectedSub(e.target.value)} value={selectedSub} ref={subCategoryRef}>
                                    {categories.filter(cat => cat.name === selectedCat)[0].subcategories.map((sub, subId) => <option key={subId} value={sub}>{sub}</option>)}
                                </select>
                            }
                            <span>{subCategoryErr}</span>
                        </div>
                        
                        </div>

                        <div className="form-row">
                            <label htmlFor="priceId">Stock / Amount In WareHouse</label>
                            <input className="form-control" id="amountId" placeholder="Stock / Amount In WareHouse" ref={amountRef} onChange={(e) => setAmount(e.target.value)} value={amount}/>
                            <span>{amountErr}</span>
                        </div>
                        
                        <div className="form-buttons">
                            <button className="btn btn-danger " onClick={() => setToggleCreateNew(false)}>Cancel</button>
                            <input type="submit" disabled={images.length == 0 ? true : false} className="btn border-0 fw-medium" value='Add Product' style={{backgroundColor : '#10b981', color : "white"}}/>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default CreateProduct; //exporting component