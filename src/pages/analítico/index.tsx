import Header from "../../components/Header"

export default function analitico(){
    const people = [
        {
            name: 'Pizza de calabreza',
            email: '18 pedidos',
            role: 'R$18,99',
            imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '8% da receita',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Pizza de portuguesa',
            email: '16 pedidos',
            role: 'R$ 18,99',
            imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '4% da receita',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Pizza de frango',
            email: '12 pedidos',
            role: 'R$ 18,99',
            imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '4% da receita',
        }
]

const pedidos = [
    {
        name: 'Pizza de calabreza',
        email: 'Em preparo',
        role: '8 minutos',
        imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: 'Horário: 18:55',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Pizza de portuguesa',
        email: 'Pronto para entrega',
        role: '5 minutos',
        imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: 'Horário: 19:10',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Pizza de frango',
        email: 'Á caminho',
        role: '20 minutos',
        imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: 'Horário: 17:10',
    }
]
    return(
    <>
        <Header title={"Área de Gerência"}/>   
        <div className="grid grid-cols-4 gap-6 p-2">
            <div className="bg-gray-200 p-4">
                <div className="text-center">
                    <p className="italic ">Pedidos realizados</p>
                    <h2>61</h2>
                </div>
            </div>
            <div className="bg-gray-200 p-4">
                <div className="text-center">
                    <p className="italic ">Pedidos em andamento</p>
                    <h2>32</h2>
                </div>
            </div>
            <div className="bg-gray-200 p-4">
                <div className="text-center">
                    <p className="italic ">Valor médio de pedido</p>
                    <h2>R$18,99</h2>
                </div>
            </div>
            <div className="bg-green-300 p-4">
                <div className="text-center">
                    <p className="italic ">Receita total</p>
                    <h2>R$500,00</h2>
                </div>
            </div>
            <div className="row-span-2 col-span-1  p-4">
                <p className="text-center italic">Top pedidos </p>
            <ul role="list" className="divide-y divide-gray-100 m-4">
                {people.map((person) => (
                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                        <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                        {person.lastSeen ? (
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                           <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                        </p>
                        ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                        )}
                    </div>
                    </li>
                ))}
            </ul>
            </div>
            <div className="row-span-2 col-span-1  p-4">
                <p className="text-center italic">Análise do consumidor </p>
            <ul role="list" className="divide-y divide-gray-100 m-4">
                {pedidos.map((person) => (
                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                        <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                        {person.lastSeen ? (
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                           <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                        </p>
                        ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                        )}
                    </div>
                    </li>
                ))}
            </ul>
            </div>
            <div className="  text-center italic flex flex-col justify-around p-4" >
                <div>
                    <p>Tempo médio de preparação</p>
                    <h2>0:30h</h2>
                </div>
                <div>
                    <p>Tempo de entrega médio</p>
                    <h2>0:50h</h2>
                </div>
            </div>
           
        </div>
        
    </>
    )
}