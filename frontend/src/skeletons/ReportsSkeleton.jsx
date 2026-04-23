import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; //importing react loading skeleton's assets

const ReportsSkeleton = () => {
    return(
        <SkeletonTheme baseColor="#e9ecf5A1" highlightColor="#f5f7ffA1">
            <div className="reports-loading-skeleton">
                <Skeleton width={50} style={{marginRight : '1rem'}} inline height={30}/>
                <Skeleton width={250} inline height={30}/>

                <Skeleton width={'100%'} style={{marginTop : '1rem'}} height={100}/>
                <Skeleton width={'100%'} height={100}/>
                <Skeleton width={'100%'} height={100}/>
                <Skeleton width={'100%'} height={100}/>
            </div>
        </SkeletonTheme>
    )
}

export default ReportsSkeleton; //expoprting component