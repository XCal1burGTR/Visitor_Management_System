'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, ChevronDown, ChevronUp, User, Phone, Building, Briefcase, Clock, Printer } from 'lucide-react'
import Image from 'next/image'
import { VisitorLog } from '@prisma/client'
import { TimeDisplay } from './time-display'
import { checkOutVisitor } from '@/app/actions'
import { GatePass } from './gate-pass'

interface VisitorCardProps {
    visitor: VisitorLog
}

export function VisitorCard({ visitor }: VisitorCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card
            className="overflow-hidden shadow-sm border-0 ring-1 ring-slate-200 transition-all duration-200 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex h-32">
                <div className="w-1/3 relative bg-slate-200 shrink-0">
                    {visitor.photoUrl ? (
                        <Image
                            src={visitor.photoUrl}
                            alt={visitor.visitorName}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                            No Photo
                        </div>
                    )}
                    {visitor.status === 'EXITED' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-bold uppercase tracking-wide border border-white px-2 py-1 rounded">Exited</span>
                        </div>
                    )}
                </div>
                <div className="w-2/3 p-3 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h2 className="font-bold text-lg truncate text-slate-900 w-3/4">{visitor.visitorName}</h2>
                            {visitor.status === 'INSIDE' && <span className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0"></span>}
                        </div>
                        <p className="text-sm text-slate-600 font-medium">Apt: {visitor.apartmentNo}</p>
                        <p className="text-xs text-slate-400 mt-1 flex items-center">
                            In: <TimeDisplay date={visitor.checkInTime} />
                        </p>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-xs text-blue-600 font-medium flex items-center">
                            {isExpanded ? 'Show Less' : 'Details'}
                            {isExpanded ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                        </span>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div
                    className="bg-slate-50 p-4 border-t border-slate-100 space-y-3 text-sm animate-in slide-in-from-top-2 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <p className="text-xs text-slate-500 flex items-center"><Phone className="h-3 w-3 mr-1" /> Contact</p>
                            <p className="font-medium text-slate-800">{visitor.contactNumber}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-slate-500 flex items-center"><User className="h-3 w-3 mr-1" /> Host</p>
                            <p className="font-medium text-slate-800">{visitor.hostName}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-slate-500 flex items-center"><Briefcase className="h-3 w-3 mr-1" /> Purpose</p>
                            <p className="font-medium text-slate-800">{visitor.purpose}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-slate-500 flex items-center"><Building className="h-3 w-3 mr-1" /> Floor</p>
                            <p className="font-medium text-slate-800">{visitor.floor}</p>
                        </div>
                        {visitor.checkOutTime && (
                            <div className="space-y-1 col-span-2">
                                <p className="text-xs text-slate-500 flex items-center"><Clock className="h-3 w-3 mr-1" /> Checked Out</p>
                                <p className="font-medium text-slate-800"><TimeDisplay date={visitor.checkOutTime} /></p>
                            </div>
                        )}
                    </div>

                    {visitor.status === 'INSIDE' && (
                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 h-9 text-xs font-semibold uppercase tracking-wide"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    window.print()
                                }}
                            >
                                <Printer className="w-3 h-3 mr-2" />
                                Print Pass
                            </Button>
                            <form
                                action={checkOutVisitor.bind(null, visitor.id)}
                                className="flex-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Button variant="destructive" size="sm" className="w-full h-9 text-xs font-semibold uppercase tracking-wide">
                                    <LogOut className="w-3 h-3 mr-2" />
                                    Check Out
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            )}
            <GatePass visitor={visitor} />
        </Card>
    )
}
