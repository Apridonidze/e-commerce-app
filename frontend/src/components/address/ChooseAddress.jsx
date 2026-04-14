import EmptyAddress from "../../empty/EmptyAddress";
import ChooseAddressRow from "./ChooseAddressRow";

const ChooseAddress = ({ setToggleAddress, setToggleAdd, removeAddress, addresses, isLoading, setTargetAddress, targetAddress,handleTargetAddress, orderItems }) => {

    return(
        <div className="choose-address-container rounded-3 mx-1 p-2 ">
            <div className="choose-address-header d-flex align-items-top mb-3 justify-content-between">
                <div className="choose-address-header-start">
                    <h3>Address Book</h3>
                    <h6>Choose Address Order to be delivered at</h6>
                </div>
                <div className="choose-address-header-end">
                    <button className="btn btn-none border-0" onClick={() => setToggleAddress(false)}><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <div className="choose-address-main">
                {!isLoading ? "Loading..." : 
                <div className="address-wrapper">

                    {addresses.length === 0 ? <EmptyAddress /> : addresses.map(address => <ChooseAddressRow targetAddress={targetAddress} handleTargetAddress={handleTargetAddress} setTargetAddress={setTargetAddress} address={address} removeAddress={removeAddress}/>)}
                    
                    {addresses?.length >= 3 ? <></> : 
                        <div className="add-new-address d-flex align-items-center gap-2 justify-content-center text-center py-3 my-2" onClick={() => setToggleAdd(true)}>
                            <i class="fa-solid fa-circle-plus"></i>
                            <span>Add New Address</span>
                        </div>
                    }
                </div>
            }
            </div>
            <div className="choose-address-foooter">
                <button className="btn bg-none border-danger border-2 text-danger" onClick={() => setToggleAddress(false)}>Cancle</button>
                <button className="success btn" onClick={() => orderItems()} disabled={targetAddress ? false : true}>Submit Order</button>
            </div>
        </div>
    );
};

export default ChooseAddress;