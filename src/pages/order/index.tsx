import Header from "../../components/Header"
import { Fragment, useEffect, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import Api from "../../services/api"



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type datasOrder = {
  name: string,
  image: string,
  Sizes:[]

}
type ProdutcsType = {
  sizeId:number,
  amount: number,
  status: string,
  id: number,
  href: string,
  size: string,
  obs: string
  priority: boolean,
  date:Date,
  Products:datasOrder
}
type StatusCompany = {
  statusCompany: string;
  roleUser: string;
  codeEmployee: number;
  companyId: null | number;
};

type DatasResponseLoginProps = {
  accessToken: string;
  statusCompany: StatusCompany;
};

type sizes = {
  id:number;
  size:string;
}
export default function Order() {
  const [datas, setDatas] = useState<DatasResponseLoginProps>()
  const [open, setOpen] = useState(false)
  const [startFilter, setStartFilter] = useState(false)
  const [orders, setOrders] = useState<ProdutcsType[]>([])
  const [productSelected, setProductSelected] = useState<ProdutcsType>()
const [sizes, setSizes] = useState<sizes[]>([])

  

  async function getProducts() {
    const data = localStorage.getItem("data");
    if (!data) return
    const parsedData = JSON.parse(data);

    setDatas(parsedData)
    const objSend = { "companyId": parsedData.statusCompany.Company.id, "page": 1 }
    try {
      const { data } = await Api.get('order/', {
        params: objSend
      })
      setOrders(data)
      setStartFilter(!startFilter)
    } catch (error) { console.log(error) }
  }

  function filterOrders() {
    const ordersFilted = orders.filter((order) => order.status != "Concluído")
    setOrders(ordersFilted)
  }

  useEffect(() => {
    filterOrders()
  }, [startFilter])

  function showProduct(product: ProdutcsType) {
    
    setProductSelected(product)
    setOpen(true)
  }
  
  function teste (){
    for(let order = 0; order < orders.length;order++){
      setSizes( orders[order].Products.Sizes)
    }
  }


  async function takeOrder() {

    if (productSelected == undefined) return
    if (!datas) return
    const objPrepar = {
      "companyId": datas.statusCompany.companyId,
      "id": productSelected.id,
      "status": "Preparando"
    }
    await Api.patch('order/', objPrepar);
    getProducts();
    setOpen(false)
  }

  async function completeOrder() {
    if (productSelected == undefined) return
    if (!datas) return
    const objSender = {
      "companyId": datas.statusCompany.companyId,
      "id": productSelected.id,
      "status": "Concluído"
    }
    await Api.patch('order/', objSender);
    getProducts();
    setOpen(false)
  }

  useEffect(() =>{teste()},[productSelected])

  useEffect(() => {
    getProducts()
  }, [])



  return (
    <>
      <Header />
      {orders.length == 0 ? (
        <div className="flex items-top my-20 justify-center h-screen">
          <svg className="animate-spin h-8 w-12 text-blue-800" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z" />
          </svg>
        </div>
      ) : (<></>)}
      <div className="bg-white-10 cursor-pointer">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6  gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">

            {orders.map((product: ProdutcsType) => (

              <div key={product.id} className="group" onClick={() => showProduct(product)} >
                <div className="aspect-h-1 aspect-w-1  overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.Products.image}
                    alt="Imagem do produto"
                    className="max-h-60 h-60 w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className=" mt-4 flex flex-row justify-around">
                  <h3 className=" text-sm text-gray-700 w-40">{product.Products.name.toUpperCase()}</h3>
                  <p className=" text-sm font-medium text-gray-900 text-fuchsia-500">cod: {product.id}</p>
                </div>
                {product.status == 'Preparando' ? (
                  <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500 bg-green-700 text-white text-center rounded-md">{product.status}</p>
                ) : product.status == 'Novo' ? (
                  <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500 bg-red-700 text-white text-center rounded-md">{product.status}</p>
                ) : (
                  <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500 bg-orange-700 text-white text-center rounded-md ">{product.status}</p>

                )}
                {product.priority ? (
                  <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500 bg-green-700 text-white text-center rounded-md">Prioridade</p>
                ) : (<></>)}
              </div>
            ))}
          </div>
        </div>
      </div>
      {productSelected != undefined ? (

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-5" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                      <button
                        type="button"
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                          <img src={productSelected.Products.image} alt="Imagem do produto" className="object-cover object-center" />
                        </div>
                        <div className="sm:col-span-8 lg:col-span-7">
                          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{productSelected.Products.name.toUpperCase()}</h2>
                          <div className="mt-4 flex flex-row justify-around">
                            <h3 className=" text-sm text-gray-700">{productSelected.status}</h3>
                            <h3 className=" text-sm text-gray-700">cod: {productSelected.id}</h3>
                          </div>
                          <section aria-labelledby="information-heading" className="mt-2">
                            {/* Reviews */}
                            <div className="mt-6">
                              <h4 className="sr-only">Reviews</h4>
                              <div className="flex items-center">
                                <div className="flex items-center">
                                  {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                      key={rating}
                                      aria-hidden="true"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </section>

                          <section aria-labelledby="options-heading" className="mt-10">
                            {productSelected.priority ? (
                              <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500 bg-green-700 text-white text-center rounded-md">Prioridade</p>
                            ) : (<></>)}

                            <div>
                              <h4 className="text-sm py-2 font-medium text-gray-900">Observação:</h4>
                              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                {productSelected.obs}
                              </p>
                            </div>

                            {/* Sizes */}
                            <div className="mt-10">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-900">Tamanho</h4>

                              </div>

                              <RadioGroup className="mt-4 bac">
                                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-4">
                                  {sizes.map((size) => (
                                    <RadioGroup.Option
                                      key={Math.random()}
                                      value={size}
                                      className={ classNames(
                                        size.id == productSelected.sizeId?'bg-green-700 text-white': '',
                                        'group relative flex items-center justify-center rounded-md  border py-3 px-4 text-sm font-medium uppercase  '
                                  )}
                                    >
                                      <span >
                                        <RadioGroup.Label as="span" >{size.size}</RadioGroup.Label>
                                      </span>

                                  
                                    </RadioGroup.Option>
                                  ))}
                                    
                                </div>
                              </RadioGroup>
                            </div>

                            {productSelected.status == 'Preparando' ? (
                              <button
                                onClick={completeOrder}
                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Concluir
                              </button>
                            ) : (
                              <button
                                onClick={takeOrder}
                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Assumir
                              </button>
                            )}


                          </section>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : (<></>)}
    </>
  )
}
