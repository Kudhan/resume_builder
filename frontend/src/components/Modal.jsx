import React from 'react';
import { GiTireIronCross } from "react-icons/gi";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/60">
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            {showActionBtn && (
              <button
                className="btn-small-light mr-4"
                onClick={onActionClick}
              >
                {actionBtnIcon} {actionBtnText}
              </button>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5"
          onClick={onClose}
        >
          <GiTireIronCross />
        </button>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
