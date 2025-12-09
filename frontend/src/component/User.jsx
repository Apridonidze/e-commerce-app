import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const User = ( { user } ) => {

    return(
        <section id="user">
            
            <div className="user-container border border-2">
                <span className='position-relative bg-white' style={{bottom: '15px'}}>{'Account'|| <Skeleton />}</span>

                <h1>{user?.id || <Skeleton />}</h1>
                <h1>{user?.fullname || <Skeleton />}</h1>
                <h1>{user?.email || <Skeleton />}</h1>
                <h1>{[user?.country_code , ' ' , user?.phone]|| <Skeleton />}</h1>
                <h1>{user?.fullname || <Skeleton />}</h1>

            </div>

        </section>
    )
}

export default User