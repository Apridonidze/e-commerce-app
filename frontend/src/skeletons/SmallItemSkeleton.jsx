import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SmallItemSkeleton = () => {
  return(
    <SkeletonTheme baseColor="#e9ecf5" highlightColor="#f5f7ff">
      <div className="card-details-skeleton d-flex align-items-top gap-3 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Skeleton width={80} height={60} />
        </div>
    
        <div style={{ borderRadius: 12}}>
          <Skeleton height={12} width={200} borderRadius={5} />
          <Skeleton height={12} width={400} borderRadius={5} />
          <Skeleton height={12} width={400} borderRadius={5} />
        </div>
    </div>
    </SkeletonTheme>
  )
}

export default SmallItemSkeleton;