import axios from "axios";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { MapIcon } from "@heroicons/react/24/outline";
import Api from "../../services/api";

type ProductsType = {
  id: number,
  name: string,
  href: string,
  status: string,
  imageSrc: string,
  imageAlt: string,
  amount: number,
  sizes: string,
  observation: string,
  userId: 1
}

export function Delivery() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [productSelected, setProductSelected] = useState<ProductsType[]>([]);
  const [map, setMap] = useState(Boolean)
  
  async function getProducts() {
    const { data } = await Api.get('/products', {params:{companyCode: '435F57X'}});
    const completedOrders = data.filter((order: ProductsType) => order.status === "Concluído");
    setProducts(completedOrders);
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleSelected(product: ProductsType) {
    if (!productSelected.some((selected) => selected.id === product.id)) {
      setProductSelected((prevState) => [...prevState, product]);
    }
  }

  function handleShowMap(){
    setMap(!map)
  }



  return (
    <div className="min-h-screen">
      <Header />

      <h2 className="text-center m-4">Selecione suas entregas</h2>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {!products.length ? (
            <h1 className="mt-1 text-sm font-medium text-gray-900 text-blue-800 text-center" >Carregando</h1>
          ) : (
            <>
              {products.map((product: ProductsType) => (
                <div key={product.id} className="group">
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="max-h-60 h-60 w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                    <button className={`mt-4 text-sm ${productSelected.some((selected) => selected.id === product.id) ? 'text-green-500' : 'text-gray-700'}`} onClick={() => handleSelected(product)}>
                      {productSelected.some((selected) => selected.id === product.id) ? 'Selecionado' : 'Selecionar'}
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500">{product.status}</p>
                </div>
              ))}
            </>
          )}
          {productSelected.length >=2?(
            <button className="fixed bottom-4 right-4 z-10 " onClick={handleShowMap}>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-lg">
              <MapIcon className="h-6 w-6 text-white-600" />
            </div>
          </button>
          ):(<></>)}
          {map == true?(
            <Map/>
          ): (<></>)}
        </div>
      </div>
    </div>
  );
}
