import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; //importing react loading skeleton's assets

const FeedbacksSkeleton = () => {
    return(
        <SkeletonTheme>
            <div className="feedback-loading-skeleton">

            </div>
        </SkeletonTheme>
    );
};

export default FeedbacksSkeleton; //exporting component