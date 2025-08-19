export const STATUS = {
    OPEN: "Open",
    CLOSED: "Closed"
}

export const AUTH_UI = {
    LOGIN: "LOGIN",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    SET_PASSWORD: "SET_PASSWORD"
}

export const GATE_PASS_STATUS = {
    TOTAL: "Total",
    MY_APPROVAL_PENDING: "My Approval Pending",
    APPROVAL_PENDING: "Approval Pending",
    REJECTED: "Rejected",
    RETURN_PENDING: "Return Pending",
    ACCEPTANCE_PENDING: "Acceptance Pending",
    CLOSED: "Closed",
    DRAFT: "Draft",
    OVERDUE: "Overdue"
}

export const RETURNED_STATUS ={
    RETURNED: "Returned",
    PENDING: "Pending",
    MY_APPROVAL_PENDING: "My Approval Pending",
    APPROVAL_PENDING: "Approval Pending",
    REJECTED: "Rejected",
    RETURN_PENDING: "Return Pending",
    ACCEPTANCE_PENDING: "Acceptance Pending",
    CLOSED: "Closed",
    DRAFT: "Draft",
    OVERDUE: "Overdue"
}
export const MEETING_SECTIONS = {
    DETAILS: "DETAILS",
    HOSTS: "HOSTS",
    INTERNAL_INVITEE: "INTERNAL_INVITEE",
    EXTERNAL_INVITEE: "EXTERNAL_INVITEE",
    AGENDAS: "AGENDAS",
    ATTACHMENTS: "ATTACHMENTS",
    REMINDERS: "REMINDERS"
}

export const MEETING_TYPES = {
    PERODIC: "PERODIC",
    AD_HOC: "AD_HOC"
}

export const MEETING_LOCATION_TYPES = {
    VIRTUAL: "virtual",
    OFFLINE: "offline"
}

export const MEETING_OCCURENCE_TYPES = {
    NO_REPEAT: {
        label: "Does not repeat",
        value: "no_repeat"
    },
    DAILY: {
        label: "Daily",
        value: "daily"
    },
    WEEKLY: {
        label: "Weekly",
        value: "weekly"
    },
    MONTHLY: {
        label: "Monthly",
        value: "monthly"
    },
    BI_MONTHLY: {
        label: "Bi-Monthly",
        value: "bi_monthly"
    },
    QUATERLY: {
        label: "Quaterly",
        value: "quaterly"
    },
    HALF_YEARLY: {
        label: "Half Yearly",
        value: "half_yearly"
    },
    YEARLY: {
        label: "Yearly",
        value: "yearly"
    },
    CUSTOM: {
        label: "Customize Occurrences",
        value: "custom"
    }
}

export const TAB_TOPICS = {
    INCIDENT: "INCIDENT",
    ABNORMALITY: "ABNORMALITY",
    ACTIVITIES: "ACTIVITIES"
}

export const INCIDENT_TYPES = {
    FACILITY_INCIDENT: "Facility Incident",
    ACCIDENT: "Accident",
    NEAR_MISS: "Near Miss"
}

export const INCIDENT_CLASSIFICATIONS = {
    NA: "NA"
}

export const ABNORMALITY_TYPES = {
    FACILITY: "Facility",
    OPERATION: "Operation",
    OTHERS: "Others"
}

export const ACTIVITIES_TYPES = {
    ONGOING: "Ongoing",
    PLANNED: "Planned",
    CUSTOMER_RELATED: "Customer Related"
}
export const ACTIVITIES_PRIORITIES = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low"
}

export const RESPONSE_TYPES = {
    YES: "Yes",
    NO: "No",
    NA: "N/A"
}

export const SHIFT_TURNOVER_STATUSES = {
    TOTAL: "TOTAL",
    TAKEOVER_PENDING: "TAKEOVER_PENDING",
    TAKEOVER_COMPLETED: "TAKEOVER_COMPLETED",
    TAKEOVER_MISSED: "TAKEOVER_MISSED",
    TAKEOVER_EXPIRED: "TAKEOVER_EXPIRED",
    TAKEOVER_DELAYED: "TAKEOVER_DELAYED",
    HANDOVER_PENDING: "HANDOVER_PENDING",
    HANDOVER_COMPLETED: "HANDOVER_COMPLETED",
    HANDOVER_MISSED: "HANDOVER_MISSED",
    HANDOVER_EXPIRED: "HANDOVER_EXPIRED",
    HANDOVER_DELAYED: "HANDOVER_DELAYED",
    RETURN_TO_EDIT: "RETURN_TO_EDIT",
    UPCOMING_HANDOVER: "UPCOMING_HANDOVER"
}

