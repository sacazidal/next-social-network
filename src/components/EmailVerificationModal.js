"use client";

import { useState } from "react";

const EmailVerificationModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Подтверждение email
        </h2>
        <p className="mb-4">
          Введите код, который мы отправили на вашу почту.
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Введите код"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Отмена
          </button>
          <button
            onClick={() => onSubmit(code)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmailVerificationModal;
