import Header from "../../components/Header";
import { Fragment, useEffect, useState } from "react";
import Map from "../../components/Map";
import { MapIcon, StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Api from "../../services/api";
import { AxiosResponse } from "axios";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";

type datasOrder = {
  name: string,
  image: string,
  Sizes: []

}
type adressProps = {
  AccountInd: number,
  district: string,
  houseNumber: number,
  id: number,
  lat: string,
  lng: string,
  obs: string,
  orderId: number,
  street: string

}
type accountPros = {
  contact: string
  name: string
  address: adressProps
}
type ProdutcsType = {
  sizeId: number,
  amount: number,
  status: string,
  id: number,
  href: string,
  size: string,
  obs: string
  priority: boolean,
  date: Date,
  Products: datasOrder
  account: accountPros
}

type coordsProps = {
  lat: number,
  lng: number
}


export function Delivery() {
  const [datas, setDatas] = useState()
  const [open, setOpen] = useState(false)
  const [products, setOrders] = useState<ProdutcsType[]>([]);
  const [productSelected, setProductSelected] = useState<ProdutcsType[]>([]);
  const [coords, setCoords] = useState<coordsProps>({ lat: 0, lng: 0 })
  const [coordsOrders, setCoordsOrders] = useState<coordsProps[]>([])
  const [productSelectedSeeInfos, setProductSelectedSeeInfos] = useState<ProdutcsType>()
  const [map, setMap] = useState(Boolean)

  async function getProducts() {
    const data = localStorage.getItem("data");
    if (!data) return
    const parsedData = JSON.parse(data);
    setDatas(parsedData)

    const objSendOrder = { "companyId": parsedData.statusCompany.companyId, "page": 1 }
    const objSenderCompany = { "id": parsedData.statusCompany.companyId }
    try {
      const [responseOrders, responseLocationStore]: AxiosResponse[] = await Promise.all([
        Api.get('order/', {
          params: objSendOrder
        }),
        Api.get('company', {
          params: objSenderCompany
        })
      ])
      const responseOrdersData = responseOrders.data
      const coordsStore = { lat: parseFloat(responseLocationStore.data.lat), lng: parseFloat(responseLocationStore.data.lng) }
      const completedOrders = responseOrdersData.filter((order: ProdutcsType) => order.status === "Concluído");
      setOrders(completedOrders)
      setCoords(coordsStore)

      completedOrders.forEach((cords: { lat: string, lng: string }) => {
        const latInt = parseFloat(cords.lat)
        const lngInt = parseFloat(cords.lng)
        const objCoords: any = { location: { lat: latInt, lng: lngInt } }
        setCoordsOrders([...coordsOrders, objCoords])
      });
    } catch (error) { console.log(error) }
  }




  function handleSelected(product: ProdutcsType) {
    setProductSelected([...productSelected, product])
    const filter = productSelected.find((element) => element.id == product.id)
    const newSelected: ProdutcsType[] = []
    if (filter) {
      productSelected.forEach((product) => {
        if (product.id == filter.id) return
        newSelected.push(product)
      })
      setProductSelected(newSelected)
      return
    }

  }
  function handleShowMap() {
    setMap(!map)
  }



  function handleInfos(select: ProdutcsType) {

    setOpen(true)
    setProductSelectedSeeInfos(select)
    console.log(productSelectedSeeInfos)
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      {!products.length ? (
        <div className="flex items-top my-20 justify-center h-screen">
          <svg className="animate-spin h-8 w-12 text-blue-800" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z" />
          </svg>
        </div>
      ) : (
        <></>)}

      <h2 className="text-center m-4">Selecione suas entregas</h2>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

          {products.map((product: ProdutcsType) => (
            <div key={product.id} className="group cursor-pointer" >
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  onClick={() => handleInfos(product)}
                  src={product.Products.image}
                  alt="Imagem produto"
                  className="max-h-60 h-60 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="flex flex-col justify-around">
                <h3 className="mt-4 text-sm text-gray-700">{product.Products.name.toUpperCase()}</h3>
                <h3 className="mt-4 text-sm text-gray-700">cod: {product.id}</h3>
                <button
                  className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500 bg-yellow-700 text-white text-center rounded-md"
                  onClick={() => handleSelected(product)}
                >
                  {productSelected.some((selected) => selected.id === product.id) ? 'Selecionado' : 'Selecionar'}
                </button>
              </div>
              {product.priority ? (
                <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500 bg-green-700 text-white text-center rounded-md">Prioridade</p>
              ) : (<></>)}
            </div>
          ))}
          {productSelected.length >= 2 ? (
            <button className="fixed bottom-4 right-4 z-10 " onClick={handleShowMap}>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-lg">
                <MapIcon className="h-6 w-6 text-white-600" />
              </div>
            </button>
          ) : (<></>)}
          {map == true ? (

            <Map cordsSore={coords} coordsOrders={coordsOrders} />
          ) : (<></>)}
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
                      <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-2/3">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0.0000000018998988836!2d${productSelectedSeeInfos?.account.address.lng}!3d${productSelectedSeeInfos?.account.address.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMTEnNTQuOCJTIDM4wrAzMCc1Ny4wIlc!5e0!3m2!1sen!2sus!4v1623485478147!5m2!1sen!2sus"
                              className="w-full h-64 md:h-auto" loading="lazy"></iframe>
                          </div>
                          <div className="md:w-1/3 bg-gray-100 p-4">
                            <h2 className="text-2xl font-bold mb-4">Localização</h2>
                            <p className="mb-2">Nome: {productSelectedSeeInfos?.account.name} </p>
                            <p className="mb-2">Endereço: {productSelectedSeeInfos?.account.address.houseNumber}  {productSelectedSeeInfos?.account.address.street}, {productSelectedSeeInfos?.account.address.district}</p>
                            <p className="mb-2">Contato: {productSelectedSeeInfos?.account.contact || "Sem contato"}</p>
                            <p className="mb-2">Obs: {productSelectedSeeInfos?.account.address.obs || "Sem observação"}</p>
                            {productSelectedSeeInfos ? (
                              <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500 bg-green-700 text-white text-center rounded-md">Prioridade</p>
                            ) : (<></>)}
                          </div>
                        </div>
                      </div>

                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : (<></>)
      }

    </div >
  );
}
