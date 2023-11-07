import { NavLink } from "react-router-dom";

const Borrow = () => {

return (
    <div>
        <ul className="lg:px-[200px]">
            <div >
                <div className="border-2 rounded-xl border-gray-300 w-full flex p-6 my-6 items-center">
                    <div className=" flex items-center w-[100px]  md:w-[180px] justify-center rounded-lg mr-8">
                        <img  alt="" className="h-[170px] rounded-lg" />
                    </div>
                    <div>
                    <h1 className="text-[18px] lg:text-[24px] font-bold"></h1>
                    <h1 className="text-[16px] lg:text-[20px] font-semibold text-gray-500 pb-[15px]"></h1>
                    <div className="flex gap-4 pb-4">
                        <div className="text-xl text-[#9873FF] rounded-lg">
                        </div>
                        <div className="text-xl text-[#9873FF] rounded-lg">$</div>
                        </div>
                        </div>
                        <div className="flex ml-auto items-center flex-col">
                        <NavLink className="bg-none rounded-lg"><button className="btn bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-[14px] md:text-[18px] md:py-[10px] md:px-[18px]">DELETE</button></NavLink>
                        <NavLink className="bg-none rounded-lg"><button className="btn bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-[14px] md:text-[18px] md:py-[10px] md:px-[18px]">Buy</button></NavLink>
                        </div>
                </div>
            </div>
        </ul>
    </div>
    );
};

export default Borrow;
