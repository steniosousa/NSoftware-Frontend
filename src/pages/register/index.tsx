import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Api from "../../services/api";
export default function Register(){
    const [codeEmployee,setCodeEmployee] = useState<number>()
    const [password,setPassword] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value);
      setCodeEmployee(value);
    };
    
    async function handleRegister(event:any) {
        event.preventDefault();
        if ( password === '' || name === '' || email === '') {
          setAlert(true);
          setAlertType('error');
          setAlertMessage('Preencha todos os campos');
          return;
        }
        const newEmployee = {
          name,
          email,
          password,
          codeEmployee
        };

        try{
          await Api.post('account/',newEmployee);
          setAlertType("Success")
          setAlertMessage("Usuário criado com sucesso")
          handleOpenModal()
        }catch(error:any) {
          const responseReturn = error.response?.data?.message;
          setAlertType("error")
          setAlertMessage(responseReturn)
          handleOpenModal()
        }
      }
      const handleOpenModal = () => {
        setAlert(true);
      };
      const handleCloseModal = () => {
        setAlert(false);
      };

        
        
    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {alert && <Alert type={alertType} message={alertMessage} onClose={handleCloseModal}/>}

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
            
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className=" text-sm font-medium leading-6 text-gray-900 " >
                Código da empresa:
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={codeEmployee}
                  inputMode="numeric"
                  onChange={handleChange}
                  required
                  className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome:
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="Name"
                  value={name}
                  type="text"
                  required
                  onChange={(event) => setName(event.target.value)}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email:
                </label>
              </div>
              
              <div className="mt-2">
                <input
                  id="Email"
                  type="email"
                  value={email}
                  required
                  onChange={(event) => 
                    setEmail(event.target.value)}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha:
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={(event)=>handleRegister(event)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cadastrar
              </button>
            </div>
          </form>
          <div className="flex flex-row justify-around">
          <p className="mt-10 text-center text-sm text-gray-500">
            <Link to="/"  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Logar</Link>
          </p>
          </div>
        </div>

       
      </div>
    )
}