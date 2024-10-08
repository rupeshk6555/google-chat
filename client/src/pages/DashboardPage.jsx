// import { useState } from "react";
// import { FaBars, FaTimes, FaComments, FaImage, FaCode } from "react-icons/fa";
// import ChatList from "../Components/ChatList"; // Import the ChatList

// const DashboardPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Toggle menu visibility
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="relative h-full">
//       {/* Mobile Menu Icon */}
//       <div className="absolute top-4 lg:hidden">
//         <button onClick={toggleMenu} className="focus:outline-none">
//           <FaBars className="w-8 h-8 text-white" />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 w-2/3 h-full bg-[#1f1e2d] text-white transform ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 lg:hidden`}
//       >
//         <div className="p-4">
//           {/* Close button */}
//           <button onClick={toggleMenu} className="focus:outline-none">
//             <FaTimes className="w-6 h-6" />
//           </button>
//           <nav className="mt-10">
//             {/* ChatList Component */}
//             <div className="mb-[100px]">
//               <ChatList />
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="grid grid-rows-[auto,1fr,auto] h-full items-center px-4 lg:px-0">
//         {/* Header */}
//         {/* Conditionally render the logo based on the menu state */}
//         {!isMenuOpen && (
//           <div className="w-full lg:w-1/2 mx-auto text-center">
//             <div className="flex items-center justify-center gap-5 opacity-75 lg:pt-20">
//               <img
//                 src="/logo.png"
//                 alt="logo"
//                 className="w-20 h-20 z-0 overflow-hidden"
//               />
//             </div>
//           </div>
//         )}

//         {/* Option Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-1/2 mx-auto justify-items-center">
//           <div className="flex flex-col items-center border p-5 border-gray-400 border-opacity-25 rounded-lg w-[180px]">
//             <FaComments className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
//             <span className="mt-2 text-sm sm:text-base">Create a New Chat</span>
//           </div>
//           <div className="flex flex-col items-center border p-5 border-gray-400 border-opacity-25 rounded-lg w-[180px]">
//             <FaImage className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
//             <span className="mt-2 text-sm sm:text-base">Analyze Image</span>
//           </div>
//           <div className="flex flex-col items-center border p-5 border-gray-400 border-opacity-25 rounded-lg w-[180px]">
//             <FaCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
//             <span className="mt-2 text-sm sm:text-base">
//               Help me with my code
//             </span>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="mt-auto w-full flex lg:w-1/2 mx-auto bg-[#2c2937] mb-28 p-4 rounded-2xl">
//           <form className="flex items-center justify-between w-full h-full gap-5">
//             <input
//               type="text"
//               placeholder="Ask me anything"
//               className="flex-1 bg-transparent outline-none border-none lg:px-1 placeholder:text-white text-white"
//             />
//             <button className="p-2 size-7   bg-[#605e68] rounded-lg">
//               <img src="/arrow.png" alt="" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaComments, FaImage, FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);
  };
  return (
    <div className="relative h-full">
      {/* Main content */}
      <div className="grid grid-rows-[auto,1fr,auto] h-full items-center px-4 lg:px-0">
        {/* Header */}
        <div className="w-full lg:w-1/2 mx-auto text-center">
          <div className="flex items-center justify-center gap-5 opacity-75 lg:pt-20">
            <img
              src="/logo.png"
              alt="logo"
              className="w-20 h-20 z-0 overflow-hidden"
            />
          </div>
        </div>

        {/* Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-1/2 mx-auto justify-items-center">
          <div className="flex flex-col items-center border p-5 border-gray-400 border-opacity-25 rounded-lg w-[180px]">
            <FaComments className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            <span className="mt-2 text-sm sm:text-base">Create a New Chat</span>
          </div>
          <div className="flex flex-col items-center border p-5 border-gray-400 border-opacity-25 rounded-lg w-[180px]">
            <FaImage className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            <span className="mt-2 text-sm sm:text-base">Analyze Image</span>
          </div>
          <div className="flex flex-col items-center border p-5 border-gray-400 border-opacity-25 rounded-lg w-[180px]">
            <FaCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            <span className="mt-2 text-sm sm:text-base">
              Help me with my code
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="mt-auto w-full flex lg:w-2/3 mx-auto bg-[#2c2937] mb-28  px-7 py-4 rounded-2xl">
          <form
            className="flex items-center justify-between w-full h-full gap-5 "
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="text"
              placeholder="Ask me anything"
              className="flex-1 bg-transparent outline-none border-none lg:px-1   text-white"
            />
            <button className="p-2 size-7 bg-[#605e68] rounded-lg">
              <img src="/arrow.png" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
