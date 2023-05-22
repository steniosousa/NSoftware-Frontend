import Header from "../../components/Header"
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'



function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const products = [
    {
      id: 1,
      name: 'Pizza de Frango',
      status: 'Pendente',
      imageSrc: 'https://www.sabornamesa.com.br/media/k2/items/cache/ada34cd2101afafaba465aad112ee3c1_XL.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      observation:"Sem cebola",
      amount:3,
      sizes:'G',
    },
    {
      id: 2,
      name: 'Coxinha de franco com queijo',
      href: '#',
      status: 'Pendente',
      imageSrc: 'https://www.comidaereceitas.com.br/wp-content/uploads/2021/05/coxinhaa_frango-780x493.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      observation:"Pouco queijo",
      amount:1,
      sizes: 'M'
    },
    {
      id: 3,
      name: 'Pastel Misto',
      href: '#',
      status: 'Preparando',
      imageSrc: 'https://static.ifood-static.com.br/image/upload/t_high/pratos/a037092e-0d70-487c-84d6-e548522d465c/202003252009_teFk_i.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      amount:5,
      sizes: 'M',
      observation:''
    },
    {
      id: 4,
      name: 'Pizza de Calabresa',
      href: '#',
      status: 'Pendente',
      imageSrc: 'https://pilotandofogao.com.br/wp-content/uploads/2016/05/Pizza-De-Calabresa.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      amount:4,
      sizes: 'P',
      observation:''
    },
   
  ]

  type ProdutcsType = {
    id: number,
    name: string,
    href: string,
    status: string,
    imageSrc: string,
    imageAlt: string,
    amount:number,
    sizes: string,
    observation:string
  }
  
  export default function Order() {
    const [open, setOpen] = useState(false)
    const [productSelected, setProductSelected] = useState<ProdutcsType>()
    
    const sizes = [
        { name: 'P', inStock: true },
        { name: 'M', inStock: true },
        { name: 'G', inStock: true },
    ]
     function showProduct(product:any){
        setProductSelected(product)
        setOpen(true)
    }
    sizes.forEach(size => {
        if (productSelected == undefined) return
        if (size.name === productSelected.sizes) {
          size.inStock = false; 
         
        }
      });
    
    function assume(){
        if (productSelected == undefined) return
        productSelected.status="Preparando"
        setOpen(false)
    }

    function Concluir(){
        if (productSelected == undefined) return
        productSelected.status="Concluído"
        setOpen(false)
    }
    return (
    <>
    <Header/>
      <div className="bg-white-10">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6  gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {products.map((product) => (
                <div  key={product.id}className="group" onClick={() => showProduct(product)} >
                <div className="aspect-h-1 aspect-w-1  overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="max-h-60 h-60 w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              

                {product.status == 'Preparando'?(
                    <p className="mt-1 text-sm font-medium text-gray-900 text-fuchsia-500">{product.status}</p>
                ):product.status == 'Concluído'?(
                    <p className="mt-1 text-sm font-medium text-gray-900 text-lime-400	 ">{product.status}</p>
                ):(
                    <p className="mt-1 text-sm font-medium text-gray-900  text-blue-800 ">{product.status}</p>
                   
                )}
                
                
              </div>
            ))}
          </div>
        </div>
      </div>
      {productSelected != undefined?(

          <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                      <img src={productSelected.imageSrc} alt={productSelected.imageAlt} className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{productSelected.name}</h2>
                      <h3 className="mt-4 text-sm text-gray-700">{productSelected.status}</h3>
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
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Observação:</h4>
                            <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                              {productSelected.observation} 
                            </p>
                          </div>

                          {/* Sizes */}
                          <div className="mt-10">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">Tamanho</h4>
                              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Size guide
                              </a>
                            </div>

                            <RadioGroup className="mt-4">
                              <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                              <div className="grid grid-cols-4 gap-4">
                                {sizes.map((size) => (
                                    <RadioGroup.Option
                                    key={size.name}
                                    value={size}
                                    disabled={!size.inStock}
                                    className={({ active }) =>
                                    classNames(
                                        size.inStock
                                          ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                          : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                        )
                                    }
                                    >
                                    {({ active, checked }) => (
                                        <>
                                        <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                        {size.inStock ? (
                                            <span
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                'pointer-events-none absolute -inset-px rounded-md'
                                                )}
                                                aria-hidden="false"
                                                />
                                        ) : (
                                            <span
                                            aria-hidden="false"
                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                            >
                                            <svg
                                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              stroke="currentColor"
                                              >
                                              <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>

                        {productSelected.status == 'Preparando'?(
                            <button
                            onClick={Concluir}
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                            Concluir
                          </button>
                        ):(
                          <button
                          onClick={assume}
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
    ):(<></>)}
    </>
    )
  }
  