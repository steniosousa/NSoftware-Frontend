import { useNavigate } from "react-router-dom";
import pedido  from "../../assets/pedido-online.png"
import edit from "../../assets/editar.png"
import estoque from '../../assets/estoque-pronto.png'
import delivery from '../../assets/entrega-rapida.png'
import gerencia from '../../assets/gerenciamento-de-projetos.png'
import { useEffect, useState } from "react";
export default function Home() {
    const [role, setRole] = useState('')
    const navigate = useNavigate();

    async function handleAccess(){
      const data = localStorage.getItem("data");
      if (data) {
        const parsedData = JSON.parse(data);
        setRole('gerência')
      }
    }

    // statusCompany
    function handleExit(){
        navigate('/')
    }
    function handleAnalitics(){
        navigate('/management')
    }
    function handleOrder(){
        navigate('/order')
    }
    function handleDelivery(){
        navigate('/delivery')
    }

    useEffect(() =>{
      handleAccess()
    },[])
    return (
        <div className="min-h-screen">
          <button
              type="button"
              className="absolute right-10 top-10 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleExit}
            >
              Sair
            </button>
          <div className="  flex justify-center items-center min-h-screen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              {role == 'cozinha' || role == 'gerência'?(
              <div className="text-center ">
                <img
                    className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 hover:opacity-30 hover:cursor-pointer"
                    src={pedido}
                    alt="Statamic"
                    onClick={handleOrder}
                    />
                <p>Pedidos</p>
              </div>
              ):(
                <div className="text-center text-red-500">
                <img
                    className="col-span-2 col-start-2 max-h-12 w-full object-contain opacity-30 sm:col-start-auto lg:col-span-1 hover:opacity-30 hover:cursor-pointer"
                    src={pedido}
                    alt="Statamic"
                    />
                <p>Sem acesso</p>
                </div>
              )}

              {role == "Estoque" || role == "gerência"?(
                <div className="text-center ">
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1  hover:opacity-30 hover:cursor-pointer"
                  src={estoque}
                  alt="Estoque"
                  width={158}
                  height={48}
                />
                <p>Estoque</p>
                </div>

              ):(
                <div className="text-center text-red-500">
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 opacity-30 hover:opacity-30 hover:cursor-pointer"
                  src={estoque}
                  alt="Estoque"
                  width={158}
                  height={48}
                />
                 <p>Sem acesso</p>
                </div>
              )}
              {role == "editor" || role == "gerência"?(
                <div className="text-center">
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 hover:opacity-30 hover:cursor-pointer"
                  src={edit}
                  alt="Editar"
                  width={158}
                  height={48}
                />
                <p>Editar App</p>
                </div>

              ):(
                <div className="text-center text-red-500">
                <img
                  className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 opacity-30 hover:opacity-30 hover:cursor-pointer"
                  src={edit}
                  alt="Editar"
                  width={158}
                  height={48}
                />
                  <p>Sem acesso</p>
                </div>
              )}

              {role == "motoboy" || role == "gerência"?(
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

              ):(
                <div className="text-center text-red-500">
                  <img
                  className="col-span-2 max-h-12 w-full object-contain opacity-30 sm:col-start-2 lg:col-span-1 hover:opacity-30 hover:cursor-pointer"
                  src={delivery}
                  alt="SavvyCal"
                  width={158}
                  height={48}
                  />
                  <p>Sem acesso</p>
                </div>
              )}
                
              {role == "gerência"?(
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
              ):(
                <div className="text-center text-red-500">
                <img
                    className="col-span-4 max-h-12 w-full opacity-30 object-contain lg:col-span-1 hover:opacity-30 hover:cursor-pointer"
                    src={gerencia}
                    alt="Reform"
                    width={158}
                    height={48}
                    />
                <p>Sem acesso</p>
            </div>
              )}
              </div>
            </div>
          </div>
        </div>
    )
  }
  