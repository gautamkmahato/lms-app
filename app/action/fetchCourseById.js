'use server'

import supabase from "@/configs/supabaseConfig";


export default async function fetchCourseById(id) {
    try {
        // Fetch courses from Supabase, including instructor data
        const { data, error } = await supabase
            .from('courses')
            .select(`
                *,
                chapters (
                    *,
                    videos (*)
                ),
                instructors (*)
            `)
            .eq('id', id)
            .single()

        // Handle database errors
        if (error) {
            throw new Error(`Error fetching course: ${error.message}`);
        }

        // Check if course was returned
        if (!data) {
            return { success: false, message: 'No course found' };
        }

        // Return the course data
        return { success: true, data: data };

    } catch (error) {
        // Handle unexpected errors
        console.error('Error in fetchCourseById function:', error);
        return { success: false, message: error.message || 'Something went wrong' };
    }
}