import "@/app/globals.css";
import Carteirinha from "./Carteirinha";
import { useState } from "react";
import McLovin from "@/assets/mcLovin.jpeg";

export default function CarteirinhaSection() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [showInputs, setShowInputs] = useState(true);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInputs(false);
  };

  const handleBack = () => {
    setShowInputs(true);
    setImage(null);
    setText(null);
  };

  return (
    <div className="carteirinha flex flex-col justify-start items-center bg-bottom-bg text-white text-center p-4 py-8 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Seja um Fã Furioso hoje mesmo!
      </h1>
      <h2 className="text-sm md:text-lg mb-4">
        Insira seus dados para ter uma carteirinha como essa:
      </h2>
      {showInputs ? (
        <div>
          <div className="my-4 flex justify-center">
            <Carteirinha picture={McLovin.src} name="Isaac" />
          </div>
          <form
            className="bg-[#06090e] p-6 rounded-lg shadow-xl"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-200 font-bold mb-2">
                Foto para Carteirinha
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 font-bold mb-2">
                Nome para Carteirinha
              </label>
              <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
        </div>
      ) : (
        <div className="my-4 flex flex-col justify-center items-center">
          <Carteirinha 
          picture={image!} 
          name={text!} />
          <button
              onClick={handleBack}
              className="w-3/4 bg-red-500 text-white py-2 rounded-lg my-4 transition duration-300 ease-in-out hover:bg-red-600"
            >
              Voltar
            </button>
        </div>
      )}
    </div>
  );
}
