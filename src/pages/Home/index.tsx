import { useNavigate } from "react-router-dom";
import pedido  from "../../assets/pedido-online.png"
import delivery from '../../assets/entrega-rapida.png'
import gerencia from '../../assets/gerenciamento-de-projetos.png'
import { CheckIcon } from "@heroicons/react/24/outline";
export default function Home() {
    const navigate = useNavigate();
    function handleExit(){
        navigate('/')
    }
    function handleAnalitics(){
        navigate('/analitics')
    }
    function handleOrder(){
        navigate('/order')
    }
    function handleDelivery(){
        navigate('/delivery')
    }
    return (
        <div className="min-h-screen">
        <button
            type="button"
            className="absolute right-10 top-10 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleExit}
          >
            <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Sair
          </button>
      <div className="  flex justify-center items-center min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="text-center ">
            <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 hover:opacity-30 hover:cursor-pointer"
                src={pedido}
                alt="Statamic"
                onClick={handleOrder}
                
                />
            <p>Pedidos</p>
          </div>
            
            <div className="text-center text-red-500">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 opacity-30 hover:opacity-30 hover:cursor-pointer"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <p>Sem acesso</p>
            </div>
            <div className="text-center text-red-500">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 opacity-30 hover:opacity-30 hover:cursor-pointer"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width={158}
              height={48}
            />
             <p >Sem acesso</p>
            </div>
            <div className="text-center ">
                <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 hover:opacity-30 hover:cursor-pointer"
                src={delivery}
                alt="SavvyCal"
                width={158}
                height={48}
                onClick={handleDelivery}
                />
                <p >Delivery</p>
            </div>
            <div className="text-center ">
                <img
                    className="col-span-4 max-h-12 w-full object-contain lg:col-span-1 hover:opacity-30 hover:cursor-pointer"
                    src={gerencia}
                    alt="Reform"
                    width={158}
                    height={48}
                    onClick={handleAnalitics}
                    />
                <p>Gerência</p>
            </div>
        
          </div>
        </div>
      </div>
      </div>
    )
  }
  