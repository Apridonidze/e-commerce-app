import Skeleton , { SkeletonTheme } from "react-loading-skeleton"

const RowSkeleton = () => {
    return(
        <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
            <div className="row-skeleton-container p-2">
                <Skeleton width={'100%'} height={100}/>
                <Skeleton width={'100%'} height={100}/>
                <Skeleton width={'100%'} height={100}/>
                <Skeleton width={'100%'} height={100}/>
            </div>
        </SkeletonTheme>
    )
}

export default RowSkeleton