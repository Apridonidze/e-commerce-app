import ProductSkeleton from "./ProductSkeleton"; //importing prodcut skeleton component

import { SkeletonTheme } from "react-loading-skeleton"; //importing loading skelton theme
import "react-loading-skeleton/dist/skeleton.css"; //importing skeleton styling from react-loadin-skeleton library

const LowStockSkeleton = () => {
    return(
        <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
            <div className="products mt-5">{[...Array(3)].map((_,i) => (<ProductSkeleton key={i}/>))}</div>
        </SkeletonTheme>
    );
};

export default LowStockSkeleton; //exporting component