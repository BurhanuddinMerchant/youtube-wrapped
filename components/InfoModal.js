import { InformationCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
useState
export default function InfoModal(props) {
  const { title, description } = props
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <InformationCircleIcon
        className="h-5 w-5 text-blue-200 hover:text-blue-300"
        onClick={() => setShowModal(true)}
      />
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-md border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-2 ">
                  <h3 className="my-auto text-lg font-semibold">{title}</h3>

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
                    {description}
                  </p>
                </div>
                {/*footer*/}
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-1">
                  <button
                    className="background-transparent mr-1 mb-1 rounded-full border-2 border-red-600 px-3 py-1 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear hover:bg-red-600 hover:text-white focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
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