export const SHIFT_TURNOVER_STATUSES_COLORS = [
    {
        status: SHIFT_TURNOVER_STATUSES.TOTAL,
        tw_text_color: "text-primary-100",
        tw_bg_color: "bg-primary-100",
        tw_light_bg_color: "bg-blue-100",
        tw_border_color: "border-2 border-primary-100"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.HANDOVER_COMPLETED,
        tw_text_color: "text-green-500",
        tw_bg_color: "bg-green-500",
        tw_light_bg_color: "bg-green-100",
        tw_border_color: "border-2 border-green-500"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.HANDOVER_PENDING,
        tw_text_color: "text-orange-400",
        tw_bg_color: "bg-orange-400",
        tw_light_bg_color: "bg-orange-100",
        tw_border_color: "border-2 border-orange-400"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.HANDOVER_DELAYED,
        tw_text_color: "text-slate-400",
        tw_bg_color: "bg-slate-400",
        tw_light_bg_color: "bg-yellow-50",
        tw_border_color: "border-2 border-slate-400"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.HANDOVER_EXPIRED,
        tw_text_color: "text-red-400",
        tw_bg_color: "bg-red-400",
        tw_light_bg_color: "bg-red-50",
        tw_border_color: "border-2 border-red-400"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.HANDOVER_MISSED,
        tw_text_color: "text-primary-100",
        tw_bg_color: "bg-primary-100",
        tw_light_bg_color: "bg-blue-100",
        tw_border_color: "border-2 border-primary-100"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.TAKEOVER_COMPLETED,
        tw_text_color: "text-slate-700",
        tw_bg_color: "bg-slate-700",
        tw_light_bg_color: "bg-slate-300",
        tw_border_color: "border-2 border-slate-700"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.TAKEOVER_PENDING,
        tw_text_color: "text-amber-900",
        tw_bg_color: "bg-amber-900",
        tw_light_bg_color: "bg-orange-50",
        tw_border_color: "border-2 border-amber-900"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.TAKEOVER_DELAYED,
        tw_text_color: "text-teal-500",
        tw_bg_color: "bg-teal-500",
        tw_light_bg_color: "bg-teal-50",
        tw_border_color: "border-2 border-teal-500"
    },

    {
        status: SHIFT_TURNOVER_STATUSES.TAKEOVER_MISSED,
        tw_text_color: "text-yellow-600",
        tw_bg_color: "bg-yellow-600",
        tw_light_bg_color: "bg-yellow-100",
        tw_border_color: "border-2 border-yellow-600"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.TAKEOVER_EXPIRED,
        tw_text_color: "text-red-400",
        tw_bg_color: "bg-red-400",
        tw_light_bg_color: "bg-red-50",
        tw_border_color: "border-2 border-red-400"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.RETURN_TO_EDIT,
        tw_text_color: "text-cyan-600",
        tw_bg_color: "bg-cyan-600",
        tw_light_bg_color: "bg-gray-50",
        tw_border_color: "border-2 border-cyan-600"
    },
    {
        status: SHIFT_TURNOVER_STATUSES.UPCOMING_HANDOVER,
        tw_text_color: "text-cyan-950",
        tw_bg_color: "bg-cyan-950",
        tw_light_bg_color: "bg-gray-50",
        tw_border_color: "border-2 border-cyan-950"
    }
]

export const PRIMITIVE_INPUTS = [
    "SELECT_BOX",
    "TEXT_AREA",
    "INPUT_BOX",
    "DATE_TIME"
]

export const CM_LIST_STATUSES = {
    Total: {
        key: "total",
        status: "Total",
        color: "bg-primary-100",
        text: "text-primary-100"
    },
    MyApprovalPending: {
        key: "myApprovalPending",
        status: "My Approval Pending",
        color: "bg-orange-500",
        text: "text-orange-500"
    },
    ApprovalPending: {
        key: "approvalPending",
        status: "Approval Pending",
        color: "bg-yellow-600",
        text: "text-yellow-600"
    },
    Approved: {
        key: "approved",
        status: "Approved",
        color: "bg-green-600",
        text: "text-green-600"
    },
    Rejected: {
        key: "rejected",
        status: "Rejected",
        color: "bg-red-600",
        text: "text-red-600"
    },
    ReturnPending: {
        key: "returnPending",
        status: "Return Pending",
        color: "bg-sky-500",
        text: "text-sky-500"
    },
    Closed: {
        key: "closed",
        status: "Closed",
        color: "bg-gray-400",
        text: "text-gray-400"
    },
    Draft: {
        key: "draft",
        status: "Draft",
        color: "bg-teal-800",
        text: "text-teal-800"
    },

    Overdue: {
        key: "overdue",
        status: "Overdue",
        color: "bg-red-900",
        text: "text-red-900"
    },

    Other: {
        key: "other",
        status: "Other",
        color: "bg-lime-500",
        text: "text-lime-500"
    }
}