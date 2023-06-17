import React, { useEffect, useState } from 'react';
import Graphic from '../../components/graphic';
import Header from '../../components/Header';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { eachDayOfInterval, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Api from '../../services/api';
import closed from '../../assets/closed.png'


interface HorarioPicoResult {
    horarioPico: string | null;
    numOcorrencias: number;
}

type EmployeeProps = {
    idUser: string,
    companyCode: string,
    password: string,
    name: string,
    email: string,
    roleEmployee: string,
    value: number,
    wage: string
}

type ProductsProps = {
    date: Date,
    id: number,
    name: string,
    status: string,
    imageSrc: string,
    imageAlt: string,
    observation: string,
    amount: number,
    value: number,
    sizes: string,
    companyCode: string,
    recipeId: number
}

type grapicProps = {
    labels: string[],
    datasets: [
        {
            label: string,
            data: number[],
            backgroundColor: string,
        },
    ],
}

type stockProps = {
    id: number, product: string, unitPrice: number, quantity: number
}
type Ingredients = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}

type recipeProps = {
    id: number,
    name: string,
    ingredients: Ingredients[]
}

type rushHour = {
    horarioPico: null;
    numOcorrencias: number;
} | {
    horarioPico: string;
    numOcorrencias: any;
}


const Management: React.FC = () => {
    const [datas, setDatas] = useState()
    const [handleWage, setHandleWage] = useState<number>()
    const [idChange, setIdChange] = useState()
    const [dateStart, setDateStart] = useState<Date>(new Date())
    const [dateEnd, setDateEnd] = useState<Date>(new Date())
    const [employees, setEmployees] = useState<EmployeeProps[]>([])
    const [orders, setOrders] = useState<ProductsProps[]>([])
    const [invoicing, setInvoicing] = useState('R$ 0')
    const [clients, setClients] = useState([])
    const [dateRange, setDateRange] = useState<ProductsProps[]>([])
    const [allPreparingOnder, setPreparing] = useState<ProductsProps[]>([])
    const [allDelivery, setAllDelivery] = useState<ProductsProps[]>([])
    const [expenses, setExpenses] = useState('R$ 0')
    const [stock, setStock] = useState<stockProps[]>([])
    const [recipe, setRecipe] = useState<recipeProps[]>([])
    const [charDataBar, setCharDataBar] = useState({} as grapicProps)
    const [charDataLine, setCharDataLine] = useState({} as rushHour)

    async function getData() {
        const data: any = localStorage.getItem("data")
        const parsedData = JSON.parse(data);
        setDatas(parsedData)
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        setDateStart(startDate)
        setDateEnd(endDate)
        const objSendEmployee = { "codeEmployee": parsedData.statusCompany.codeEmployee }
        const objSendOrder = { "companyId": parsedData.statusCompany.companyID, "page": 1 }
        const objSendClients = { "companyId": parsedData.statusCompany.companyID }
        try {
            const [employeesResponse, orderResponse, cliensResponse]: AxiosResponse[] = await Promise.all([
                Api.get('/employee/', { params: objSendEmployee }),
                Api.get('order/', {
                    params: objSendOrder
                }),
                Api.get('/account/clients', { params: objSendClients })

            ])
            const registeredEmployees: EmployeeProps[] = employeesResponse.data
            const registeredOrder: ProductsProps[] = orderResponse.data
            const registerCliensResponse = cliensResponse.data
            setEmployees(registeredEmployees)
            setOrders(registeredOrder)
            setClients(registerCliensResponse)


        } catch (error) {
            console.log(error)
        }
    }

    function CalculateRangeDate() {
        const allProducts: ProductsProps[] = []
        orders.forEach((dateForOrder) => {
            const dateFormatted = new Date(dateForOrder.date);
            if (dateFormatted >= new Date(dateStart) && dateFormatted <= new Date(dateEnd)) {
                const itemExists = allProducts.some((item) => item.id === dateForOrder.id);
                if (!itemExists) {
                    allProducts.push(dateForOrder)
                }
            }
        });
        if (allProducts.length == 0) {
            setDateRange([])
        } else {
            setDateRange(allProducts)

        }
    }

    function growthRateDays() {
        const days = eachDayOfInterval({ start: dateStart, end: dateEnd });
        const formattedDays: string[] = days.map((day) => format(day, 'yyyy/MM/dd', { locale: ptBR }));
        const newArray = orders.map((obj) => {
            return {
                id: obj.id,
                date: obj.date,
            };
        });
        const daysForOrder = formattedDays.map((day) => {
            const desiredDate = new Date(day);

            const salesCount = newArray.filter((sale) => {
                const saleDate = new Date(sale.date);
                return (
                    saleDate.getDate() === desiredDate.getDate() &&
                    saleDate.getMonth() === desiredDate.getMonth() &&
                    saleDate.getFullYear() === desiredDate.getFullYear()
                );
            }).length;
            return salesCount
        })

        const chartData: grapicProps = {
            labels: formattedDays,
            datasets: [
                {
                    label: `Cálculo de ${formattedDays.length} dia(s)`,
                    data: daysForOrder,
                    backgroundColor: 'rgba(0, 155, 255, 0.8)',
                },
            ],
        }
        setCharDataBar(chartData)
    }


    function calculateBilling() {
        let totalBilling = 0
        dateRange.forEach((money) => {
            totalBilling += money.value
        })
        const totalBillingAplication = totalBilling.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        setInvoicing(totalBillingAplication)
    }




    function preparing() {
        const preparingAll: ProductsProps[] = []
        const deliveryAll: ProductsProps[] = []
        orders.forEach((getQuantity) => {
            if (getQuantity.status == "Preparando") {
                const itemExists = preparingAll.some((item) => item.id === getQuantity.id);
                if (!itemExists) {
                    preparingAll.push(getQuantity)
                }
            }
        })

        orders.forEach((getQuantity) => {
            if (getQuantity.status == "A caminho") {
                const itemExists = deliveryAll.some((item) => item.id === getQuantity.id);
                if (!itemExists) {
                    preparingAll.push(getQuantity)
                }
            }
        })

        setAllDelivery(deliveryAll)
        setPreparing(preparingAll)
    }
    async function calcularValorGastoPizza() {
        let totalCost = 0;
        employees.forEach((wage) => {
            totalCost += wage.value
        })
        const allRecipes: recipeProps[] = []

        dateRange.map((recipeIdForOrder) => {
            const recipeId = recipeIdForOrder.recipeId;
            const recipes: any = recipe.find((recipe) => recipe.id === recipeId);
            allRecipes.push(recipes.ingredients)
        })
        if (allRecipes && allRecipes.length > 0) {
            allRecipes.forEach(ingredient => {
                if (Array.isArray(ingredient)) {
                    ingredient.map((g) => {
                        const { name } = g
                        const stockItem = stock.find((item) => item.product === name);
                        if (stockItem) {
                            const ingredientCost = stockItem.unitPrice * g.quantity;
                            totalCost += ingredientCost;
                        }
                    })
                }
            });

        }
        const wageFormated = totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        setExpenses(wageFormated)
    }

    async function getHourPique() {
        const hours: any = []
        dateRange.map((time: { date: Date }) => {
            const stockItem = hours.find((item: { date: Date }) => item.date === time.date);
            if (!stockItem) {
                hours.push(time.date)
            }
        })
        const rushHour = encontrarHorarioPico(hours)
        setCharDataLine(rushHour)
    }
    function encontrarHorarioPico(arrayDiasHorarios: string[][]): HorarioPicoResult {
        if (arrayDiasHorarios.length === 0) {
            return { horarioPico: null, numOcorrencias: 0 };
        }

        const horariosContagem: Record<string, number> = {};
        arrayDiasHorarios.forEach((horario) => {
            const date = new Date(horario as any);
            const horarioString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            horariosContagem[horarioString] = (horariosContagem[horarioString] || 0) + 1;
        });


        const horarioPico = Object.keys(horariosContagem).reduce((a, b) => {
            return horariosContagem[a] > horariosContagem[b] ? a : b;
        }, Object.keys(horariosContagem)[0]);

        return { horarioPico, numOcorrencias: horariosContagem[horarioPico] };
    }


    async function handleSend(e, user) {
        const wage = parseInt(handleWage)
        const datasSend = {
            email: user.email,
            wage,
        }
        await Api.patch('account/', datasSend);
        window.location.reload();
    }

    function handleWageFunction(user) {
        setHandleWage(user.wage)
        setIdChange(user.idUser)
    }

    const handleRoleChange = async (event: any, user: EmployeeProps) => {
        const roleId = parseInt(event)
        const datasSend = {
            email: user.email,
            wage: 200,
            roleId
        }
        await Api.patch('account/', datasSend);
        window.location.reload();
    };

    async function handleDelete(user) {
        const dataSend = {
            email: user.email
        }
        try {
            await Api.post('account/delete/', dataSend)
            window.location.reload()

        } catch {
        }

    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        CalculateRangeDate();
        growthRateDays()
        preparing()
    }, [orders, dateEnd]);


    useEffect(() => {
        calculateBilling();
        calcularValorGastoPizza();
        getHourPique()
        growthRateDays()
    }, [dateRange]);

    return (
        <>
            <Header />
            <section>
                <div id="main" className="main-content flex-1 bg-gray-100  pb-24 md:pb-5">
                    <div className='flex flex-row justify-center gap-2.5  items-center bg-gray-800  text-white pb-3'>
                        <label className='text-lg'>De</label>
                        <input
                            className='px-4 py-2 border appearance-none border-gray-300 focus:outline-none focus:ring focus:border-blue-500 rounded-md text-gray-900 placeholder-gray-500'
                            type='date'
                            onChange={(e) => {
                                const selectedDate = moment(e.target.value, 'YYYY-MM-DD').toDate();
                                selectedDate.setHours(0, 0, 0, 0);
                                setDateStart(selectedDate);
                            }}
                        ></input>
                        <label className='text-lg'>Á</label>
                        <input
                            className='px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 rounded-md text-gray-900 placeholder-gray-500'
                            type='date'
                            onChange={(e) => {
                                const selectedDate = moment(e.target.value, 'YYYY-MM-DD').toDate();
                                selectedDate.setHours(23, 59, 59, 999);
                                setDateEnd(selectedDate);
                            }}
                        >

                        </input>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">Faturamento </h2>
                                        <p className="font-bold text-3xl">{invoicing} <span className="text-green-500"><i className="fas fa-caret-up"></i></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-green-600"><i className="fas fa-2x fa-chart-line"></i></div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">despesas totais</h2>
                                        <p className="font-bold text-3xl">{expenses} <span className="text-pink-500"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">Total de clientes</h2>
                                        {clients.statusCode == 202 ? (
                                            <p className="font-bold text-3xl">0<span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></p>
                                        ) : (
                                            <p className="font-bold text-3xl">{clients.length}<span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></p>

                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-blue-600"><i className="fas fa-2x fa-shopping-cart"></i></div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">pedidos realizados</h2>
                                        <p className="font-bold text-3xl">{orders.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-indigo-600"><i className="fas fa-tasks fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">Preparando</h2>
                                        <p className="font-bold text-3xl">{allPreparingOnder.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded-full p-5 bg-red-600"><i className="fas fa-inbox fa-2x fa-inverse"></i></div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h2 className="font-bold uppercase text-gray-600">A caminho</h2>
                                        <p className="font-bold text-3xl">{allDelivery.length}<span className="text-red-500"><i className="fas fa-caret-up"></i></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap flex-grow mt-2">

                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-white border-transparent rounded-lg shadow-xl">
                                <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h1 className="font-bold uppercase text-gray-600 text-center">Índice de Faturamento</h1>
                                </div>
                                <div className="p-5">
                                    <Graphic panelType={'bar'} datas={charDataBar} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 py-6">
                            <div className="bg-white border-transparent rounded-lg shadow-xl">
                                <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h2 className="font-bold text-center uppercase text-gray-600">funcionários</h2>
                                </div>
                                <div>
                                    <div className="overflow-x-auto max-h-56 ">
                                        <table className="w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="p-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Nome
                                                    </th>
                                                    <th className=" p-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Exercendo
                                                    </th>

                                                    <th className=" p-2 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Salário
                                                    </th>

                                                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Desligar
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {employees.map((item) => (

                                                    <tr key={item.idUser}>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{item.name}</div>
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            <select
                                                                className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                onChange={(e) => handleRoleChange(e.target.value, item)}
                                                            >
                                                                {!item.roleEmployee ? (
                                                                    <option value="">Sem atuação</option>
                                                                ) : (
                                                                    <option value="">{item.roleEmployee}</option>
                                                                )}
                                                                {orders.map((select) => {
                                                                    return (
                                                                        <option key={select.id} value={select.id}>{select.role}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </td>

                                                        {item.idUser == idChange ? (
                                                            <td className="py-4 px-6 whitespace-nowrap" >
                                                                R$:
                                                                <input type={'number'}
                                                                    value={handleWage}
                                                                    onChange={(e) => setHandleWage(e.target.value)}
                                                                    onBlur={(e) => handleSend(e.target.value, item)}
                                                                    className="w-20 border-none  outline: none;"
                                                                >
                                                                </input>
                                                            </td>

                                                        ) : (
                                                            <td className="py-4 px-6 whitespace-nowrap">
                                                                R$:
                                                                <input type={'number'}
                                                                    value={item.wage || 0}
                                                                    onClick={() => handleWageFunction(item)}
                                                                    className="w-20 border-none  outline: none;"
                                                                >
                                                                </input>
                                                            </td>
                                                        )}
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            <button onClick={() => handleDelete(item)}><img src={closed} className="w-5" /></button>
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-white border-transparent rounded-lg shadow-xl">
                                <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h5 className="font-bold uppercase text-gray-600 text-center">Localizações</h5>
                                </div>
                                <div className="p-5">
                                    {/* <Graphic panelType={'pie'} datas={charDataBar}/>  */}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                            <div className="bg-white border-transparent rounded-lg shadow-xl">
                                <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                    <h2 className="font-bold uppercase text-gray-600 text-center">Reclamações</h2>
                                </div>
                                <div className="p-5 text-center">
                                    <div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="p-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Nome
                                                        </th>
                                                        <th className=" p-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            mensagem
                                                        </th>
                                                        <th className=" p-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Feedback
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="py-4 px-6 whitespace-nowrap"    >
                                                            <p>Francisco</p>
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            <p>Pizza boa</p>
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap">
                                                            <p>Bom</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    );
};

export default Management;
