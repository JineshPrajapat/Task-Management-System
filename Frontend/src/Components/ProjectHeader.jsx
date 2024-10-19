import React from 'react'
import { images } from '../constants'
import { useParams } from 'react-router-dom'

export const ProjectHeader = ({projectTitle}) => {
    
    return (
        <div className='flex flex-row justify-between items-center'>
            <div className='flex gap-2 items-baseline'>
                <span className='whitespace-nowrap text-5xl font-semibold'>{projectTitle ?? "Brainstorming"}</span>
                    <img src={images.edit} className='w-full h-full' />
                <img src={images.link} className='w-full h-full' />
            </div>
            <div className='flex gap-2 items-center'>
                <img src={images.addSquare} className='w-full h-full' />
                <span className='text-[#5030E5] font-medium text-base'>Invite</span>
                <img src={images.users} className='w-full h-full' />
            </div>

        </div>
    )
}
