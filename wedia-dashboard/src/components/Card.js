// src/components/Card.js
import React from "react";

function Card({ title, link, image, onDelete, onEdit }) {
  return (
    <>
      <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200">
        <figure className="p-6 pb-0">
          {image ? (
            <img
              src={`http://localhost:3456${image}`}
              alt={title}
              className="w-12 h-12 mx-auto rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto stroke-red-600"
              fill="none"
              viewBox="0 0 32 32"
              stroke="currentColor"
              strokeWidth="1"
              role="graphics-symbol"
              aria-labelledby="title-01 desc-01"
            >
              <title id="title-01">Icon title</title>
              <desc id="desc-01">A more detailed description of the icon</desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.088 25.92c-1.1 0.917-2.526 1.477-4.083 1.486h-0.002c-3.985 0-7.228-3.805-7.228-8.482-0-0.014-0-0.031-0-0.048 0-1.654 0.421-3.21 1.161-4.567l-0.025 0.050c0.055-0.102 0.087-0.222 0.087-0.35 0-0.414-0.336-0.75-0.75-0.75-0.279 0-0.522 0.152-0.651 0.378l-0.002 0.004c-0.715 1.313-1.175 2.859-1.272 4.503l-0.001 0.030h-4.241c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h4.262c0.101 1.666 0.561 3.204 1.303 4.566l-0.028-0.057-4.071 2.402c-0.222 0.133-0.369 0.373-0.369 0.646v0 2.77c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-2.342l3.766-2.221c1.485 2.065 3.859 3.409 6.55 3.469l0.009 0c1.916-0.009 3.671-0.694 5.040-1.829l-0.013 0.011c0.171-0.139 0.279-0.349 0.279-0.584 0-0.414-0.336-0.75-0.75-0.75-0.179 0-0.343 0.063-0.472 0.167l0.001-0.001zM12 7.25h8c0.414-0 0.75-0.336 0.75-0.75v0c0.011-0.121 0.017-0.261 0.017-0.403 0-2.633-2.134-4.767-4.767-4.767s-4.767 2.134-4.767 4.767c0 0.142 0.006 0.282 0.018 0.421l-0.001-0.018c0 0.414 0.336 0.75 0.75 0.75v0zM16 2.75c1.691 0.018 3.071 1.328 3.199 2.989l0.001 0.011h-6.397c0.127-1.672 1.507-2.983 3.197-3h0.002zM30.531 29.469l-6.545-6.545c0.379-0.956 0.631-2.063 0.706-3.218l0.002-0.032h4.313c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-4.342c-0.1-1.616-0.538-3.11-1.242-4.44l0.029 0.059 4.104-2.54c0.215-0.134 0.355-0.37 0.355-0.638v-4.615c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 4.197l-3.763 2.329c-1.482-2.129-3.894-3.522-6.634-3.587l-0.010-0c-1.7 0.015-3.268 0.567-4.547 1.494l0.023-0.016-8.949-8.948c-0.135-0.131-0.32-0.212-0.523-0.212-0.414 0-0.75 0.336-0.75 0.75 0 0.203 0.081 0.388 0.213 0.523l27.999 28.001c0.136 0.136 0.324 0.22 0.531 0.22 0.415 0 0.751-0.336 0.751-0.751 0-0.207-0.084-0.395-0.22-0.531v0zM16.003 10.439c3.985 0 7.228 3.806 7.228 8.484-0.014 1.002-0.179 1.96-0.472 2.86l0.019-0.068-10.225-10.224c0.972-0.65 2.164-1.041 3.447-1.052l0.003-0z"
              />
            </svg>
          )}
        </figure>
        <div className="p-6">
          <h3 className="mb-4 text-xl font-medium text-slate-700">{title}</h3>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-green-700 hover:text-green-900 font-bold"
          >
            Check
          </a>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={onEdit}
              className="mt-4 inline-block text-blue-700 hover:text-blue-900 font-bold"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="mt-4 inline-block text-red-700 hover:text-red-900 font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;