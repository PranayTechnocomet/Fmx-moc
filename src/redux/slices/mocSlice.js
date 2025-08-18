import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mocRequests: [],
    isLoading: false,
    error: null,
    selectedRequestType: '',
    selectedInwardType: 'sifydelivery',
    showTransferTypes: false,
    showForm: false,
    showReturnAllColumn: false,
    attachments: [{ id: Date.now(), description: "", file: null }],
    reloadSecurityData: false,
    mocDetails: null,
}

const mocSlice = createSlice({
    name: "moc",
    initialState,
    reducers: {
        setSelectedRequestType: (state, action) => {
            state.selectedRequestType = action.payload
        },
    //     setSelectedInwardType: (state, action) => {
    //         state.selectedInwardType = action.payload
    //     },
    //     setShowTransferTypes: (state, action) => {
    //         state.showTransferTypes = action.payload
    //     },
    //     setShowForm: (state, action) => {
    //         state.showForm = action.payload
    //     },
    //     setShowReturnAllColumn: (state, action) => {
    //         state.showReturnAllColumn = action.payload;
    //     },
    //     setAttachmentFromAPI: (state, action) => {
    //         state.attachments = action.payload.map(item => ({
    //             id: Date.now() + Math.random(), // Ensure unique ID
    //             description: item.description || "",
    //             file: item.fileName || "",
    //         }));
    //     },
        // toggleReloadSecurityData: (state) => {
        //     state.reloadSecurityData = !state.reloadSecurityData;
        // },
        addAttachment: (state) => {
            state.attachments.push({ id: Date.now(), description: "", file: null });
        },
        updateAttachment: (state, action) => {
            const { id, data } = action.payload;
            const index = state.attachments.findIndex(att => att.id === id);
            if (index !== -1) {
                state.attachments[index] = { ...state.attachments[index], ...data };
            }
        },
        removeAttachment: (state, action) => {
            state.attachments = state.attachments.filter(att => att.id !== action.payload);
        },
        setMocDetails: (state, action) => {
            state.mocDetails = action.payload
        },
    }
})

export const { setSelectedRequestType, setSelectedInwardType, setShowTransferTypes,
    setShowForm, setShowReturnAllColumn, setAttachmentFromAPI,
    addAttachment, updateAttachment, removeAttachment, setMocDetails
} = mocSlice.actions
export default mocSlice.reducer