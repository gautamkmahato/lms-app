'use client';

import { Badge, ArrowRight, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import reactImage from '../../public/react.jpg';
import english from '../../public/english3.jpg';
import science from '../../public/science.jpg';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            hi
          </div>
          <h1 className="text-2xl font-semibold text-purple-400">Study</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          <div className="group relative cursor-pointer">
            <Link href="/">Home</Link>
          </div>
          <div className="group relative cursor-pointer">
            <Link href="/">Courses</Link>
          </div>
          <div className="group relative cursor-pointer">
            <Link href="/">Dashboard</Link>
          </div>
          <div className="group relative cursor-pointer">
            <Link href="/">Pages</Link>
          </div>
          <div className="group relative cursor-pointer">
            <Link href="/">Elements</Link>
          </div>
          <div className="group relative cursor-pointer">
            <Link href="/">Blog</Link>
          </div>
        </nav>

        <Link href="/course">
            <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md font-medium text-sm hover:scale-105 transition cursor-pointer">
                Join Now
            </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-12 px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gray-700 shadow-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Trophy className="w-4 h-4 text-yellow-400" />
          The Leader in Online Learning
        </div>

        {/* Hero Text */}
        <h2 className="text-4xl md:text-6xl font-bold text-gray-100 leading-tight">
          We teaching, educate and <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            build the future
          </span>{' '}
          of online learning
        </h2>

        {/* buttons section */}
        <div className='flex gap-4 justify-center item-center mt-8'>
            <Link href="/course">
                <button className="px-5 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md font-medium text-sm hover:scale-105 transition cursor-pointer">
                    Explore Course
                </button>
            </Link>
            <Link href="/course">
                <button className="px-5 py-3 border-2 border-pink-500 text-white rounded-md font-medium text-sm hover:scale-105 transition cursor-pointer">
                    Get Started
                </button>
            </Link>
        </div>

      </section>

      {/* Cards Section */}
<section className="mt-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Card 1 */}
  <div className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-700 transition flex flex-col">
    <Image
      src={reactImage}
      alt="React Course"
      width={500}
      height={300}
      className="w-full h-48 object-cover"
    />
    <div className="p-6 flex flex-col items-center text-center">
      <h3 className="text-xl font-semibold mb-2">React</h3>
      <p className="text-gray-400 text-sm mb-4">
        React Js dolor sit, amet consectetur.
      </p>
      <a href="#" className="flex items-center gap-2 text-purple-400 font-medium hover:underline">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>

  {/* Card 2 */}
  <div className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-700 transition flex flex-col">
    <Image
      src={english}
      alt="English Course"
      width={500}
      height={300}
      className="w-full h-48 object-cover"
    />
    <div className="p-6 flex flex-col items-center text-center">
      <h3 className="text-xl font-semibold mb-2">English</h3>
      <p className="text-gray-400 text-sm mb-4">
        Spken english dolor sit, amet consectetur.
      </p>
      <a href="#" className="flex items-center gap-2 text-purple-400 font-medium hover:underline">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>

  {/* Card 3 */}
  <div className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-700 transition flex flex-col">
    <Image
      src={science}
      alt="Education Course"
      width={500}
      height={300}
      className="w-full h-48 object-cover"
    />
    <div className="p-6 flex flex-col items-center text-center">
      <h3 className="text-xl font-semibold mb-2">Education</h3>
      <p className="text-gray-400 text-sm mb-4">
        Eearning edu dolor sit, amet consectetur.
      </p>
      <a href="#" className="flex items-center gap-2 text-purple-400 font-medium hover:underline">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>
</section>

    </div>
  );
}
