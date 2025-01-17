"use client";

import { useEffect, useRef, useState } from "react";

const EmailVerificationModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside,
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="bg-neutral-900 p-6 rounded-lg shadow-lg"
        ref={modalRef}
      >
        <h2 className="text-xl font-bold mb-4">
          Подтверждение email
        </h2>
        <p className="mb-4">
          Мы отправили ссылку для подтверждения на вашу
          почту. Пожалуйста, проверьте ваш email и перейдите
          по ссылке, чтобы завершить регистрацию.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmailVerificationModal;
