// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <div className="relative">
//       <img
//         src={assets.main_banner_bg}
//         alt=""
//         className="hidden md:block w-full"
//       />
//       <img
//         src={assets.main_banner_bg_sm}
//         alt=""
//         className=" md:hidden w-full"
//       />
//       <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end
//        md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24">
//         <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left 
//         max-w-72 md:max-w-80 leading-tight lg:leading-15">
//           Freshness You Can Trust, Savings You will Love!
//         </h1>
//         <div className="flex items-center mt-6 font-medium gap-6 ">
//           <Link
//             to={"/products"}
//             className="flex group items-center gap-2 px-7 rounded text-white  py-3 bg-primary"
//           >
//             Shop Now
//             <img
//               src={assets.white_arrow_icon}
//               alt="arrow"
//               className="md:hidden transition group-focus:translate-x-1"
//             />
//           </Link>
//           <Link
//             to={"/products"}
//             className="hidden md:flex group items-center gap-2 px-7 rounded text-white  py-3 bg-primary"
//           >
//             Explore Deals
//             <img
//               src={assets.white_arrow_icon}
//               alt="arrow"
//               className="md:hidden transition group-focus:translate-x-1"
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full h-100 md:h-130 overflow-hidden">
      {/* Background Image */}
      <img
        src={assets.main_banner_bg}
        alt="Kitchen Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end px-6 md:px-16">
        
        {/* Smaller, Compact Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 md:p-5 rounded-2xl max-w-sm md:max-w-xs max-h-sm flex flex-col items-center md:items-end text-center md:text-right shadow-xl">
          
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            Freshness You Can <span className="text-orange-500">Trust</span>, <br />
            Savings You will <span className="text-orange-500">Love!</span>
          </h1>

          <p className="mt-2 text-gray-100 text-sm md:text-base font-medium">
            Daily essentials delivered to your doorstep.
          </p>

          <div className="flex items-center justify-center md:justify-end mt-5 gap-3">
            <Link
              to="/products"
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-all"
            >
              Shop Now
            </Link>
            
            <Link
              to="/products"
              className="hidden md:block px-5 py-2.5 bg-slate-900/80 hover:bg-slate-900 text-white text-sm font-bold rounded-lg border border-white/10 transition-all"
            >
              Explore Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;