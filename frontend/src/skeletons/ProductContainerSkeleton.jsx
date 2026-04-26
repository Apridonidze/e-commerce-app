import '../styles/skeleton.css'

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductContainerSkeleton = () => {
  return (
    <div className="product-skeleton-wrapper">
        <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
        
            <div className="skeleton-left">
                <Skeleton className="skeleton-main-image" />

                <div className="skeleton-thumbs">
                    <Skeleton width={80} height={80} />
                    <Skeleton width={80} height={80} />
                </div>
            </div>

            <div className="skeleton-right">
            
                <Skeleton width={140} height={20} />
                <Skeleton height={28} width="80%" />

                <div className="skeleton-price">
                    <Skeleton width={80} height={24} />
                    <Skeleton width={60} height={20} />
                </div>

                <Skeleton count={3} />
                <Skeleton width={120} height={20} />
                <Skeleton width={200} height={40} />
                <Skeleton height={50} />
                
                <div className="skeleton-features">
                    <Skeleton height={60} />
                    <Skeleton height={60} />
                    <Skeleton height={60} />
                </div>
            </div>

        </SkeletonTheme>
    </div>
  );
};

export default ProductContainerSkeleton;