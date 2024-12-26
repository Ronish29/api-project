import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LazyTable = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-r">ID</th>
                            <th className="py-2 px-4 border-b border-r">Title</th>
                            <th className="py-2 px-4 border-b border-r">Price</th>
                            <th className="py-2 px-4 border-b border-r">Category</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b border-r border-gray-200"><Skeleton /></td>
                            <td className="py-2 px-4 border-b border-r border-gray-200"><Skeleton /></td>
                            <td className="py-2 px-4 border-b border-r border-gray-200"><Skeleton /></td>
                            <td className="py-2 px-4 border-b border-r border-gray-200"><Skeleton /></td>
                            <td className="py-2 px-4 border-b border-r border-gray-200"><Skeleton /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LazyTable