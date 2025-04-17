'use client'

const { createContext, useState, useContext } = require("react");


const CourseContext = createContext();

const CourseContextProvider = ({ children }) =>{
    const [currentCourse, setCurrentCourse] = useState('');

    return(
        <CourseContext.Provider value={{currentCourse, setCurrentCourse}}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContextProvider;

export function useCourseContext(){
    return useContext(CourseContext);
}