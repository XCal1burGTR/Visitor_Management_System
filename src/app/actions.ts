'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function checkInVisitor(prevState: any, formData: FormData) {
    console.log('checkInVisitor called')
    const visitorName = formData.get('visitorName') as string
    const contactNumber = formData.get('contactNumber') as string
    const hostName = formData.get('hostName') as string
    const purpose = formData.get('purpose') as string
    const apartmentNo = formData.get('apartmentNo') as string
    const floor = parseInt(formData.get('floor') as string)
    const photoFile = formData.get('photo') as File
    const photoBase64 = formData.get('photoBase64') as string

    let photoUrl = ''
    if (photoFile && photoFile.size > 0) {
        const buffer = Buffer.from(await photoFile.arrayBuffer())
        photoUrl = `data:${photoFile.type};base64,${buffer.toString('base64')}`
    } else if (photoBase64) {
        photoUrl = photoBase64
    }

    try {
        console.log('Creating visitor log for:', visitorName)
        await prisma.visitorLog.create({
            data: {
                visitorName,
                contactNumber,
                hostName,
                purpose,
                apartmentNo,
                floor,
                photoUrl,
                status: 'INSIDE',
            },
        })
        console.log('Visitor log created successfully')
    } catch (error) {
        console.error('Failed to create visitor log:', error)
        return { message: 'Failed to check in visitor. Please check database connection.', success: false }
    }

    revalidatePath('/')
    redirect('/')
}

export async function checkOutVisitor(id: string) {
    await prisma.visitorLog.update({
        where: { id },
        data: {
            status: 'EXITED',
            checkOutTime: new Date(),
        },
    })
    revalidatePath('/')
}
