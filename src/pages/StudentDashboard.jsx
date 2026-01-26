import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosInstance from "../services/api"
import { toast } from "react-toastify"

const StudentDashboard = () => {
  const [doubts, setDoubts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await axiosInstance.get("/doubts")
        setDoubts(res.data)
      } catch {
        toast.error("Failed to fetch doubts")
      } finally {
        setLoading(false)
      }
    }
    fetchDoubts()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ticket?")) return
    try {
      await axiosInstance.delete(`/doubts/${id}`)
      setDoubts((prev) => prev.filter((d) => d._id !== id))
      toast.success("Ticket deleted")
    } catch {
      toast.error("Delete failed")
    }
  }

  const getStatusColor = (status) => {
    if (status === "resolved") return "bg-green-600"
    if (status === "in-progress") return "bg-yellow-600"
    return "bg-red-600"
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 pt-28  ">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl font-medium text-green-400">
           My all tickets
        </h2>
        <Link
          to="/doubts/create"
          className="mt-4 md:mt-0 bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition"
        >
          Raise new  ticket
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : doubts.length === 0 ? (
        <p className="text-gray-500 text-center">no tickets found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {doubts.map((doubt) => (
            <div
              key={doubt._id}
              className="bg-[#161b22] border border-gray-700 rounded-lg p-5 hover:border-green-500 transition"
            >
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                {doubt.title}
              </h3>

              <p className="text-sm text-gray-400 mb-3">
                {doubt.description?.slice(0, 40)}...
              </p>

              {doubt.image && (
                <img
                  src={doubt.image}
                  alt=""
                  className="rounded-md mb-3 h-36 w-full object-cover border border-gray-700"
                />
              )}

              <p className="text-xs text-gray-500 mb-3">
                created_at: {new Date(doubt.createdAt).toLocaleDateString()}
              </p>

              <span
                className={`inline-block text-xs px-3 py-1 rounded ${getStatusColor(
                  doubt.status
                )}`}
              >
                {doubt.status}
              </span>

              <div className="mt-4 flex gap-4 text-sm">
                <Link
                  to={`/doubts/student/${doubt._id}`}
                  className="text-blue-400 hover:underline"
                >
                  view
                </Link>

                {doubt.status !== "resolved" && (
                  <>
                    <Link
                      to={`/doubts/edit/${doubt._id}`}
                      className="text-yellow-400 hover:underline"
                    >
                      edit
                    </Link>
                    <button
                      onClick={() => handleDelete(doubt._id)}
                      className="text-red-400 hover:underline"
                    >
                      delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StudentDashboard
