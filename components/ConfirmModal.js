import { InformationCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
export default function ConfirmModal(props) {
  const { handleDelete, loading } = props
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div className="mx-auto mt-2 w-full rounded-xl p-2 text-center shadow-sm md:w-2/3">
        <button
          className="mx-auto w-fit rounded-md border-2  border-white bg-red-700 px-2 py-1 text-white hover:border-red-700 hover:bg-white hover:text-red-700 hover:shadow-lg"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 mx-5 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none sm:mx-auto">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-md border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-2 hover:cursor-pointer">
                  <h3 className="my-auto text-lg font-semibold">Delete</h3>

                  <span
                    className=" my-auto block h-6 w-6 text-xl text-black outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </span>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className=" text-md my-4 leading-relaxed text-gray-600">
                    Are you sure you want to permanently delete your profile?
                  </p>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-1">
                  <button
                    className="background-transparent mr-1 mb-1 rounded-full border-2 border-red-600 px-3 py-1 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear hover:bg-red-600 hover:text-white focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                  {loading ? (
                    <button
                      disabled
                      className="background-transparent mr-1 mb-1 animate-bounce rounded-full border-2 border-green-600 bg-green-600 px-3 py-1 text-sm  font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
                    >
                      Yes
                    </button>
                  ) : (
                    <button
                      className="background-transparent mr-1 mb-1 rounded-full border-2 border-green-600 px-3 py-1 text-sm font-bold uppercase text-green-500 outline-none transition-all duration-150 ease-linear hover:bg-green-600 hover:text-white focus:outline-none"
                      type="button"
                      onClick={handleDelete}
                    >
                      Yes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  )
}
