import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; //importing react loading skeleton's assets

const ProductPageSkeleton = () => {
    return(
        <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">   
            <div className="d-flex flex-column w-100" style={{maxWidth : '400px'}}>
                <Skeleton width={'100%'} height={250}/>
                <Skeleton width={'100%'} height={250}/>
                <Skeleton width={'100%'} height={250}/>
            </div>
        </SkeletonTheme>
    );
};

export default ProductPageSkeleton; //exporting component