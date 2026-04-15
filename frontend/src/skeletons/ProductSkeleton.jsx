import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = ({ key }) => {
    return(
        <div className="product-skeleton" key={key}>
            
            <Skeleton height={"15vh"}/>
            
            <Skeleton width={'100%'}/>
            <Skeleton width={'70%'}/>

            <Skeleton inline width="40%" />
            <Skeleton inline width="40%" style={{ marginLeft: '10px' }} />

            <Skeleton width={'30%'}/>

            <Skeleton width={'100%'} height={'35px'}/>
        </div>
    );
};

export default ProductSkeleton;