import Skeleton from "react-loading-skeleton"

const Product = ( { prod ,prodId , key , user } ) => {
    console.log(prod)
    return(
        <div className="product-container col-4 border" key={prodId} >

            <div className="product-top">
                {prod.images ? prod.images?.map((img, imgId) => (
                    <img className="w-100 h-100" src={`data:image/jpeg;base64,${img}`} key={imgId} />
                )) : <Skeleton height={'25vh'}/>}
            </div>
            
            <div className="product-main">

                <h5>{prod.title || <Skeleton count={1} width={'12vw'}/>}</h5>
                <h5>{prod.description || <Skeleton count={2}/>}</h5>
                <h5>{`${prod.category} / ${prod.subcategory}` || <Skeleton count={2}/>}</h5>

            </div>
            <div className="product-bottom">
                <h6>{`Creator : ${user.fullname}` || <Skeleton />}</h6>
            </div>
        </div>
    )
}

export default Product