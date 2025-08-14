// import { useHierarchy } from "@/hooks/useHierarchy"
// import React from "react"

// export const HierarchySelector = () => {
//     const {
//         clusters,
//         // sites,
//         selectedCluster,
//         selectedSite,
//         isLoading,
//         handleClusterChange,
//         handleSiteChange
//     } = useHierarchy()

//     if (isLoading) {
//         return <div className="flex justify-center p-4">Loading...</div>
//     }

//     const sites =
//         clusters.find((cluster) => cluster.id === selectedCluster)?.sites || []
//     return (
//         <div className="flex gap-4 w-1/3">
//             {
//                 <div className="flex items-center gap-3 w-full">
//                     <label className="block text-md font-medium text-gray-700">
//                         Cluster:
//                     </label>
//                     <select
//                         // disabled={clusters.length <= 1}
//                         value={selectedCluster ?? ""}
//                         onChange={(e) =>
//                             handleClusterChange(e.target.value || null)
//                         }
//                         className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-1.5"
//                     >
//                         <option value="">Select Cluster</option>
//                         {clusters.map((cluster) => (
//                             <option
//                                 key={cluster.id}
//                                 value={cluster.id}
//                             >
//                                 {cluster.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             }

//             {selectedCluster && (
//                 <div className="flex items-center gap-3 w-full">
//                     <label className="block text-md font-medium text-gray-700">
//                         Site:
//                     </label>
//                     <select
//                         // disabled={sites.length === 1}
//                         value={localStorage.getItem("selectedSite") ? localStorage.getItem("selectedSite") : selectedSite ?? ""}
//                         onChange={(e) =>
//                         {
//                             handleSiteChange(e.target.value || null);
//                         }
//                         }
//                         className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-100 focus:ring-primary-100 p-1.5"
//                     >
//                         <option value="">Select Site</option>
//                         {sites.map(({ siteId, siteName }) => (
//                             <option
//                                 key={siteId}
//                                 value={siteId}
//                             >
//                                 {siteName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//         </div>
//     )
// }


import { useHierarchy } from "@/hooks/useHierarchy"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React from "react"
// import CBRELogo from "../../public/images/CBRE-Logo.png"
// import CBRELogo from "@/images/CBRELogo.png"
import CBRELogo from "../images/CBRELogo.png"

