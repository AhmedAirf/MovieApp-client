// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchPersonDetailsAsync,
//   fetchPersonCreditsAsync,
//   clearMediaDetails,
// } from "../../../redux/slices/mediaDetailsSlice";
// import MediaCard from "../../components/common/MediaCard";
// import Loader from "../../components/common/loader";
// import { StarIcon, CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";

const PersonDetails = () => {
  //   const { id } = useParams();
  //   const dispatch = useDispatch();
  //   const theme = useSelector((state) => state.ui.theme);
  //   const { currentPerson, credits, loading, error } = useSelector(
  //     (state) => state.mediaDetails
  //   );
  //   const [activeTab, setActiveTab] = useState("overview");

  //   useEffect(() => {
  //     if (id) {
  //       dispatch(fetchPersonDetailsAsync(id));
  //       dispatch(fetchPersonCreditsAsync(id));
  //     }

  //     return () => {
  //       dispatch(clearMediaDetails());
  //     };
  //   }, [dispatch, id]);

  //   const formatDate = (dateString) => {
  //     if (!dateString) return "Unknown";
  //     return new Date(dateString).toLocaleDateString("en-US", {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     });
  //   };

  //   //   const getKnownFor = () => {
  //   //     if (!credits?.cast) return [];
  //   //     return credits.cast
  //   //       .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
  //   //       .slice(0, 6);
  //   //   };

  //   const getActingCredits = () => {
  //     if (!credits?.cast) return [];
  //     return credits.cast.sort(
  //       (a, b) =>
  //         new Date(b.release_date || b.first_air_date || 0) -
  //         new Date(a.release_date || a.first_air_date || 0)
  //     );
  //   };

  //   const getCrewCredits = () => {
  //     if (!credits?.crew) return [];
  //     return credits.crew.sort(
  //       (a, b) =>
  //         new Date(b.release_date || b.first_air_date || 0) -
  //         new Date(a.release_date || a.first_air_date || 0)
  //     );
  //   };

  //   const getGender = () => {
  //     switch (currentPerson?.gender) {
  //       case 1:
  //         return "Female";
  //       case 2:
  //         return "Male";
  //       case 3:
  //         return "Non-binary";
  //       default:
  //         return "Unknown";
  //     }
  //   };

  //   if (loading) {
  //     return (
  //       <div
  //         className={`min-h-screen ${
  //           theme === "dark" ? "bg-black" : "bg-gray-50"
  //         }`}
  //       >
  //         <Loader />
  //       </div>
  //     );
  //   }

  //   if (error || !currentPerson) {
  //     return (
  //       <div
  //         className={`min-h-screen flex items-center justify-center ${
  //           theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
  //         }`}
  //       >
  //         <div className="text-center p-4">
  //           <h2 className="text-2xl font-bold mb-4">Error Loading Person</h2>
  //           <p className="text-gray-500 mb-6">{error || "Person not found"}</p>
  //           <Link
  //             to="/"
  //             className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
  //           >
  //             Go Home
  //           </Link>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    // <div
    //   className={`min-h-screen ${
    //     theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
    //   }`}
    // >
    //   {/* Hero Section */}
    //   <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
    //     {/* Background Image */}
    //     <div className="absolute inset-0">
    //       <img
    //         src={
    //           currentPerson.profile_path
    //             ? `https://image.tmdb.org/t/p/original${currentPerson.profile_path}`
    //             : "/placeholder-person.jpg"
    //         }
    //         alt={currentPerson.name}
    //         className="w-full h-full object-cover"
    //       />
    //       <div
    //         className={`absolute inset-0 ${
    //           theme === "dark" ? "bg-black/70" : "bg-white/70"
    //         }`}
    //       ></div>
    //     </div>

    //     {/* Hero Content */}
    //     <div className="relative z-10 h-full flex items-end">
    //       <div className="container mx-auto px-4 pb-4 md:pb-8">
    //         <div className="flex flex-col md:flex-row gap-4 md:gap-8">
    //           {/* Profile Image - Hidden on small screens */}
    //           <div className="hidden md:block flex-shrink-0">
    //             <img
    //               src={
    //                 currentPerson.profile_path
    //                   ? `https://image.tmdb.org/t/p/w500${currentPerson.profile_path}`
    //                   : "/placeholder-person.jpg"
    //               }
    //               alt={currentPerson.name}
    //               className="w-40 md:w-64 h-60 md:h-96 object-cover rounded-lg shadow-2xl"
    //             />
    //           </div>

    //           {/* Info */}
    //           <div className="flex-1">
    //             <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">
    //               {currentPerson.name}
    //             </h1>

    //             <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4 text-xs md:text-sm flex-wrap">
    //               {currentPerson.birthday && (
    //                 <div className="flex items-center gap-1">
    //                   <CalendarIcon className="h-3 w-3 md:h-4 md:w-4" />
    //                   <span>Born: {formatDate(currentPerson.birthday)}</span>
    //                 </div>
    //               )}
    //               {currentPerson.deathday && (
    //                 <div className="flex items-center gap-1">
    //                   <CalendarIcon className="h-3 w-3 md:h-4 md:w-4" />
    //                   <span>Died: {formatDate(currentPerson.deathday)}</span>
    //                 </div>
    //               )}
    //               {currentPerson.place_of_birth && (
    //                 <div className="flex items-center gap-1">
    //                   <MapPinIcon className="h-3 w-3 md:h-4 md:w-4" />
    //                   <span>{currentPerson.place_of_birth}</span>
    //                 </div>
    //               )}
    //             </div>

    //             {currentPerson.biography && (
    //               <p className="text-sm md:text-lg mb-3 md:mb-6 max-w-3xl leading-relaxed line-clamp-3 md:line-clamp-none">
    //                 {currentPerson.biography}
    //               </p>
    //             )}

    //             <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6">
    //               {currentPerson.known_for_department && (
    //                 <span
    //                   className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
    //                     theme === "dark"
    //                       ? "bg-gray-800 text-gray-200"
    //                       : "bg-gray-200 text-gray-800"
    //                   }`}
    //                 >
    //                   {currentPerson.known_for_department}
    //                 </span>
    //               )}
    //               <span
    //                 className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
    //                   theme === "dark"
    //                     ? "bg-gray-800 text-gray-200"
    //                     : "bg-gray-200 text-gray-800"
    //                 }`}
    //               >
    //                 {getGender()}
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Mobile Profile Image - Only visible on small screens */}
    //   <div className="container mx-auto px-4 md:hidden -mt-16 relative z-10">
    //     <img
    //       src={
    //         currentPerson.profile_path
    //           ? `https://image.tmdb.org/t/p/w300${currentPerson.profile_path}`
    //           : "/placeholder-person.jpg"
    //       }
    //       alt={currentPerson.name}
    //       className="w-24 h-36 object-cover rounded-lg shadow-lg border-4 border-gray-800"
    //     />
    //   </div>

    //   {/* Content Tabs */}
    //   <div className="container mx-auto px-4 py-4 md:py-8">
    //     <div
    //       className={`border-b mb-4 md:mb-8 ${
    //         theme === "dark" ? "border-gray-700" : "border-gray-300"
    //       }`}
    //     >
    //       <nav className="flex space-x-4 md:space-x-8 overflow-x-auto">
    //         {["overview", "acting", "crew"].map((tab) => (
    //           <button
    //             key={tab}
    //             onClick={() => setActiveTab(tab)}
    //             className={`py-2 px-1 border-b-2 font-medium text-xs md:text-sm capitalize whitespace-nowrap ${
    //               activeTab === tab
    //                 ? "border-red-600 text-red-600"
    //                 : theme === "dark"
    //                 ? "border-transparent text-gray-400 hover:text-gray-300"
    //                 : "border-transparent text-gray-500 hover:text-gray-700"
    //             }`}
    //           >
    //             {tab}
    //           </button>
    //         ))}
    //       </nav>
    //     </div>

    //     {/* Tab Content */}
    //     <div className="min-h-[300px]">
    //       {activeTab === "overview" && (
    //         <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
    //           <div className="lg:col-span-2">
    //             <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
    //               Biography
    //             </h3>
    //             <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-8">
    //               {currentPerson.biography || "No biography available."}
    //             </p>

    //             <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
    //               Known For
    //             </h3>
    //             {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
    //               {getKnownFor().map((work) => (
    //                 <MediaCard key={work.id} media={work} className="w-full" />
    //               ))}
    //             </div> */}
    //           </div>

    //           <div className="hidden lg:block">
    //             <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
    //               Personal Details
    //             </h3>
    //             <div className="space-y-2 md:space-y-4 text-sm">
    //               <div>
    //                 <span className="font-semibold">Birthday: </span>
    //                 <span>
    //                   {currentPerson.birthday
    //                     ? formatDate(currentPerson.birthday)
    //                     : "Unknown"}
    //                 </span>
    //               </div>
    //               {currentPerson.deathday && (
    //                 <div>
    //                   <span className="font-semibold">Death Date: </span>
    //                   <span>{formatDate(currentPerson.deathday)}</span>
    //                 </div>
    //               )}
    //               <div>
    //                 <span className="font-semibold">Place of Birth: </span>
    //                 <span>{currentPerson.place_of_birth || "Unknown"}</span>
    //               </div>
    //               <div>
    //                 <span className="font-semibold">Known For: </span>
    //                 <span>
    //                   {currentPerson.known_for_department || "Unknown"}
    //                 </span>
    //               </div>
    //               <div>
    //                 <span className="font-semibold">Gender: </span>
    //                 <span>{getGender()}</span>
    //               </div>
    //               <div>
    //                 <span className="font-semibold">Popularity: </span>
    //                 <span>{currentPerson.popularity?.toFixed(1) || "N/A"}</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {activeTab === "acting" && (
    //         <div>
    //           <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">
    //             Acting Credits
    //           </h3>
    //           {getActingCredits().length > 0 ? (
    //             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
    //               {getActingCredits().map((work) => (
    //                 <MediaCard key={work.id} media={work} className="w-full" />
    //               ))}
    //             </div>
    //           ) : (
    //             <p className="text-gray-500">No acting credits available.</p>
    //           )}
    //         </div>
    //       )}

    //       {activeTab === "crew" && (
    //         <div>
    //           <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">
    //             Crew Credits
    //           </h3>
    //           {getCrewCredits().length > 0 ? (
    //             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
    //               {getCrewCredits().map((work) => (
    //                 <div
    //                   key={`${work.id}-${work.job}`}
    //                   className={`p-2 md:p-3 rounded ${
    //                     theme === "dark" ? "bg-gray-800" : "bg-white shadow"
    //                   }`}
    //                 >
    //                   <MediaCard media={work} className="w-full mb-2" />
    //                   <p className="text-xs md:text-sm text-gray-500">
    //                     {work.job}
    //                   </p>
    //                 </div>
    //               ))}
    //             </div>
    //           ) : (
    //             <p className="text-gray-500">No crew credits available.</p>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div>
      <h1>Person Details</h1>
    </div>
  );
};

export default PersonDetails;
