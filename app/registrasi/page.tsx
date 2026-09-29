"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AuthLayout = ({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo?: string;
}) => {
  return (
    <div className="relative min-h-screen w-full overflow-visible">
      <img
        src="/assets/img/BG_Portal_New.png"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <div className="fixed inset-0 bg-black/50 z-0" />
      <div className="relative z-20 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-gray-400/20 backdrop-blur-sm rounded-xl shadow-lg p-8 my-8">
          {logo && (
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Logo" className="h-24" />
            </div>
          )}
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

const NotificationPopup = ({
  message,
  type,
  isVisible,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}) => {
  if (!isVisible) return null;
  return (
    <div
      className={`mb-4 p-3 rounded text-sm text-center relative ${
        type === "success"
          ? "bg-green-500/20 border-green-500 text-green-100"
          : "bg-red-500/20 border-red-500 text-red-100"
      } border`}
    >
      {message}
      <button onClick={onClose} className="absolute right-2 top-2 text-xl font-bold">
        &times;
      </button>
    </div>
  );
};

export default function RegistrasiPage() {
  const router = useRouter();
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tglLahir, setTglLahir] = useState<Date | null>(null);
  const [tmt, setTmt] = useState<Date | null>(null);
  const [noHp, setNoHp] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);

  // States for modals

  const [verifyTicketModal, setVerifyTicketModal] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [isLoadingTicket, setIsLoadingTicket] = useState(false);

  const dataParam = false; // Toggle behavior for verify

  const [tooltipVisible, setTooltipVisible] = useState<{ [key: string]: boolean }>({});
  const [matchingErrors, setMatchingErrors] = useState<{ [key: string]: boolean }>({});

  const toggleTooltip = (field: string) => {
    setTooltipVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const inputClass = (hasError: boolean) =>
    `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 ${
      hasError ? "border-red-500" : ""
    }`;

  const maskPhoneNumber = (phone: string) => {
    if (phone.length > 4) {
      return phone.substring(0, phone.length - 4).replace(/./g, "*") + phone.substring(phone.length - 4);
    }
    return phone;
  };

  const handlePendaftaran = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsErrorPopupVisible(false);

    if (!nip || !nama || !tempatLahir || !tglLahir || !tmt || !noHp) {
      setError("Harap isi semua kolom pendaftaran.");
      setIsErrorPopupVisible(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nip,
          name: nama,
          tempatLahir,
          tglLahir,
          tmt,
          noHp,
          username: nip, // default username
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setSuccess(resData.message || "Pendaftaran berhasil.");
        setIsSuccessPopupVisible(true);
        // OTP verification removed
      } else {
        setError(resData.error || "Pendaftaran gagal.");
        setIsErrorPopupVisible(true);
      }
    } catch (err) {
      setError("Terjadi kesalahan server.");
      setIsErrorPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  };



  const handleVerifyTicket = () => {
    setIsLoadingTicket(true);
    setTimeout(() => {
      setIsLoadingTicket(false);
      setVerifyTicketModal(false);
    }, 1500);
  };

  return (
    <AuthLayout logo="/assets/img/company_logo.png">
      <NotificationPopup
        message={success}
        type="success"
        isVisible={isSuccessPopupVisible}
        onClose={() => setIsSuccessPopupVisible(false)}
      />

      <NotificationPopup
        message={error}
        type="error"
        isVisible={isErrorPopupVisible}
        onClose={() => setIsErrorPopupVisible(false)}
      />

      <h2 className="text-xl font-bold mb-6 text-center text-white">
        {dataParam ? "Verifikasi Ulang" : "Daftarkan Akun Anda"}
      </h2>

      <form onSubmit={handlePendaftaran}>
        <div className="mb-4 group relative">
          <input
            className={inputClass(matchingErrors.nip)}
            id="nip"
            type="text"
            placeholder="NIP/NRP"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
          />
          <div className="absolute right-2 top-2">
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTooltip("nip");
                }}
                className="relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className={`size-5 ${matchingErrors.nip ? "stroke-red-500" : "stroke-gray-500"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
              {tooltipVisible.nip && (
                <div className="absolute left-full ml-4 top-0 bg-gray-300 text-black text-sm rounded-md px-4 py-2 shadow-lg w-64 whitespace-normal z-50">
                  <div className="absolute -left-1 top-1/5 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-b-8 border-b-transparent"></div>
                  </div>
                  Masukkan Nomor Induk Pegawai (NIP) Anda sesuai dengan yang tercantum pada kartu pegawai. Pastikan tidak ada kesalahan pengetikan.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 group relative">
          <input
            className={inputClass(matchingErrors.nama_lengkap)}
            id="nama"
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <div className="absolute right-2 top-2">
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTooltip("nama");
                }}
                className="relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className={`size-5 ${matchingErrors.nama_lengkap ? "stroke-red-500" : "stroke-gray-500"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
              {tooltipVisible.nama && (
                <div className="absolute left-full ml-4 top-0 bg-gray-300 text-black text-sm rounded-md px-4 py-2 shadow-lg w-64 whitespace-normal z-50 hidden group-hover:block">
                  <div className="absolute -left-1 top-1/5 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-b-8 border-b-transparent"></div>
                  </div>
                  Masukkan nama lengkap Anda sesuai dengan dokumen resmi (KTP atau paspor).
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 group relative">
          <input
            className={inputClass(matchingErrors.tempat_lahir)}
            id="tempatLahir"
            type="text"
            placeholder="Tempat Lahir"
            value={tempatLahir}
            onChange={(e) => setTempatLahir(e.target.value)}
          />
          <div className="absolute right-2 top-2">
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTooltip("tempatLahir");
                }}
                className="relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className={`size-5 ${matchingErrors.tempat_lahir ? "stroke-red-500" : "stroke-gray-500"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
              {tooltipVisible.tempatLahir && (
                <div className="absolute left-full ml-4 top-0 bg-gray-300 text-black text-sm rounded-md px-4 py-2 shadow-lg w-64 whitespace-normal z-50 hidden group-hover:block">
                  <div className="absolute -left-1 top-1/5 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-b-8 border-b-transparent"></div>
                  </div>
                  Tuliskan nama kota atau kabupaten tempat Anda dilahirkan sesuai dengan dokumen resmi (KTP / paspor).
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 group relative">
          <DatePicker
            className={inputClass(matchingErrors.tanggal_lahir)}
            selected={tglLahir ? tglLahir : null}
            onChange={(date) => setTglLahir(date)}
            onSelect={(date) => setTglLahir(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Tanggal Lahir (DD-MM-YYYY)"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            wrapperClassName="w-full"
          />
          <div className="absolute right-2 top-2">
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTooltip("tanggalLahir");
                }}
                className="relative z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className={`size-5 ${matchingErrors.tanggal_lahir ? "stroke-red-500" : "stroke-gray-500"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
              {tooltipVisible.tanggalLahir && (
                <div className="absolute left-full ml-4 top-0 bg-gray-300 text-black text-sm rounded-md px-4 py-2 shadow-lg w-64 whitespace-normal z-50 hidden group-hover:block">
                  <div className="absolute -left-1 top-1/5 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-b-8 border-b-transparent"></div>
                  </div>
                  Masukkan tanggal lahir Anda dalam format yang sesuai (misalnya: DD-MM-YYYY) sesuai dengan dokumen resmi (KIP / paspor).
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 group relative">
          <DatePicker
            className={inputClass(matchingErrors.tmt_jabatan)}
            selected={tmt ? tmt : null}
            onChange={(date) => setTmt(date)}
            onSelect={(date) => setTmt(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="TMT Jabatan (DD-MM-YYYY)"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            wrapperClassName="w-full"
          />
          <div className="absolute right-2 top-2">
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTooltip("tmt");
                }}
                className="relative z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className={`size-5 ${matchingErrors.tmt_jabatan ? "stroke-red-500" : "stroke-gray-500"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
              {tooltipVisible.tmt && (
                <div className="absolute left-full ml-4 top-0 bg-gray-300 text-black text-sm rounded-md px-4 py-2 shadow-lg w-64 whitespace-normal z-50 hidden group-hover:block">
                  <div className="absolute -left-1 top-1/5 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-b-8 border-b-transparent"></div>
                  </div>
                  Isi dengan Terhitung Mulai Tanggal (TMT) berdasarkan tanggal jabatan terakhir Anda sebagai anggota Badan Intelijen Negara.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 group relative">
          <input
            className={inputClass(false)}
            id="noHp"
            type="text"
            placeholder="No. WhatsApp (aktif)"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
          />
          <div className="absolute right-2 top-2">
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTooltip("phone");
                }}
                className="relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              </button>
              {tooltipVisible.phone && (
                <div className="absolute left-full ml-4 top-0 bg-gray-300 text-black text-sm rounded-md px-4 py-2 shadow-lg w-64 whitespace-normal z-50 hidden group-hover:block">
                  <div className="absolute -left-1 top-1/5 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-gray-300 border-b-8 border-b-transparent"></div>
                  </div>
                  Masukkan nomor whatsapp yang aktif dan dapat dihubungi.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <button
            className={`w-full bg-[rgb(52,108,155)] hover:bg-[rgb(42,98,145)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : dataParam ? "Verifikasi Ulang" : "Daftar"}
          </button>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-300">Sudah punya akun? </span>
            <a href="/login" className="text-sm text-[rgb(52,108,155)] hover:underline font-semibold">Masuk di sini</a>
          </div>
        </div>
      </form>

      {verifyTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#1B1B1B] w-[390px] h-[300px] rounded-xl p-6 shadow-xl flex flex-col justify-center items-center border-gray-600 border-2">
            <div className="flex justify-center mb-6">
              <svg width="86" height="86" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V10C5.10457 10 6 10.8954 6 12C6 13.1046 5.10457 14 4 14V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V14C18.8954 14 18 13.1046 18 12C18 10.8954 18.8954 10 20 10Z" stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 9H15" stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 15H13" stroke="#4682B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col items-center space-y-4 w-full">
              <input
                className="w-full py-2 px-3 text-white border border-gray-500 rounded-md bg-black focus:outline-none focus:ring focus:ring-blue-500"
                id="ticketNumber"
                type="text"
                placeholder="Nomor Tiket"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
              />
              <button
                onClick={handleVerifyTicket}
                className={`w-full bg-[rgb(52,108,155)] text-white py-2 rounded-md hover:bg-[rgb(42,98,145)] transition-colors duration-200 ${
                  isLoadingTicket ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoadingTicket}
              >
                {isLoadingTicket ? "Memverifikasi..." : "Verifikasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
