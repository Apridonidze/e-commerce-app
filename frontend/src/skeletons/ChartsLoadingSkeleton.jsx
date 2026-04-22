import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChartsLoadingSkeleton = () => {
    return(
        <div className="charts-loading-skeleton-container mt-5">
            <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
                <div className="stats-container my-4">
                    <Skeleton width={'100%'} height={140} />
                    <Skeleton width={'100%'} height={140} />
                    <Skeleton width={'100%'} height={140} />
                </div>
                        
                <div style={{ borderRadius: 12}}>
                    <Skeleton height={400} borderRadius={5} />
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default ChartsLoadingSkeleton; //exporting componnet