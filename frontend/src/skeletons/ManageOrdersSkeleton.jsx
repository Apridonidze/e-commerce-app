import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageOrdersSkeleton = () => {
    return(
        <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Skeleton width={120} height={40} />
            </div>
            
            <div className="orders-container" style={{ borderRadius: 12}}>
                <Skeleton height={500} borderRadius={5} />
                <Skeleton height={500} borderRadius={5} />
                <Skeleton height={500} borderRadius={5} />
            </div>
        </SkeletonTheme>
    );
};

export default ManageOrdersSkeleton; //exporting component