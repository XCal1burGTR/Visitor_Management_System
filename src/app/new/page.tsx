'use client'

import { useActionState, useState, useRef, useCallback } from 'react'
import { checkInVisitor } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Camera, User, Building, Loader2 } from 'lucide-react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import Link from 'next/link'

const initialState = {
    message: '',
    success: false,
}

export default function NewVisitorPage() {
    const [state, formAction, isPending] = useActionState(checkInVisitor, initialState)
    const [photo, setPhoto] = useState<string | null>(null)
    const webcamRef = useRef<Webcam>(null)
    const [isCameraOpen, setIsCameraOpen] = useState(false)

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) {
            setPhoto(imageSrc)
            setIsCameraOpen(false)
        }
    }, [webcamRef])

    return (
        <main className="min-h-screen bg-slate-50/50 p-6 font-sans pb-24 flex items-center justify-center">
            <div className="w-full max-w-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Check In</h1>
                    <p className="text-slate-500 mt-2">Register a new visitor</p>
                </div>

                <Card className="border-0 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                        {state?.message && (
                            <Alert variant={state.success ? "default" : "destructive"} className="mb-6">
                                <AlertTitle>{state.success ? "Success" : "Error"}</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}

                        <form action={formAction} className="space-y-8">
                            {/* Photo Section */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative h-40 w-40 rounded-full overflow-hidden bg-slate-100 ring-4 ring-white shadow-lg flex items-center justify-center group cursor-pointer transition-all hover:ring-blue-50" onClick={() => !photo && setIsCameraOpen(true)}>
                                    {photo ? (
                                        <>
                                            <Image src={photo} alt="Visitor" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); setPhoto(null); }}>
                                                <span className="text-white text-xs font-bold uppercase tracking-wider">Retake</span>
                                            </div>
                                        </>
                                    ) : isCameraOpen ? (
                                        <div className="relative h-full w-full">
                                            <Webcam
                                                audio={false}
                                                ref={webcamRef}
                                                screenshotFormat="image/jpeg"
                                                className="h-full w-full object-cover"
                                                videoConstraints={{ facingMode: "user" }}
                                            />
                                        </div>
                                    ) : (
                                        <Camera className="h-12 w-12 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                    )}
                                </div>

                                {isCameraOpen ? (
                                    <Button type="button" onClick={capture} size="sm" className="rounded-full px-6">Capture Photo</Button>
                                ) : (
                                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsCameraOpen(true)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                        {photo ? 'Change Photo' : 'Take Photo'}
                                    </Button>
                                )}
                                <input type="hidden" name="photoBase64" value={photo || ''} />
                            </div>

                            <div className="space-y-6">
                                {/* Visitor Details */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                        <User className="w-4 h-4 text-blue-500" /> Visitor Details
                                    </h3>
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="visitorName" className="text-xs text-slate-500 uppercase font-bold">Full Name</Label>
                                            <Input id="visitorName" name="visitorName" required placeholder="John Doe" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="contactNumber" className="text-xs text-slate-500 uppercase font-bold">Phone Number</Label>
                                            <Input id="contactNumber" name="contactNumber" required placeholder="+1 234 567 8900" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 w-full"></div>

                                {/* Visit Details */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                        <Building className="w-4 h-4 text-blue-500" /> Visit Details
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="apartmentNo" className="text-xs text-slate-500 uppercase font-bold">Apt No</Label>
                                            <Input id="apartmentNo" name="apartmentNo" required placeholder="101" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="floor" className="text-xs text-slate-500 uppercase font-bold">Floor</Label>
                                            <Input id="floor" name="floor" type="number" required placeholder="1" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label htmlFor="hostName" className="text-xs text-slate-500 uppercase font-bold">Host Name</Label>
                                            <Input id="hostName" name="hostName" required placeholder="Jane Smith" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label htmlFor="purpose" className="text-xs text-slate-500 uppercase font-bold">Purpose</Label>
                                            <Input id="purpose" name="purpose" required placeholder="Delivery, Meeting, etc." className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Link href="/" className="flex-1">
                                    <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={isPending} className="flex-[2] h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {isPending ? 'Checking In...' : 'Check In Visitor'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
