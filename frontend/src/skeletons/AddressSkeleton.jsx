import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddressSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9ecf5" highlightColor="#f5f7ff">
      <div className="address-book-skeleton mt-4">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Skeleton width={140} height={18} />
          <Skeleton width={60} height={14} />
        </div>

        <div style={{borderRadius: 10}}>
            <div className="d-flex justify-content-start gap-1 mb-2">
                <Skeleton width={20} height={12} />
                <Skeleton width={120} height={14} />
            </div>

            <div className="d-flex justify-content-start gap-1 mb-2">
                <Skeleton width={20} height={12} />
                <Skeleton width={120} height={14} />
            </div>
            <div className="d-flex justify-content-start gap-1 mb-2">
                <Skeleton width={20} height={12} />
                <Skeleton width={120} height={14} />
            </div>
            <div>
                <Skeleton height={40} width="100%" />
            </div>
        </div>

      </div>
    </SkeletonTheme>
  );
};

export default AddressSkeleton;