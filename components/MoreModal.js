import { PlusCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react'
useState
export default function MoreModal(props) {
  const { title, data, error } = props
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div
        className={`border-b-2 p-2 transition delay-75  ease-in-out hover:scale-105 hover:bg-white`}
        onClick={() => setShowModal(true)}
      >
        <PlusCircleIcon className="mx-auto h-5 w-5 text-slate-400 hover:text-slate-300" />
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 mx-3 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none sm:mx-auto">
            <div className="relative my-6 mx-auto w-11/12 max-w-3xl sm:w-5/6">
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
                    {error ? (
                      <>{`${error}`}</>
                    ) : (
                      <div className=" h-48 min-w-full overflow-scroll overflow-x-hidden sm:h-96">
                        {Object.keys(data).map((field, i) => {
                          return (
                            <div
                              key={i}
                              className="mr-1 flex justify-between border-b-2 border-slate-100 p-2 text-center"
                            >
                              <div>{i + 1}</div>
                              <div className="mx-5">{field}</div>
                              <div>{data[field]}</div>
                            </div>
                          )
                        })}
                      </div>
                    )}
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
