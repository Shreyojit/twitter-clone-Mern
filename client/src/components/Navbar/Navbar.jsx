// import React, { useState } from "react";
// import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
// import SearchIcon from "@mui/icons-material/Search";
// import TwitterIcon from '@mui/icons-material/Twitter';

// import { useLocation } from "react-router-dom";
// import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";

// const Navbar = () => {
//   const [userData, setUserData] = useState(null);
//   const location = useLocation().pathname;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
//       <div className="mx-auto md:mx-0">
//         <TwitterIcon classname='w-60 ml-8 '/>
//       </div>

//       <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
//         <div className="flex justify-between items-center">
//           <h2 className="font-bold text-2xl">
//             {location.includes("profile") ? (
//               <UserPlaceholder setUserData={setUserData} userData={userData} />
//             ) : location.includes("explore") ? (
//               "Explore"
//             ) : (
//               "Home"
//             )}
//           </h2>
//           <StarBorderPurple500Icon />
//         </div>
//       </div>

//       <div className="px-0 md:px-6 mx-auto">
//         <SearchIcon className="absolute m-2" />
//         <input type="text" className="bg-blue-100 rounded-full py-2 px-8" />
//       </div>
//     </div>
//   );
// };

// export default Navbar;





import React, { useState } from "react";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from '@mui/icons-material/Twitter';
import axios from "axios"; // Import Axios for HTTP requests
import { useNavigate } from 'react-router-dom';

import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;
  
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?q=${q}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
      <div className="mx-auto md:mx-0">
        <TwitterIcon classname='w-60 ml-8' />
      </div>

      <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center">


          {/* <h2 className="font-bold text-2xl">
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "Explore"
            ) : (
              "Home"
            )}
          </h2> */}


{/* <h2 className="font-bold text-2xl">
  {location.includes("profile") ? (
    <UserPlaceholder setUserData={setUserData} userData={userData} />
  ) : location.includes("explore") ? (
    "Explore"
  ) : location.includes("search") ? (
    null // Display null string when location includes "search"
  ) : (
    "Home"
  )}
</h2> */}

<h2 className="font-bold text-2xl">
  {location.includes("profile") ? (
    <UserPlaceholder setUserData={setUserData} userData={userData} />
  ) : location.includes("explore") ? (
    "Explore"
  ) : location === "search" ? (
    null // Display null string when location is "search"
  ) : null // Display null for all other cases
}
</h2>




          <StarBorderPurple500Icon />
        </div>
      </div>

      <div className="px-0 md:px-6 mx-auto ">
      <SearchIcon className="absolute m-2" style={{ fontSize: '20px', marginLeft: '10px', marginRight: '10px' }} />

        <input
          type="text"
          className="bg-blue-100 rounded-full py-2 px-4"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="     Search..."
        />
      </div>
    </div>
  );
};

export default Navbar;





