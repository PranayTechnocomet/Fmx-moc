import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    gatePasses: [],
    isLoading: false,
    error: null,
    selectedTransferType: '',
    selectedInwardType: 'sifydelivery',
    showTransferTypes: false,
    showForm: false,
    showReturnAllColumn: false
}

const gatePassSlice = createSlice({
    name: "gatePass",
    initialState,
    reducers: {
        setGatePasses: (state, action) => {
            state.gatePasses = action.payload
        },
        setSelectedTransferType: (state, action) => {
            state.selectedTransferType = action.payload
        },
        setSelectedInwardType: (state, action) => {
            state.selectedInwardType = action.payload
        },
        setShowTransferTypes: (state, action) => {
            state.showTransferTypes = action.payload
        },
        setShowForm: (state, action) => {
            state.showForm = action.payload
        },
        setShowReturnAllColumn: (state, action) => {
            state.showReturnAllColumn = action.payload;
        }
    }
})

export const { setGatePasses, setSelectedTransferType, setSelectedInwardType, setShowTransferTypes, setShowForm, setShowReturnAllColumn } = gatePassSlice.actions
export default gatePassSlice.reducer