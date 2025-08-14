import React from 'react'
import StatusPill from '../ui/StatusPill';

export default function Logs() {

    // Log Data
    const logs = [
        {
            createdBy: "Requested By Maya Sripada",
            date: "27 Dec 2022, 5:00 PM",
            role: "Creator",
            status: "Creator",
        },
    ];

    const statusColors = {
        Creator: 'text-green-600 bg-teal-50',
        "Reciver": 'text-blue-500 bg-gray-50',
        L1: 'text-red-600 bg-red-50'
    };

    const getCreatedByColor = (status) => {
        switch (status) {
            case 'Creator':
                return '';
            case 'Reciver':
                return 'text-blue-500';
            case 'L1':
                return 'text-red-600';
            default:
                return '';
        }
    };

    return (
        <>
            {/* Logs */}
            <div className='p-8 bg-white pt-4'>
                {/* <div className="p-4 md:p-3"> */}
                    <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Logs</h2>

                    <div className="h-auto flex justify-end flex-col gap-3 md:gap-4">
                        {logs.length > 0 ? (
                            logs.map((log, index) => (
                                <div className="relative pl-4 md:pl-6 mt-2 pb-3" key={index}>
                                    <div className="absolute left-0 top-1 h-full border-l-2 my-4 md:my-5 border-dashed border-gray-300"></div>
                                    <div className="absolute left-[-4.5px] top-2 w-2.5 h-2.5 bg-gray-300 rounded-full"></div>

                                <div className="rounded-lg p-3">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                        <p className={`font-semibold text-sm md:text-base text-gray-900 ${getCreatedByColor(log.status)}`}>{log.createdBy}</p>
                                        <StatusPill className={`${statusColors[log.status]} text-xs md:text-sm`} value={log.status} />
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-500">{log.date}</p>
                                    {log.logDetail && (
                                        <p className="mt-2 w-full md:w-11/12 text-xs md:text-sm text-gray-700 bg-gray-50 p-2 rounded border">{log.logDetail}</p>
                                    )}
                                </div>

                                <hr className="mt-3 md:mt-4" />
                            </div>
                        ))) : (
                            <div className="text-gray-400">No logs found</div>
                        )}
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}