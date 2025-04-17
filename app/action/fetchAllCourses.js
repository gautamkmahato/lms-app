'use server'

import supabase from "@/configs/supabaseConfig";
 

export default async function fetchAllCourses() {
    try {
        // Fetch courses from Supabase
        const { data: courses, error } = await supabase
            .from('courses')
            .select(`*, instructors (*)`);
        
        // Handle database errors
        if (error) {
            throw new Error(`Error fetching courses: ${error.message}`);
        }

        // Check if courses were returned
        if (!courses || courses.length === 0) {
            return { success: false, message: 'No courses found' };
        }

        // Return the courses data
        return { success: true, data: courses };

    } catch (error) {
        // Handle unexpected errors
        console.error('Error in fetchAllCourses function:', error);
        return { success: false, message: error.message || 'Something went wrong' };
    }
}
