import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { MapIcon } from "@heroicons/react/24/outline";
import Api from "../../services/api";
import { AxiosResponse } from "axios";

type ProductsType = {
  id: number,
  name: string,
  href: string,
  status: string,
  image: string,
  imageAlt: string,
  amount: number,
  sizes: string,
  observation: string,
  userId: string
  priority: boolean
}

type coordsProps = {
  lat:number,
  lng:number
}


export function Delivery() {
  const [datas, setDatas] = useState()
  const [products, setOrders] = useState<ProductsType[]>([]);
  const [productSelected, setProductSelected] = useState<ProductsType[]>([]);
  const [coords, setCoords] = useState<coordsProps>({lat:0,lng:0})
  const [coordsOrders, setCoordsOrders] = useState<coordsProps[]> ([])
  const [map, setMap] = useState(Boolean)

  async function getProducts() {
    const data = localStorage.getItem("data");
    if (!data) return
    const parsedData = JSON.parse(data);
    setDatas(parsedData)

    const objSendOrder = { "companyId": parsedData.statusCompany.companyID, "page": 1 }
    const objSenderCompany = {"id": parsedData.statusCompany.companyID}
    try {
      const [responseOrders, responseLocationStore]:AxiosResponse[] = await Promise.all([
       Api.get('order/', {
          params: objSendOrder
        }),
        Api.get('company',{
          params:objSenderCompany
        })
      ])
      const responseOrdersData = responseOrders.data
      const coordsStore = {lat: parseFloat(responseLocationStore.data.lat), lng: parseFloat(responseLocationStore.data.lng) }

      const completedOrders = responseOrdersData.filter((order: ProductsType) => order.status === "Concluído");
      setOrders(completedOrders)
      setCoords(coordsStore)

      completedOrders.forEach((cords:{lat:string,lng:string}) => {
        const latInt = parseFloat(cords.lat)
        const lngInt = parseFloat(cords.lng)
        const objCoords:any = {location:{lat:latInt, lng:lngInt}} 
        setCoordsOrders([...coordsOrders,objCoords])
      });
    } catch (error) { console.log(error) }
  }




  function handleSelected(product: ProductsType) {
    setProductSelected([...productSelected, product])
    const filter = productSelected.find((element) => element.id == product.id)
    const newSelected: ProductsType[] = []
    if (filter) {
      productSelected.forEach((product) => {
        if (product.id == filter.id) return
        newSelected.push(product)
      })
      setProductSelected(newSelected)
      return
    }
    console.log(coordsOrders)

  }

  function handleShowMap() {
    setMap(!map)
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

          {products.map((product: ProductsType) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="max-h-60 h-60 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="flex flex-col justify-around">
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
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
          
            <Map cordsSore={coords} coordsOrders={coordsOrders}/>
          ) : (<></>)}
        </div>
      </div>
    </div >
  );
}
