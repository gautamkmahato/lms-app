'use client'

import Card from "./Card";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import fetchAllCourses from "@/app/action/fetchAllCourses";


export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getCourses() {
            try {
                setLoading(true);
                const response = await fetchAllCourses();
                console.log(response)
                if (response.success) {
                    setCourses(response.data || []);
                } else {
                    setError(response.message || 'Something went wrong while fetching courses.');
                }
            } catch (err) {
                setError('An error occurred while fetching courses.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getCourses();
    }, []); // Empty dependency array to run once on mount

    if (loading) {
        return <div className="text-white">Loading courses...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen lg:p-6">
            <div className="flex justify-between items-center w-full mb-6 lg:mt-2 md:mt-2 mt-16">
                <h1 className="text-2xl font-semibold">All Courses</h1>
                <div className="flex gap-3">
                    <button className="flex gap-1 justify-center items-center text-sm cursor-pointer text-gray-300 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg">
                        <Filter className="w-3 h-3" />
                        <span>Filter</span>
                    </button>
                    <button className="flex gap-1 justify-center items-center text-sm cursor-pointer text-gray-300 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg">
                        <Filter className="w-3 h-3" />
                        <span>Sort</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length === 0 ? (
                    <div>No courses available at the moment.</div>
                ) : (
                    courses.map((course) => (
                        <div key={course.id} className="h-full">
                            <Card {...course} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}