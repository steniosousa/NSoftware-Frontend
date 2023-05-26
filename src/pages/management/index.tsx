import React, { useEffect, useState } from 'react';
import Graphic from '../../components/graphic';
import Header from '../../components/Header';
import axios from 'axios';

const Management: React.FC = () => {
    const [data, setData] = useState([
        { username: 'user1', role: '', approved: false },
        { username: 'user2', role: '', approved: false },
        { username: 'user3', role: '', approved: false },
      ]);
      
      async function getData(){
        const { data } = await axios.get(`http://localhost:3000/employee?companyCod=435F57X`);
        console.log(data)
      }
    
      const handleRoleChange = (index:any, event:any) => {
        const newData = [...data];
        newData[index].role = event.target.value;
        setData(newData);
      };
    
      const handleApprovalChange = (index:any) => {
        const newData = [...data];
        newData[index].approved = !newData[index].approved;
        setData(newData);
      };

useEffect(() =>{
    getData()
},[])
  return (
    <>
    <Header/>
  <section>
            <div id="main" className="main-content flex-1 bg-gray-100  pb-24 md:pb-5">


                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                            <div className="flex flex-row items-center">
                                <div className="flex-shrink pr-4">
                                    <div className="rounded-full p-5 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                                </div>
                                <div className="flex-1 text-right md:text-center">
                                    <h2 className="font-bold uppercase text-gray-600">Rendimento total </h2>
                                   <p className="font-bold text-3xl">$3249 <span className="text-green-500"><i className="fas fa-caret-up"></i></span></p>
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
                                    <h2 className="font-bold uppercase text-gray-600">Rendimento Hoje</h2>
                                    <p className="font-bold text-3xl">$143 <span className="text-pink-500"></span></p>
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
                                    <h2 className="font-bold uppercase text-gray-600">Novos clientes</h2>
                                    <p className="font-bold text-3xl">2 <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></p>
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
                                    <h2 className="font-bold uppercase text-gray-600">Total de pedidos</h2>
                                    <p className="font-bold text-3xl">152 days</p>
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
                                    <p className="font-bold text-3xl">7 </p>
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
                                    <h2 className="font-bold uppercase text-gray-600">Entregues</h2>
                                    <p className="font-bold text-3xl">3 <span className="text-red-500"><i className="fas fa-caret-up"></i></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-row flex-wrap flex-grow mt-2">

                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div className="bg-white border-transparent rounded-lg shadow-xl">
                        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                            <h1 className="font-bold uppercase text-gray-600 text-center">Índice de crescimento</h1>
                        </div>
                        <div className="p-5">
                            <Graphic panelType={'bar'}/> 
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div className="bg-white border-transparent rounded-lg shadow-xl">
                        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                            <h2 className="font-bold uppercase text-gray-600">Graph</h2>
                        </div>
                        <div className="p-5">
                        <Graphic panelType={'line'}/> 
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div className="bg-white border-transparent rounded-lg shadow-xl">
                        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                            <h2 className="font-bold text-center uppercase text-gray-600">30 funcionários</h2>
                        </div>
                        <div>
                            <div className="overflow-x-auto">
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nome de Usuário
                                    </th>
                                    <th className=" p-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Função
                                    </th>
                                    <th className=" p-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aprovado
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.username}</div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <select
                                        className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={item.role}
                                        onChange={(e) => handleRoleChange(index, e)}
                                        >
                                        <option value="">Selecione</option>
                                        <option value="Gerente">Cozinheiro</option>
                                        <option value="Motoboy">Motoboy</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <input
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        checked={item.approved}
                                        onChange={() => handleApprovalChange(index)}
                                        />
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
                            <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                        </div>
                        <div className="p-5">
                            <Graphic panelType={'pie'}/> 
                        </div>
                    </div>
                </div>

                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        <div className="bg-white border-transparent rounded-lg shadow-xl">
                            <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                <h2 className="font-bold uppercase text-gray-600">30 funcionários</h2>
                            </div>
                            <div className="p-5">
                                <table className="w-full p-5 text-gray-700">
                                    <thead>
                                    <tr>
                                        <th className="text-left text-blue-900">Name</th>
                                        <th className="text-left text-blue-900">Side</th>
                                        <th className="text-left text-blue-900">Role</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>Obi Wan Kenobi</td>
                                        <td>Light</td>
                                        <td>Jedi</td>
                                    </tr>
                                    <tr>
                                        <td>Greedo</td>
                                        <td>South</td>
                                        <td>Scumbag</td>
                                    </tr>
                                    <tr>
                                        <td>Darth Vader</td>
                                        <td>Dark</td>
                                        <td>Sith</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <p className="py-2"><a href="#">See More issues...</a></p>

                            </div>
                        </div>
                    </div>

                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    <div className="bg-white border-transparent rounded-lg shadow-xl">
                        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                            <h2 className="font-bold uppercase text-gray-600">Advert</h2>
                        </div>
                        <div className="p-5 text-center">


                            <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CK7D52JJ&placement=wwwtailwindtoolboxcom" id="_carbonads_js"></script>


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
