'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlayCircle, FileText, BookOpen, FileDown } from 'lucide-react';
import supabase from '@/configs/supabaseConfig';
import fetchCourseById from '@/app/action/fetchCourseById';
import Image from 'next/image';
import Link from 'next/link';

const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'materials', label: 'Materials' },
    { id: 'notes', label: 'Notes' },
]

export default function LectureSection() {

    const params = useParams();
    console.log(params)
    const courseId = params.id // this will be the [id] from the URL
    const chapterId = params.chapterId // this will be the [chapterId] from the URL

    const [chapter, setChapter] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    const [activeTab, setActiveTab] = useState('overview')


    useEffect(()=>{
        async function getChapterById() {
            let { data, error } = await supabase
                .from('chapters')
                .select(`
                    *,
                    videos (*)
                `)
                .eq('id', chapterId)
                .single()

            if (error) {
                console.error('Error fetching course:', error);
                return null;
            }

            //const chapter = data?.[0] || null;
            setChapter(data)
            console.log(data);
            const rawDate = data?.updated_at;
            const date = new Date(rawDate);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
            setUpdatedAt(formattedDate);
        }
        getChapterById();
    }, [chapterId]);

    useEffect(()=>{
        async function getCourse() {
            try {
                setLoading(true);
                const response = await fetchCourseById(courseId);
                console.log(response)
                if (response.success) {
                    setChapters(response?.data?.chapters || []);
                    setCourse(response?.data);
                    console.log(response?.data)
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
    }, [courseId]);


    if (loading) {
        return <div className="text-white">Loading chapters...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }


    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 py-24 lg:py-9 bg-gray-900 text-white">
            {/* Main Content */}
            <div className="flex-1 bg-gray-800 rounded-2xl shadow shadow-gray-700 px-1 py-4 lg:p-4">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-400 mb-2 w-full max-w-3xl mx-auto mt-2 lg:mt-4 px-2">
                    My Courses / Web Design Basic / <span className="font-medium">Lecture {chapter?.order_index}</span>
                </div>

                {/* Title and Date */}
                <div className="flex justify-between items-center mb-2 w-full max-w-3xl mx-auto px-4">
                    <h1 className="text-xl font-semibold">{chapter?.title}</h1>
                    {/* <span className="text-sm text-gray-400">Happened: 02.07.2024 18:00</span> */}
                </div>

                {/* Video Preview */}
                <div className="relative w-full max-w-3xl mt-8 mx-auto px-4 bg-gray-800 rounded-lg overflow-hidden">
                    <video
                        controls
                        className="w-full h-auto rounded-lg shadow"
                        poster={chapter?.videos[0]?.preview_image} // optional
                    >
                        <source src={chapter?.videos[0]?.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="w-full max-w-3xl mx-auto mt-8 lg:mt-12 px-4">
                    {/* Tab Buttons */}
                    <div className="flex space-x-4 border-b border-gray-700">
                        {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-4 text-sm cursor-pointer font-medium border-b-2 transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'border-amber-500 text-amber-500'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-6 text-gray-300">
                        {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Course Overview</h2>
                            <p className="text-sm">
                                {chapter?.description}
                            </p>
                        </div>
                        )}
                        {activeTab === 'materials' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Course Chapters</h2>
                            <p className="text-sm">
                            This section includes all course chapters and lessons.
                            </p>
                        </div>
                        )}
                        {activeTab === 'notes' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Course Reviews</h2>
                            <p className="text-sm">
                            Here’s what students are saying about this course.
                            </p>
                        </div>
                        )}
                    </div>
                </div>


            </div>

            {/* Sidebar */}
            <div className="w-full md:w-80 flex-shrink-0 space-y-4">
                {/* Teacher Info */}
                <div className="bg-gray-800 p-4 rounded-2xl shadow shadow-gray-700 flex items-center gap-4">
                    {course?.instructors?.avatar_url && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                                src={course?.instructors?.avatar_url}
                                alt="User Avatar"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium">{course?.instructors?.full_name}</p>
                        <p className="text-sm font-medium">{course?.instructors?.email}</p>
                    </div>
                </div>

                {/* List of Lectures */}
                <div className="bg-gray-800 p-4 rounded-2xl shadow shadow-gray-700 text-sm">
                    <p className="font-medium mb-3 text-gray-300">List Of Lectures</p>
                    <ul className="space-y-2">
                        { chapters && chapters.map((lesson, index) => (
                        <Link href={`/course/${courseId}/${lesson?.id}`} key={index}>
                            <li className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-700 ${lesson?.id === chapter?.id ? 'bg-amber-700 text-amber-50' : ''}`}>
                                <BookOpen className="w-4 h-4 text-gray-400" />
                                <span>Chapter {lesson?.order_index}: {lesson?.title}</span>
                            </li>
                        </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}