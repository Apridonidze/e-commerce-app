import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; //importing react loading skeleton's assets

const CustomerFeedbackSkeleton = () => {
    return(
        <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">   
            <div className="row row-cols-md-3 row-cols-lg-6 row-cols-sm-12 row-cols-1 mt-2">
                <Skeleton width={'100%'} height={200}/>
                <Skeleton width={'100%'} height={200}/>
                <Skeleton width={'100%'} height={200}/>
                <Skeleton width={'100%'} height={200}/>
                <Skeleton width={'100%'} height={200}/>
            </div>
        </SkeletonTheme>
    );
};

export default CustomerFeedbackSkeleton; //exporting component