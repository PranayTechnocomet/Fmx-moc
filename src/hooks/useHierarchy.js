import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { useGetSitesMutation } from "../redux/api/hierarchyApi"
import {
    setClusters,
    setSelectedCluster,
    setSelectedSite,
    setSites
} from "../redux/slices/hierarchySlice"
import { usePathname, useRouter } from "next/navigation"

export const useHierarchy = () => {
    const dispatch = useDispatch()
    const { selectedCluster, selectedSite } = useSelector(
        (state) => state.hierarchy
    )

    const [getSites, { data, isLoading }] = useGetSitesMutation()

    // useEffect(() => {
    //     // Fetch sites on component mount
    //     getSites()
    //         .unwrap()
    //         .then((transformedData) => {
    //             // Set initial cluster and sites
    //             const selctedSiteLocal = localStorage.getItem("selectedSite")
    //             const selectedClusterLocal =
    //                 localStorage.getItem("selectedCluster")
    //             dispatch(setClusters(transformedData.clusters))
    //             dispatch(setSites(transformedData.sites))
    //             // Set default selections
    //             if (
    //                 transformedData.clusters.length > 0 &&
    //                 !selectedClusterLocal
    //             ) {
    //                 dispatch(setSelectedCluster(transformedData.clusters[0].id))
    //                 dispatch(setSites(transformedData.clusters[0].sites))
    //                 localStorage.setItem(
    //                     "selectedCluster",
    //                     transformedData.clusters[0].id
    //                 )
    //             } else {
    //                 dispatch(setSelectedCluster(selectedClusterLocal))
    //                 dispatch(
    //                     setSites(
    //                         transformedData.clusters.find(
    //                             (cluster) => cluster.id === selectedClusterLocal
    //                         )?.sites || []
    //                     )
    //                 )
    //             }
    //             if (selctedSiteLocal) {
    //                 dispatch(setSelectedSite(selctedSiteLocal))
    //             }
    //         })
    // }, [dispatch])
    useEffect(() => {
        getSites()
            .unwrap()
            .then((transformedData) => {
                const selectedSiteLocal = localStorage.getItem("selectedSite")
                const selectedClusterLocal = localStorage.getItem("selectedCluster")

                // Always safe arrays
                const clusters = transformedData?.clusters || []
                const sites = transformedData?.sites || []

                dispatch(setClusters(clusters))
                dispatch(setSites(sites))

                // Set default cluster
                if (clusters.length > 0 && !selectedClusterLocal) {
                    dispatch(setSelectedCluster(clusters[0].id))
                    dispatch(setSites(clusters[0].sites || []))
                    localStorage.setItem("selectedCluster", clusters[0].id)
                } else if (selectedClusterLocal) {
                    dispatch(setSelectedCluster(selectedClusterLocal))
                    dispatch(
                        setSites(
                            clusters.find((c) => c.id === selectedClusterLocal)?.sites || []
                        )
                    )
                }

                // Set default site
                if (selectedSiteLocal) {
                    dispatch(setSelectedSite(selectedSiteLocal))
                }
            })
            .catch((err) => {
                console.error("getSites error:", err)
            })
    }, [dispatch, getSites])


    const handleClusterChange = (clusterId) => {
        dispatch(setSelectedCluster(clusterId))
        if (clusterId == null) {
            localStorage.removeItem("selectedCluster")
            localStorage.removeItem("selectedSite")
        } else {
            localStorage.setItem("selectedCluster", clusterId)
        }
    }

    const handleSiteChange = (siteId) => {
        dispatch(setSelectedSite(siteId))
        if (siteId == null) {
            localStorage.removeItem("selectedSite")
        } else {
            localStorage.setItem("selectedSite", siteId)
        }
    }

    return {
        clusters: data?.clusters ?? [],
        // sites: data?.sites ?? [],
        selectedCluster,
        selectedSite,
        isLoading,
        handleClusterChange,
        handleSiteChange
    }
}
