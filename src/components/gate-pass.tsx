'use client'

import { VisitorLog } from '@prisma/client'
import QRCode from 'react-qr-code'
import { TimeDisplay } from './time-display'
import Image from 'next/image'

interface GatePassProps {
    visitor: VisitorLog
}

export function GatePass({ visitor }: GatePassProps) {
    return (
        <div className="hidden print:flex flex-col items-center w-[58mm] mx-auto p-2 font-mono text-black">
            <div className="text-center mb-4">
                <h1 className="text-lg font-bold uppercase leading-tight">Visitor Management System</h1>
                <p className="text-xs mt-1">Gate Pass</p>
            </div>

            <div className="w-full border-b-2 border-dashed border-black mb-4"></div>

            <div className="w-full mb-4">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="text-xl font-bold uppercase break-words w-2/3 leading-none">{visitor.visitorName}</h2>
                    <span className="text-xs font-bold">+{visitor.floor}</span>
                </div>
                <p className="text-sm font-bold">
                    <TimeDisplay date={visitor.checkInTime} />
                </p>
            </div>

            {visitor.photoUrl && (
                <div className="relative w-32 h-32 mb-4 grayscale contrast-125">
                    <Image
                        src={visitor.photoUrl}
                        alt="Visitor Photo"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="w-full text-sm space-y-1 mb-4 font-bold">
                <div className="flex">
                    <span className="w-16 shrink-0">To Meet:</span>
                    <span className="uppercase">{visitor.hostName}</span>
                </div>
                <div className="flex">
                    <span className="w-16 shrink-0">For:</span>
                    <span className="uppercase">{visitor.purpose}</span>
                </div>
                <div className="flex">
                    <span className="w-16 shrink-0">Apt:</span>
                    <span className="uppercase">{visitor.apartmentNo}</span>
                </div>
            </div>

            <div className="mb-4">
                <QRCode
                    value={JSON.stringify({ id: visitor.id, name: visitor.visitorName })}
                    size={96}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 256 256`}
                />
            </div>

            <div className="text-center text-xs font-bold mt-2">
                <p>Please return this slip</p>
                <p>before leaving.</p>
            </div>

            <div className="w-full border-b-2 border-dashed border-black mt-4"></div>
        </div>
    )
}
