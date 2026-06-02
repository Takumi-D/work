import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import "./WorkTypeForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchWorkType } from "../../slices/work-type-slice";
import { loadingSelectors, messageSelectors, errorSelectors } from "../../selectors/work-type-selectors";
import { clearSuccessMessage } from "../../slices/work-type-slice"
import {CreateWorkItem} from "../../types/slices/work-type-slice";

function WorkTypeForm() {
    const dispatch = useDispatch<AppDispatch>();
    const successMessage = useSelector(messageSelectors);
    const loading = useSelector(loadingSelectors);
    const errorMessage = useSelector(errorSelectors);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateWorkItem>();

   async function onSubmit(data: CreateWorkItem) {
        const response = await dispatch(fetchWorkType(data));

        if (response.type === "work-type/add/fulfilled") {
            reset();
        }
    }

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [dispatch, successMessage]);

    if (loading) {
        return (<div className="form__loading">Загрузка...</div>)
    }

    return (
        <form className="form" onSubmit={ handleSubmit(onSubmit) }>
            {successMessage && <div className="form__success">{successMessage}</div>}
            {errorMessage && <div className="form__error-message">{errorMessage}</div>}

            <label className="form__label">
                Тип работ
                <input
                    className={`form__input ${errors.name ? "form__input--error" : ""}`}
                    type="text"
                    {...register("name", {
                        required: "Поле обязательно для заполнения",
                        validate: value => value !== "" || "Выберите вид работ"
                    })}
                />
                {errors.name && <span className="form__error">{errors.name.message as string}</span>}
            </label>

            <button className="btn" type="submit">Добавить</button>
        </form>
    )
}

export default WorkTypeForm;