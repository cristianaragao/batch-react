import { batchFunc } from "./batch";
import { db } from "./firebase";
import { useEffect, useMemo, useState } from "react";

type TModel = {
  id: string;
  nome: string;
};

const initialState = { id: "", nome: "" };

export const useController = () => {
  const [newCar, setNewCar] = useState<TModel>(initialState);
  const [newMotor, setNewMoto] = useState<TModel>(initialState);

  const [carsLocal, setCarsLocal] = useState<TModel[]>([]);
  const [carsCloud, setCarsCloud] = useState<TModel[]>([]);

  const [cardDelete, setCarDelete] = useState<string[]>([]);
  const [motoDelete, setMotoDelete] = useState<string[]>([]);

  const [motorsLocal, setMotorslocal] = useState<TModel[]>([]);
  const [motorsCloud, setMotorsCloud] = useState<TModel[]>([]);

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const model = (obj?: any): TModel => ({
    id: obj?.id || "",
    nome: obj?.nome || "",
  });

  const batchCars = useMemo(() => batchFunc("cars"), [update]);
  const batchMoto = useMemo(() => batchFunc("moto"), [update]);

  useEffect(() => {
    setNewCar(initialState);
  }, [carsLocal]);

  useEffect(() => {
    setNewMoto(initialState);
  }, [motorsLocal]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const responseCar = await db.collection("cars").get();
      setCarsCloud(
        responseCar.docs.map((doc) => model({ id: doc.id, ...doc.data() }))
      );
      setCarsLocal([]);
      setCarDelete([])

      const responseMoto = await db.collection("moto").get();
      setMotorsCloud(
        responseMoto.docs.map((doc) => model({ id: doc.id, ...doc.data() }))
      );
      setMotorslocal([]);
      setMotoDelete([]);
      setLoading(false);
    };
    load();
  }, [update]);

  return {
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
    loading,
    setLoading,
    setNewMoto,
    motorsLocal,
    setMotorslocal,
    cardDelete,
    setCarDelete,
    motoDelete,
    setMotoDelete,
    initialState,
    update,
    setUpdate
  };
};
