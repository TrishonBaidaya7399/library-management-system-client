import { useRouteError } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar"
import Footer from "../Component/Shared/Footer"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
    <Navbar/>
    <div id="error-page" className="flex flex-col md:flex-row-reverse items-center justify-center mx-[10px] md:mx-[50px] lg:mx-[100px]">
      <div>
      <img className=" h-[60vh]" src='https://i.ibb.co/nfL7HKZ/404-removebg-preview.png' alt="" />
      </div>
      <div className="text-center md:text-left ">
        <h1 className="text-blue-600 font-bold text-2xl md:text-4xl lg:text-8xl">Oops!</h1>
        <p className="text-blue-600 font-bold text-xl md:text-2xl">Sorry, an unexpected error has occurred.</p>
        <p className="text-red-600 font-bold text-[16px] md:text-xl"><i>{error.statusText || error.message}</i></p> 
      </div>
    </div>
    <Footer/>
    </>
  );
}