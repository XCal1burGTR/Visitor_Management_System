import prisma from '@/lib/prisma'
import { checkOutVisitor } from './actions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, LogOut, User } from 'lucide-react'
import { TimeDisplay } from '@/components/time-display'
import { VisitorCard } from '@/components/visitor-card'
import Link from 'next/link'
import Image from 'next/image'

import { VisitorLog } from '@prisma/client'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Calculate start of today
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  let visitors: VisitorLog[] = []
  let totalVisitors = 0
  let visitorsToday = 0
  let currentlyInside = 0
  let checkedOut = 0

  try {
    const [
      allVisitors,
      totalCount,
      todayCount,
      insideCount,
      exitedCount
    ] = await prisma.$transaction([
      prisma.visitorLog.findMany({
        orderBy: { checkInTime: 'desc' },
      }),
      prisma.visitorLog.count(),
      prisma.visitorLog.count({
        where: { checkInTime: { gte: startOfDay } }
      }),
      prisma.visitorLog.count({
        where: { status: 'INSIDE' }
      }),
      prisma.visitorLog.count({
        where: { status: 'EXITED' }
      })
    ])

    visitors = allVisitors
    totalVisitors = totalCount
    visitorsToday = todayCount
    currentlyInside = insideCount
    checkedOut = exitedCount

  } catch (e) {
    console.error("Failed to fetch visitors:", e)
  }

  return (
    <main className="min-h-screen bg-slate-50/50 font-sans pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/60">
        <div className="max-w-lg mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Visitor Management System</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm ring-4 ring-blue-50">
            VM
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 pt-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 border-0 shadow-sm bg-white ring-1 ring-slate-100 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="w-16 h-16 bg-green-500 rounded-full blur-xl"></div>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Inside</p>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-3xl font-bold text-slate-900">{currentlyInside}</span>
              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wide">Active</span>
            </div>
          </Card>

          <Card className="p-5 border-0 shadow-sm bg-white ring-1 ring-slate-100 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="w-16 h-16 bg-blue-500 rounded-full blur-xl"></div>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Today</p>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-3xl font-bold text-slate-900">{visitorsToday}</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>
            </div>
          </Card>

          <Card className="p-5 border-0 shadow-sm bg-white ring-1 ring-slate-100 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="w-16 h-16 bg-purple-500 rounded-full blur-xl"></div>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total</p>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-3xl font-bold text-slate-900">{totalVisitors}</span>
            </div>
          </Card>

          <Card className="p-5 border-0 shadow-sm bg-white ring-1 ring-slate-100 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="w-16 h-16 bg-orange-500 rounded-full blur-xl"></div>
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Exited</p>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-3xl font-bold text-slate-900">{checkedOut}</span>
            </div>
          </Card>
        </div>

        {/* Active Visitors */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900">Active Visitors</h2>
            <Link href="/history">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium -mr-2">
                View History
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {visitors.filter(v => v.status === 'INSIDE').length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                  <User className="w-8 h-8" />
                </div>
                <p className="text-slate-900 font-medium">No active visitors</p>
                <p className="text-sm text-slate-500 mt-1">Tap the + button to check in a visitor.</p>
              </div>
            ) : (
              visitors.filter(v => v.status === 'INSIDE').map((visitor) => (
                <VisitorCard key={visitor.id} visitor={visitor} />
              ))
            )}
          </div>
        </div>
      </div>

      <Link href="/new" className="fixed bottom-8 right-8 z-30">
        <Button size="icon" className="h-16 w-16 rounded-full shadow-2xl shadow-blue-600/30 bg-blue-600 hover:bg-blue-700 text-white transition-transform hover:scale-105 active:scale-95">
          <Plus className="h-8 w-8" />
        </Button>
      </Link>
    </main>
  )
}