export const HierarchySelector = () => {
    const {
        clusters,
        // sites,
        selectedClient,
        selectedCluster,
        selectedSite,
        isLoading,
        handleClusterChange,
        handleSiteChange
    } = useHierarchy()

    if (isLoading) {
        return <div className="flex justify-center p-4">Loading...</div>
    }

    const sites =
        clusters.find((cluster) => cluster.id === selectedCluster)?.sites || []
    return (
        <div className="flex gap-4 w-2/3 items-center">
            {
                <div className="flex items-center gap-3 w-full">
                    {/* <label className="block text-md font-medium text-gray-700">
                        Client:
                    </label> */}
                    <select
                        // disabled={clusters.length <= 1}
                        value={selectedClient ?? ""}
                        onChange={(e) =>
                            handleClusterChange(e.target.value || null)
                        }
                        className="w-full rounded-md border bg-transparent  focus:border-indigo-500 focus:ring-indigo-500 p-1.5"
                    >
                        <option value="">Client</option>
                        {clusters.map((cluster) => (
                            <option
                                key={cluster.id}
                                value={cluster.id}
                            >
                                {cluster.name}
                            </option>
                        ))}
                    </select>
                </div>
            }
            {
                <div className="flex items-center gap-3 w-full">
                    {/* <label className="block text-md font-medium text-gray-700">
                        Cluster:
                    </label> */}
                    <select
                        // disabled={clusters.length <= 1}
                        value={selectedCluster ?? ""}
                        onChange={(e) =>
                            handleClusterChange(e.target.value || null)
                        }
                        className="w-full rounded-md border bg-transparent focus:border-indigo-500 focus:ring-indigo-500 p-1.5"
                    >
                        <option value="">Select Cluster</option>
                        {clusters.map((cluster) => (
                            <option
                                key={cluster.id}
                                value={cluster.id}
                            >
                                {cluster.name}
                            </option>
                        ))}
                    </select>
                </div>
            }

            {selectedCluster && (
                <div className="flex items-center gap-3 w-full">
                    {/* <label className="block text-md font-medium text-gray-700">
                        Site:
                    </label> */}
                    <select
                        // disabled={sites.length === 1}
                        value={localStorage.getItem("selectedSite") ? localStorage.getItem("selectedSite") : selectedSite ?? ""}
                        onChange={(e) => {
                            handleSiteChange(e.target.value || null);
                        }
                        }
                        className="w-full rounded-md bg-transparent border  focus:border-primary-100 focus:ring-primary-100 p-1.5"
                    >
                        <option value="">Select Site</option>
                        {sites.map(({ siteId, siteName }) => (
                            <option
                                key={siteId}
                                value={siteId}
                            >
                                {siteName}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="ms-3">
                <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5882 30.5H3.52941C2.59335 30.5 1.69563 30.128 1.03374 29.4659C0.371848 28.8039 0 27.9059 0 26.9695V19.9086C0 18.9722 0.371848 18.0742 1.03374 17.4121C1.69563 16.7501 2.59335 16.3781 3.52941 16.3781H10.5882C11.5243 16.3781 12.422 16.7501 13.0839 17.4121C13.7458 18.0742 14.1176 18.9722 14.1176 19.9086V26.9695C14.1176 27.9059 13.7458 28.8039 13.0839 29.4659C12.422 30.128 11.5243 30.5 10.5882 30.5ZM3.52941 18.1433C3.06138 18.1433 2.61252 18.3293 2.28158 18.6604C1.95063 18.9914 1.76471 19.4404 1.76471 19.9086V26.9695C1.76471 27.4377 1.95063 27.8867 2.28158 28.2177C2.61252 28.5488 3.06138 28.7348 3.52941 28.7348H10.5882C11.0563 28.7348 11.5051 28.5488 11.8361 28.2177C12.167 27.8867 12.3529 27.4377 12.3529 26.9695V19.9086C12.3529 19.4404 12.167 18.9914 11.8361 18.6604C11.5051 18.3293 11.0563 18.1433 10.5882 18.1433H3.52941ZM22.9412 30.5C21.5451 30.5 20.1803 30.0859 19.0195 29.31C17.8587 28.5341 16.9539 27.4314 16.4197 26.1412C15.8854 24.8509 15.7456 23.4312 16.018 22.0615C16.2904 20.6918 16.9626 19.4337 17.9498 18.4462C18.937 17.4587 20.1948 16.7862 21.5641 16.5138C22.9333 16.2413 24.3526 16.3811 25.6425 16.9156C26.9323 17.45 28.0347 18.355 28.8104 19.5162C29.586 20.6774 30 22.0425 30 23.439C30 25.3117 29.2563 27.1077 27.9325 28.4319C26.6087 29.7561 24.8133 30.5 22.9412 30.5ZM22.9412 18.1433C21.8941 18.1433 20.8705 18.4539 19.9999 19.0358C19.1293 19.6177 18.4507 20.4448 18.05 21.4125C17.6493 22.3801 17.5445 23.4449 17.7488 24.4722C17.9531 25.4995 18.4573 26.4431 19.1977 27.1837C19.9381 27.9243 20.8814 28.4287 21.9083 28.633C22.9353 28.8373 23.9998 28.7325 24.9671 28.3316C25.9345 27.9308 26.7614 27.2521 27.3431 26.3812C27.9248 25.5103 28.2353 24.4864 28.2353 23.439C28.2353 22.0345 27.6775 20.6875 26.6847 19.6944C25.6918 18.7013 24.3453 18.1433 22.9412 18.1433ZM20.1 14.6129H9.9C9.29299 14.6126 8.69754 14.4468 8.17768 14.1334C7.65782 13.8199 7.23322 13.3706 6.94956 12.8338C6.6659 12.2969 6.5339 11.6929 6.56777 11.0867C6.60164 10.4804 6.80008 9.8949 7.14176 9.39304L12.2012 1.97904C12.5121 1.52323 12.9296 1.15024 13.4173 0.892486C13.9051 0.63473 14.4484 0.5 15 0.5C15.5516 0.5 16.0949 0.63473 16.5827 0.892486C17.0704 1.15024 17.4879 1.52323 17.7988 1.97904L22.8582 9.40363C23.197 9.9054 23.3931 10.4899 23.4255 11.0945C23.4578 11.6991 23.3253 12.3012 23.042 12.8362C22.7586 13.3713 22.3352 13.8193 21.817 14.1322C21.2988 14.4452 20.7053 14.6113 20.1 14.6129ZM13.6588 2.96228L8.59941 10.3763C8.43611 10.6131 8.34073 10.8902 8.32359 11.1774C8.30646 11.4646 8.36823 11.751 8.50222 12.0056C8.6362 12.2602 8.83728 12.4732 9.08368 12.6216C9.33007 12.7701 9.61238 12.8482 9.9 12.8476H20.1C20.3859 12.8473 20.6663 12.7691 20.9111 12.6214C21.1559 12.4737 21.3559 12.2622 21.4896 12.0094C21.6233 11.7566 21.6856 11.4722 21.67 11.1867C21.6543 10.9011 21.5612 10.6252 21.4006 10.3886L16.3412 2.96228C16.1922 2.74384 15.9922 2.56509 15.7584 2.44156C15.5247 2.31803 15.2643 2.25346 15 2.25346C14.7357 2.25346 14.4753 2.31803 14.2416 2.44156C14.0078 2.56509 13.8078 2.74384 13.6588 2.96228Z" fill="#686687" />
                </svg>
            </div>
            <div className="ms-3">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6.5H20V2.5C20 1.96957 19.7893 1.46086 19.4142 1.08579C19.0391 0.710714 18.5304 0.5 18 0.5H2C1.46957 0.5 0.960859 0.710714 0.585786 1.08579C0.210714 1.46086 0 1.96957 0 2.5V18.5C0.000587141 18.6881 0.054234 18.8723 0.154778 19.0313C0.255321 19.1903 0.398683 19.3177 0.568392 19.3989C0.738102 19.4801 0.927276 19.5118 1.11418 19.4903C1.30108 19.4689 1.47814 19.3951 1.625 19.2775L6 15.75V19.5C6 20.0304 6.21071 20.5391 6.58579 20.9142C6.96086 21.2893 7.46957 21.5 8 21.5H19.6987L24.375 25.2775C24.5519 25.4206 24.7724 25.4991 25 25.5C25.2652 25.5 25.5196 25.3946 25.7071 25.2071C25.8946 25.0196 26 24.7652 26 24.5V8.5C26 7.96957 25.7893 7.46086 25.4142 7.08579C25.0391 6.71071 24.5304 6.5 24 6.5ZM5.31875 13.7225L2 16.4062V2.5H18V13.5H5.9475C5.71863 13.5 5.4967 13.5786 5.31875 13.7225ZM24 22.4062L20.6812 19.7225C20.5043 19.5794 20.2838 19.5009 20.0562 19.5H8V15.5H18C18.5304 15.5 19.0391 15.2893 19.4142 14.9142C19.7893 14.5391 20 14.0304 20 13.5V8.5H24V22.4062Z" fill="#686687" />
                </svg>

            </div>
            <div className="ms-3">
                <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.725 19.4925C23.0313 18.2975 22 14.9163 22 10.5C22 7.84784 20.9464 5.3043 19.0711 3.42893C17.1957 1.55357 14.6522 0.5 12 0.5C9.34785 0.5 6.80431 1.55357 4.92895 3.42893C3.05358 5.3043 2.00002 7.84784 2.00002 10.5C2.00002 14.9175 0.967516 18.2975 0.273766 19.4925C0.0966042 19.7963 0.00268396 20.1415 0.00147663 20.4931C0.000269303 20.8448 0.0918178 21.1906 0.266889 21.4956C0.441961 21.8006 0.694365 22.0541 0.998648 22.2304C1.30293 22.4068 1.64833 22.4997 2.00002 22.5H7.10127C7.33198 23.6289 7.94555 24.6436 8.83818 25.3722C9.73082 26.1009 10.8477 26.4989 12 26.4989C13.1523 26.4989 14.2692 26.1009 15.1618 25.3722C16.0545 24.6436 16.6681 23.6289 16.8988 22.5H22C22.3516 22.4995 22.6968 22.4064 23.0009 22.23C23.3051 22.0535 23.5573 21.8 23.7322 21.4951C23.9071 21.1901 23.9986 20.8444 23.9973 20.4928C23.996 20.1412 23.9021 19.7962 23.725 19.4925ZM12 24.5C11.3798 24.4998 10.7749 24.3074 10.2685 23.9492C9.76216 23.5911 9.37926 23.0848 9.17252 22.5H14.8275C14.6208 23.0848 14.2379 23.5911 13.7315 23.9492C13.2252 24.3074 12.6202 24.4998 12 24.5ZM2.00002 20.5C2.96252 18.845 4.00002 15.01 4.00002 10.5C4.00002 8.37827 4.84287 6.34344 6.34316 4.84315C7.84345 3.34285 9.87828 2.5 12 2.5C14.1217 2.5 16.1566 3.34285 17.6569 4.84315C19.1572 6.34344 20 8.37827 20 10.5C20 15.0063 21.035 18.8412 22 20.5H2.00002Z" fill="#686687" />
                </svg>
            </div>
            <div className="ms-3">
                <Image
                    src={
                        CBRELogo
                    }
                    height={200}
                    width={200}
                    alt="CBRELogo"
                    className="fill-blue-600 text-blue0 rounded-full"
                />
            </div>
        </div>
    )
}
