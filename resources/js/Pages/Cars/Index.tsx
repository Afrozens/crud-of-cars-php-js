import { useRef, useState, ChangeEvent, FormEvent } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { Head, router } from "@inertiajs/react";
import { PageProps, Car } from "@/types";
import {
    PrimaryButton,
    WarningButton,
    DangerButton,
    Modal,
    InputLabel,
    TextInput,
    InputError,
    Select,
} from "@/Components";
import { IoMdAdd } from "react-icons/io";
import { AiFillCar, AiFillDelete, AiOutlineSave } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const initialValue: Car = {
    id: "",
    make: "",
    model: "",
    color: "",
};

export default function CarsPage({ auth, cars }: PageProps) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);

    const [values, setValues] = useState<Car>(initialValue);

    const makeInput = useRef();
    const modelInput = useRef();
    const colorInput = useRef();

    const openModal = (objCar: Car) => {
        setModal(true);
        setValues(initialValue);

        if (Object.values(objCar).length > 5) {
            setOperation(2);
            setTitle("Edit car");
            setValues(objCar);
        } else {
            setOperation(1);
            setTitle("Add car");
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Cars
                </h2>
            }
        >
            <Head title="Cars" />

            <section className="bg-white dark:bg-gray-700 h-screen flex items-center flex-col">
                <article className="m-4 flex justify-end">
                    <PrimaryButton onClick={() => openModal(initialValue)}>
                        <IoMdAdd />
                    </PrimaryButton>
                </article>
                <article className="bg-white dark:bg-gray-700 grid place-items-center py-6">
                    <table className="table-auto border border-white-400">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2">#</th>
                                <th className="p-2">Marca</th>
                                <th className="p-2">Modelo</th>
                                <th className="p-2">Color</th>
                                <th className="p-2">Editar</th>
                                <th className="p-2">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {cars.map((car, index) => (
                                <tr key={car.id}>
                                    <td className="border border-white-400 p-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-white-400 p-2">
                                        {car.make}
                                    </td>
                                    <td className="border border-white-400 p-2">
                                        {car.model}
                                    </td>
                                    <td className="border border-white-400 p-2">
                                        <AiFillCar
                                            className={`w-6 h-6 text-${car.color}-600`}
                                        />
                                    </td>
                                    <td className="border border-white-400 p-2">
                                        <WarningButton
                                            onClick={() => openModal(car)}
                                        >
                                            <FiEdit />
                                        </WarningButton>
                                    </td>
                                    <td className="border border-white-400 p-2">
                                        <DangerButton>
                                            <AiFillDelete className="text-white" />
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </article>
            </section>
            <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900 dark:text-gray-100">
                    {title}
                </h2>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mt-6">
                        <InputLabel htmlFor="make">Make</InputLabel>
                        <TextInput
                            ref={makeInput}
                            type="text"
                            id="make"
                            value={values.make}
                            required
                            onChange={handleChange}
                            className="mt-1 block w-3/4"
                            isFocused
                        />
                        {/* <InputError message={errors.make} className="mt-2" /> */}

                        <InputLabel htmlFor="model">Model</InputLabel>
                        <TextInput
                            type="text"
                            id="model"
                            value={values.model}
                            required
                            
                            onChange={handleChange}
                            className="mt-1 block w-3/4"
                        />
                        {/* <InputError message={errors.model} className="mt-2" /> */}

                        <InputLabel htmlFor="color" value="Color"></InputLabel>
                        <Select
                            name="color"
                            ref={modelInput}
                            value={values.color}
                            required
                            onChange={handleChange}
                            className="mt-1 block w-3/4"
                            options={[
                                "gray",
                                "red",
                                "yellow",
                                "green",
                                "purple",
                            ]}
                        ></Select>
                        {/* <InputError message={errors.model} className="mt-2" /> */}
                        <div className="mt-6">
                            <PrimaryButton type="submit" className="mt-2">
                                <AiOutlineSave />
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
