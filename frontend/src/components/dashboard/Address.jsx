import AddressRow from "../address/AddressRow"; //importing address row container component

import EmptyAddress from "../../empty/EmptyAddress"; //importing empty state of address
import AddressSkeleton from "../../skeletons/AddressSkeleton"; //importing loading skeleton

const Address = ({ removeAddress, addresses, isLoading, setToggleAdd }) => {
    return(
        <div className="addresses-container my-3">

            <div className="address-row"><h5 className="my-auto">Address Book</h5></div>

            {isLoading ? <AddressSkeleton /> : 
                <div className="address-wrapper">
                    {addresses.length === 0 ? <EmptyAddress /> : addresses.map(address => <AddressRow address={address} removeAddress={removeAddress}/>)}
                    
                    {addresses?.length >= 3 ? <></> : 
                        <div className="add-new-address d-flex align-items-center gap-2 justify-content-center text-center py-3 my-2" onClick={() => setToggleAdd(true)}>
                            <i class="fa-solid fa-circle-plus"></i>
                            <span>Add New Address</span>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Address; //exporting component