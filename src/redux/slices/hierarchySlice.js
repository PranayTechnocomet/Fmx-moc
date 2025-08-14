import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedCluster: null,
    selectedSite: null,
    clusters: [],
    sites: [],
    isLoading: false,
    error: null
}

const hierarchySlice = createSlice({
    name: "hierarchy",
    initialState,
    reducers: {
        setSelectedCluster: (state, action) => {
            state.selectedCluster = action.payload
            // Reset site selection when cluster changes
            state.selectedSite = null
            state.sites = []
        },
        setSelectedSite: (state, action) => {
            state.selectedSite = action.payload
        },
        setClusters: (state, action) => {
            state.clusters = action.payload
        },
        // setSites: (state, action) => {
        //     state.sites = action.payload
        // }
        setSites: (state, action) => {
            // Reset site selection when cluster changes
            state.selectedSite = null

            if (state.selectedCluster) {
                const selectedCluster = state.clusters.find(
                    (cluster) => cluster.id === state.selectedCluster
                )
                if (selectedCluster) {
                    state.sites = selectedCluster.sites
                }
            }
            state.sites = action.payload
        }   
    }
})

export const { setSelectedCluster, setSelectedSite, setClusters, setSites } =
    hierarchySlice.actions

export default hierarchySlice.reducer
