import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
      <div className="user-card-skeleton">

        <div className="d-flex align-items-center gap-3 mb-3">
          <Skeleton width={60} height={60} />
          <div style={{ flex: 1 }}>
            <Skeleton height={14} width="60%" />
            <Skeleton height={10} width="40%" />
          </div>
        </div>

        <div className="mb-3">
          <Skeleton height={10} width="40%" style={{ marginBottom: 6 }} />
          <Skeleton height={14} width="80%" />
        </div>

        <div className="mb-4">
          <Skeleton height={10} width="45%" style={{ marginBottom: 6 }} />
          <Skeleton height={14} width="60%" />
        </div>

        <Skeleton height={40} width="100%" borderRadius={8} />

      </div>
    </SkeletonTheme>
  );
};

export default UserSkeleton;