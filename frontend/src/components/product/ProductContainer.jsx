import { Link } from "react-router-dom";

const ProductContainer = ({setToggleEdit,setToggleRemove,setToggleReportProduct,handleAddToCart,user,setTargetImage,amount,setToggleMore,getImageSrc,toggleMore,imagesArray,targetImage,product,setAmount,isInCart,inCartAmount,}) => {
  
    const features = [
    {
      id: 1,
      icon: <i className="fa-solid fa-truck"></i>,
      title: "Free Shipping",
      subtitle: "On orders over $50",
    },
    {
      id: 2,
      icon: <i className="fa-solid fa-shield-halved"></i>,
      title: "Secure Payment",
      subtitle: "100% protected",
    },
    {
      id: 3,
      icon: <i className="fa-solid fa-rotate-left"></i>,
      title: "Easy Returns",
      subtitle: "30-day return policy",
    },
  ];

  return (
    <div className="main-product-container">

      <div className="main-product-start d-flex flex-column-reverse">
        
        <div className="image-rows d-flex">
            {imagesArray.length === 0 ? (<span className="text-center" style={{ minHeight: "60px",minWidth: "60px",backgroundColor: "#f0f3ffA1",}}>No Image</span>) : (imagesArray.map((_, id) => (<img key={id} onClick={() => setTargetImage(id)} src={getImageSrc(imagesArray[id])} alt={`Image${id}`} className={`targetImage mb-2 justify-content-center d-flex align-items-center ${targetImage === id ? "active" : ""}`}/>)))}
        </div>

        <div className="target-image py-3">
          <img src={imagesArray.length > 0 ? getImageSrc(imagesArray[targetImage]) : "/placeholder.png"}alt="No Images" className="targetImage rounded-3 mb-2 justify-content-center d-flex align-items-center"/>
        </div>

      </div>

      <div className="main-product-end">
        {!user ? null : (<div className="more" style={{zIndex: 100,position: "relative",bottom: "-3rem",right: "0px"}}>
            <div
              className="toggle-more border mt-1 rounded-2"
              style={{
                display: toggleMore ? "flex" : "none",
                flexDirection: "column",
                position: "absolute",
                right: "0.2rem",
              }}
            >
              {user?.role === "admin" ? (
                <>
                  <button
                    className="btn text-primary d-flex align-items-center py-2 w-100 rounded-0"
                    onClick={() =>
                      setToggleEdit({ status: true, product: product })
                    }
                  >
                    <i className="fa-regular fa-pen-to-square text-primary"></i>{" "}
                    Edit
                  </button>

                  <button
                    className="btn text-danger d-flex align-items-center py-2 w-100"
                    onClick={() =>
                      setToggleRemove({ status: true, product: product })
                    }
                  >
                    <i className="fa-regular fa-trash-can text-danger"></i>{" "}
                    Remove
                  </button>

                  <button
                    className="btn text-danger d-flex align-items-center py-2 w-100 gap-2"
                    onClick={() =>
                      setToggleReportProduct({
                        status: true,
                        reportDetails: product,
                      })
                    }
                  >
                    <i className="fa-solid fa-flag text-danger"></i> Report
                  </button>
                </>
              ) : (
                <button
                  className="btn text-danger d-flex align-items-center py-2 w-100 gap-2"
                  onClick={() =>
                    setToggleReportProduct({
                      status: true,
                      reportDetails: product,
                    })
                  }
                >
                  <i className="fa-solid fa-flag text-danger"></i> Report
                </button>
              )}
            </div>
          </div>
        )}

        <div className="main-product-end-header">
          <Link to="/">
            <i className="fa-solid fa-arrow-left"></i> Back to Products
          </Link>

          <button
            className={`more-button btn border-0 rounded-3 w-auto align-self-start ${
              !toggleMore && "btn-none"
            }`}
            style={{
              fontSize: "12px",
              padding: "5px 8px",
              backgroundColor: toggleMore && "#10b981",
              position: "absolute",
              right: "1rem",
            }}
            onClick={() => setToggleMore(!toggleMore)}
          >
            {toggleMore ? (
              <i className="fa-solid fa-xmark text-white"></i>
            ) : (
              <i className="fa-solid fa-ellipsis-vertical"></i>
            )}
          </button>
        </div>

        <h5
          className="text-break fw-medium ps-1"
          style={{ fontSize: "22px" }}
        >
          {product.title}
        </h5>

        <div className="product-main-container d-flex flex-row justify-content-between align-items-end">
          <div className="sales-price d-flex align-items-center gap-2">
            {product.sales_price ? (
              <>
                <span
                  className="d-flex align-items-center justify-content-end fw-bold"
                  style={{ fontSize: "20px", color: "#10b981" }}
                >
                  ${product.sales_price}
                </span>
                <span
                  style={{
                    textDecoration: "line-through",
                    fontSize: "14px",
                  }}
                >
                  ${product.price}
                </span>
              </>
            ) : (
              <span
                className="d-flex align-items-center justify-content-end fw-bold"
                style={{ fontSize: "20px", color: "#10b981" }}
              >
                ${product.price}
              </span>
            )}
          </div>
        </div>

        <div className="product-description-container">
          <h6 className="small">{product.description}</h6>
          <span
            className="fw-bold"
            style={{ fontSize: "14px", color: "#10b981" }}
          >
            <i
              className="fa-solid fa-box-archive"
              style={{ color: "#10b981" }}
            ></i>{" "}
            {product.amount > 0
              ? `${product.amount} Items Left`
              : "Out Of Stock"}
          </span>
        </div>

        <div
          className="row d-flex flex-column align-items-start mt-3"
          style={{ overflow: "hidden" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="row-start d-flex justify-content-between">
              <span
                className="avalability rounded-5"
                style={{
                  fontSize: "14px",
                  padding: "2px 10px",
                  letterSpacing: "1px",
                }}
              >
                QUANTITY
              </span>
            </div>

            <div className="row-buttons row-end d-flex gap-2 align-items-center">
              <button
                className="btn border-0"
                disabled={isInCart}
                onClick={() =>
                  setAmount((prev) => (prev - 1 <= 0 ? 0 : prev - 1))
                }
              >
                -
              </button>

              <span>{isInCart ? inCartAmount : amount}</span>

              <button
                className="btn border-0"
                disabled={isInCart}
                onClick={() =>
                  setAmount((prev) =>
                    prev + 1 > product.amount ? prev : prev + 1
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          <button
            className="btn border-0 px-3 py-2 mt-2 w-100 fw-bold mx-auto"
            style={{
              backgroundColor: "#10b981",
              color: "white",
              maxWidth: "97%",
              height: "50px",
            }}
            onClick={() => handleAddToCart(product.products_id)}
            disabled={isInCart || amount === 0}
          >
            <i className="fa-solid fa-cart-shopping text-white me-2"></i>
            Add To Cart
          </button>
        </div>

        <div className="trust-container">
          {features.map((item) => (
            <div key={item.id} className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div>
                <p className="trust-title">{item.title}</p>
                <span className="trust-subtitle">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;