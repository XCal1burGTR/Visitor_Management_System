import prisma from '@/lib/prisma'
import { VisitorCard } from '@/components/visitor-card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

export default async function HistoryPage() {
    const visitors = await prisma.visitorLog.findMany({
        orderBy: { checkInTime: 'desc' },
    })

    return (
        <main className="min-h-screen bg-slate-50/50 font-sans pb-24">
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/60">
                <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="-ml-2 text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Visitor History</h1>
                </div>
            </header>

            <div className="max-w-lg mx-auto px-6 pt-6 space-y-6">
                {/* Search (Visual only for now) */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search visitors..." className="pl-10 bg-white border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500/20" />
                </div>

                <div className="space-y-4">
                    {visitors.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-500">No history found.</p>
                        </div>
                    ) : (
                        visitors.map((visitor) => (
                            <VisitorCard key={visitor.id} visitor={visitor} />
                        ))
                    )}
                </div>
            </div>
        </main>
    )
}
