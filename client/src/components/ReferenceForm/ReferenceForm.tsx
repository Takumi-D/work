import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import "./ReferenceForm.scss";

import { AppDispatch } from "../../store/store";
import { CreateReferenceItem } from "../../types/slices/references-slice";
import { dataSelectors, loadingSelectors, errorSelectors } from "../../selectors/work-type-selectors";
import { messageSelectors, errorMessageSelectors } from "../../selectors/references-selectors";
import { getWorkType } from "../../slices/work-type-slice";
import { fetchReferences, fetchReferenceById, updateReference, clearSuccessMessage, getReferences } from "../../slices/references-slice";

function ReferenceForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CreateReferenceItem>();

    const dataWorkType = useSelector(dataSelectors);
    const loadingWorkType = useSelector(loadingSelectors);
    const errorGetWorkTypeMessage = useSelector(errorSelectors);
    const successMessageReference = useSelector(messageSelectors);
    const errorMessageReference = useSelector(errorMessageSelectors);

    const emptyForm = {
        date: "",
        workTypeId: "",
        volume: "",
        unit: "",
        workerName: ""
    };

    useEffect(() => {
        dispatch(getWorkType());
    }, [dispatch]);

    useEffect(() => {
        if (isEdit) {
            dispatch(fetchReferenceById(Number(id)))
                .unwrap()
                .then((data) => {
                    reset({
                        date: data.date.split('T')[0],
                        workTypeId: data.workTypeId,
                        volume: data.volume,
                        unit: data.unit,
                        workerName: data.workerName
                    });
                })
        }
    }, [id, isEdit, dispatch, reset, navigate]);

    useEffect(() => {
        if (successMessageReference) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [dispatch, successMessageReference]);

    const onSubmit = async (data: CreateReferenceItem) => {
        const volumeNumber = parseFloat(String(data.volume).replace(",", "."));

        const formattedData = {
            ...data,
            volume: Number(volumeNumber),
        };

        if (isEdit) {
            const response = await dispatch(updateReference({ id: Number(id), data: formattedData }));
            if (response.type === "references/update/fulfilled") {
                reset(emptyForm as any);
            }
        } else {
            const response = await dispatch(fetchReferences(formattedData));
            if (response.type === "references/add/fulfilled") {
                reset(emptyForm as any);
            }
        }
    };

    if (loadingWorkType) {
        return <div className="form__loading">Загрузка...</div>;
    }

    if (errorGetWorkTypeMessage) {
        return <div className="form__loading">Ошибка загрузки: {errorGetWorkTypeMessage}</div>;
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {successMessageReference && <div className="form__success">{successMessageReference}</div>}
            {errorMessageReference && <div className="form__error-message">{errorMessageReference}</div>}

            <label className="form__label">
                Дата выполнения работ
                <input {...register("date", { required: "Поле обязательно для заполнения" })} type="date" className="form__input" />
                {errors.date && <span className="form__error">{errors.date.message as string}</span>}
            </label>

            <label className="form__label">
                Тип работ
                <select className="form__select" {...register("workTypeId", { required: "Поле обязательно для заполнения" })}>
                    <option value="">Выберите тип работ</option>
                    {dataWorkType.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                {errors.workTypeId && <span className="form__error">{errors.workTypeId.message as string}</span>}
            </label>

            <label className="form__label">
                Объем
                <input
                    {...register("volume", {
                        required: "Поле обязательно для заполнения",
                        validate: (value) => {
                            return !isNaN(value) || "Введите число";
                        }
                    })}
                    type="text"
                    className="form__input"
                />
                {errors.volume && <span className="form__error">{errors.volume.message as string}</span>}
            </label>

            <label className="form__label">
                Единица измерения
                <input {...register("unit", { required: "Поле обязательно для заполнения" })} type="text" className="form__input" />
                {errors.unit && <span className="form__error">{errors.unit.message as string}</span>}
            </label>

            <label className="form__label">
                ФИО исполнителя работ
                <input {...register("workerName", { required: "Поле обязательно для заполнения" })} type="text" className="form__input" />
                {errors.workerName && <span className="form__error">{errors.workerName.message as string}</span>}
            </label>

            <button className="btn" type="submit">{isEdit ? "Сохранить" : "Записать"}</button>
        </form>
    );
}

export default ReferenceForm;