import Image from 'next/image'
import Link from 'next/link'
import { Book, Clock, User } from 'lucide-react'

export default function Card({id,title,instructors,duration,number_of_chapters,actual_price,price,discount,image_url,profile}){
    return (
        <>
            <div className='border border-gray-800 p-4 lg:p-4 py-6 rounded-xl shadow shadow-gray-700 bg-gray-800 text-white'>
                <div className="relative w-full h-48">
                    {image_url && (
                        <Image src={image_url} alt="image" fill className="rounded-xl object-cover" />
                    )}
                </div>

                <div>
                    <h1 className='mt-2 font-bold text-lg'>{title}</h1>
                    <div className='flex gap-2 items-center mt-1 text-sm'>
                        {instructors?.avatar_url && <Image src={instructors?.avatar_url} alt='profile' width="6" height="6" className='w-6 h-6 rounded-full' />}
                        <p className='text-gray-400 text-sm'>{instructors?.full_name}</p>
                    </div>
                    <div className='flex gap-2 items-center text-[12px] mt-3 text-gray-400'>
                        <div className='flex justify-center items-center mr-2'>
                            <Clock className='w-4 h-4 mr-1' />
                            <p>{duration}</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Book className='w-4 h-4 mr-0.5' />
                            <p>{number_of_chapters} Lectures</p>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center mt-3'>
                        <p className="text-[12px] text-gray-500 line-through">${actual_price}</p>
                        <p className='text-lg font-bold'>${price}</p>
                        <p className='text-[11px] bg-red-800 text-red-200 p-1 rounded-sm'>{discount}% OFF</p>
                    </div>
                    <div className='mt-3'>
                        <Link href={`/course/${id}`}>
                            <button className='bg-gray-700 text-sm font-bold px-2 py-3 w-full rounded-md cursor-pointer hover:bg-gray-900 text-white'>View Course</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}