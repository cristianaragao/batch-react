import { useController } from "controller";

function App() {
  const {
    newCar,
    setNewCar,
    carsLocal,
    setCarsLocal,
    newMotor,
    carsCloud,
    motorsCloud,
    batchCars,
    batchMoto,
    model,
    setNewMoto,
    motorsLocal,
    setMotorslocal,
    cardDelete,
    motoDelete,
    setMotoDelete,
    setCarDelete,
    initialState,
    update,
    loading,
    setUpdate
  } = useController();

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center gap-10 p-10">
      <p className="text-xl font-bold">Teste com Batch Firebase</p>
      <div className="flex gap-10">
        <div id="carros" className="flex flex-col gap-5">
          <div className="bg-gray-200 p-5 rounded flex flex-col gap-5 h-fit">
            <p className="font-bold">Carros</p>

            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Nome do novo carro"
              value={newCar.nome}
              onChange={(e) => setNewCar({ ...newCar, nome: e.target.value })}
            />

            <button
              type="button"
              onClick={() => {
                batchCars.addDoc(newCar, model);
                setCarsLocal([...carsLocal, newCar]);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700"
            >
              Adicionar
            </button>
          </div>

          <button
            type="button"
            onClick={async () => {
              await batchCars.commit();
              setUpdate(!update);
            }}
            className="inline-flex items-center px-4 py-2 w-full border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700"
          >
            {loading ? "Salvando..." : "Salvar na Nuvem"}
          </button>

          {carsLocal.length > 0 && (
            <div>
              <p className="font-bold">Lista de carros Salvos Localmente</p>

              <ol className="flex flex-col gap-2 mt-3">
                {carsLocal.map((car) => (
                  <li>{car.nome}</li>
                ))}
              </ol>
            </div>
          )}

          {carsCloud.length > 0 && (
            <div>
              <p className="font-bold">Lista de carros Salvos na Nuvem</p>

              <ol className="flex flex-col gap-2 mt-3">
                {carsCloud.map((car) => (
                  <li className="flex items-center justify-between">
                    <p>{car.nome}</p>

                    <button
                      type="button"
                      onClick={() => {
                        console.log("car: ", car)
                        setCarDelete([...cardDelete, car.id]);
                        batchCars.deleteDoc(car.id);
                      }}
                      className={`inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
                        ${
                          cardDelete.includes(car.id)
                            ? "bg-gray-500 hover:bg-gray-700"
                            : "bg-red-500 hover:bg-red-700"
                        }
                        `}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div id="motos" className="flex flex-col gap-5">
          <div className="bg-gray-200 p-5 rounded flex flex-col gap-5 h-fit">
            <p className="font-bold">Motos</p>

            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Nome da nova moto"
              value={newMotor.nome}
              onChange={(e) => setNewMoto({ ...initialState, nome: e.target.value})}
            />

            <button
              type="button"
              onClick={() => {
                batchMoto.addDoc(newMotor, model);
                setMotorslocal([...motorsLocal, newMotor]);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700"
            >
              Adicionar
            </button>
          </div>

          <button
            type="button"
            onClick={async () => {
              await batchMoto.commit();
              setUpdate(!update);
            }}
            className="inline-flex items-center px-4 py-2 w-full border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700"
          >
            {loading ? "Salvando..." : "Salvar na Nuvem"}
          </button>

          {motorsLocal.length > 0 && (
            <div>
              <p className="font-bold">Lista de motos Salvas Localmente</p>

              <ol className="flex flex-col gap-2 mt-3">
                {motorsLocal.map((moto) => (
                  <li>{moto.nome}</li>
                ))}
              </ol>
            </div>
          )}

          {motorsCloud.length > 0 && (
            <div>
              <p className="font-bold">Lista de motos Salvas na Nuvem</p>

              <ol className="flex flex-col gap-2 mt-3">
                {motorsCloud.map((moto) => (
                  <li
                    key={moto.id}
                    className="flex items-center justify-between"
                  >
                    <p>{moto.nome}</p>

                    <button
                      type="button"
                      onClick={() => {
                        batchMoto.deleteDoc(moto.id);
                        setMotoDelete([...motoDelete, moto.id]);
                      }}
                      className={`inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
                   ${
                     motoDelete.includes(moto.id)
                       ? "bg-gray-500 hover:bg-gray-700"
                       : "bg-red-500 hover:bg-red-700"
                   }
                   `}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
