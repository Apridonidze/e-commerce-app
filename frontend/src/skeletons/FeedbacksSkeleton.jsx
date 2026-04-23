import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; //importing react loading skeleton's assets

const FeedbacksSkeleton = () => {
    return(
        <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
            <div className="reports-loading-skeleton mt-5" >
                <Skeleton width={50} style={{marginRight : '1rem'}} inline height={30}/>
                <Skeleton width={250} inline height={30}/>

                <div className="row row-cols-md-3 row-cols-lg-5 row-cols-sm-12 row-cols-1 mt-2">
                    <Skeleton width={'100%'} height={200}/>
                    <Skeleton width={'100%'} height={200}/>
                    <Skeleton width={'100%'} height={200}/>
                    <Skeleton width={'100%'} height={200}/>
                    <Skeleton width={'100%'} height={200}/>
                </div>

            </div>
        </SkeletonTheme>
    );
};

export default FeedbacksSkeleton; //exporting component