import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; //importing react loading skeleton's assets

const ReportsSkeleton = () => {
    return(
        <SkeletonTheme>
            <div className="reports-loading-skeleton">

            </div>
        </SkeletonTheme>
    )
}

export default ReportsSkeleton; //expoprting component