'use client'

import { Lock, Clock } from 'lucide-react'
import Image from 'next/image'
import supabase from '@/configs/supabaseConfig';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import fetchCourseById from '@/app/action/fetchCourseById';

export default function CoursePage() {

    const params = useParams()
    const id = params.id // this will be the [id] from the URL

    const [ course, setCourse ] = useState();
    const [updatedAt, setUpdatedAt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        async function getCourse() {
            try {
                setLoading(true);
                const response = await fetchCourseById(id);
                console.log(response)
                if (response.success) {
                    setCourse(response.data || []);
                    const rawDate = response.data?.updated_at;
                    const date = new Date(rawDate);
                    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
                    setUpdatedAt(formattedDate);
                    console.log("2nd user efferct")
                } else {
                    setError(response.message || 'Something went wrong while fetching courses.');
                }
            } catch (err) {
                setError('An error occurred while fetching courses.');
                console.error(err);
            } finally {
                setLoading(false);
                console.log("first user efferct");
            }
        }

        getCourse();
    }, [id]); // Empty dependency array to run once on mount

    if (loading) {
      return <div className="text-white">Loading course...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <>
          <div className="bg-gray-900">
            <div className="max-w-5xl mx-auto px-4 py-8 mt-12 lg:mt-1 bg-gray-900 text-white">
              {/* Header Card */}
              <div className="bg-gray-800 rounded-xl shadow border border-gray-700 p-6 flex flex-col lg:flex-row gap-6">
                  {/* Left Content - 50% */}
                  <div className="w-full lg:w-1/2 space-y-3">
                      <span className="text-xs text-gray-400">
                          Course / <span className="font-medium">{course?.category}</span>
                      </span>
                      <h1 className="text-2xl font-bold">
                          {course?.title}
                      </h1>
                      <p className="text-sm text-gray-500">
                          {course?.description}
                      </p>
                      <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mt-2">
                          <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course?.duration?.split?.(':')[0] ?? '0'}hr 39min
                          </div>
                          <p>Last updated on {updatedAt}</p>
                      </div>

                      {/* Price + Button */}
                      <div className="flex items-center gap-4 mt-2">
                          <p className="text-gray-500 line-through text-sm">${course?.actual_price}</p>
                          <p className="text-lg font-bold">${course?.price}</p>
                          <p className='text-[11px] bg-pink-600 text-red-200 p-1 rounded-sm'>{course?.discount}% OFF</p>
                      </div>
                      <button className="bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-amber-700 cursor-pointer mt-2 w-fit">
                          Enroll Now
                      </button>
                  </div>

                  {/* Right Video - 50% */}
                  <div className="w-full lg:w-1/2">
                      <div className="h-full lg:h-full rounded-xl overflow-hidden bg-gray-700">
                          <iframe
                              className="w-full h-full min-h-[240px] rounded-xl"
                              src="https://www.youtube.com/embed/gq2bbDmSokU?si=BmVHw41kNwcQSKI-"
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                          ></iframe>
                      </div>
                  </div>
              </div>




              {/* Course Content */}
              <div className="mt-10 space-y-4">
                  <h2 className="text-lg font-semibold">Course Content</h2>

                  {/* Chapters */}
                  {course?.chapters && course?.chapters.map((chapter, index) => (
                      <Link key={index} href={`/course/${id}/${chapter?.id}`}>
                          <div className="bg-gray-800 flex justify-between items-center text-sm border border-gray-700 hover:bg-gray-900 rounded-md shadow p-4 mb-4 space-y-1">
                              <p className="text-sm font-medium">
                                  <span className='font-bold mr-1'>Chapter {index+1} : </span>
                                  <span className='text-gray-400'>{chapter?.title || 'Default title'}</span>
                              </p>
                              <Lock className="w-4 h-4 text-yellow-500" />
                          </div>
                      </Link>
                  ))}
              </div>
            </div>
          </div>
        </>
    )
}