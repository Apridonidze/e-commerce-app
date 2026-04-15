import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderSkeleton = () => {
    return(
        <div className="order-skeleton">
            <SkeletonTheme baseColor="#e9ecf5" highlightColor="#f5f7ff">
                <div className="card-details-skeleton">
            
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="row">
                            <Skeleton width={240} height={45} />
                            <Skeleton width={400} height={20} />
                        </div>
                        <div className="row">
                            <Skeleton width={160} height={40} />
                        </div>
                    </div>
                
                    <div style={{ borderRadius: 12}}>
                        <Skeleton height={100} borderRadius={5} />
                        <Skeleton height={100} borderRadius={5} />
                        <Skeleton height={100} borderRadius={5} />
                    </div>
            
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default OrderSkeleton;