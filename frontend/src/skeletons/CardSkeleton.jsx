import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
      <div className="card-details-skeleton pt-4">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Skeleton width={120} height={18} />
          <Skeleton width={60} height={14} />
        </div>

        <div style={{ borderRadius: 12}}>
          <Skeleton height={160} borderRadius={5} />
        </div>

      </div>
    </SkeletonTheme>
  );
};

export default CardSkeleton;