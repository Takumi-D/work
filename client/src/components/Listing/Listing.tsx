import React, { useEffect } from "react";
import "./Listing.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../../store/store";
import { getReferences, setSortOrder, deleteReference } from "../../slices/references-slice";
import { selectSortedData, loadingSelectors, errorMessageSelectors, selectSortOrder } from "../../selectors/references-selectors";

function Listing() {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector(selectSortedData);
    const loading = useSelector(loadingSelectors);
    const error = useSelector(errorMessageSelectors);
    const sortOrder = useSelector(selectSortOrder);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getReferences());
    }, [dispatch]);

    const handleSort = () => {
        if (sortOrder === null) {
            dispatch(setSortOrder('desc'));
        } else if (sortOrder === 'desc') {
            dispatch(setSortOrder('asc'));
        } else {
            dispatch(setSortOrder(null));
        }
    };

    const getSortIcon = () => {
        if (sortOrder === null) return '⇅';
        if (sortOrder === 'desc') return '↓';
        return '↑';
    };

    const handleDelete = async (id: number) => {
        if (confirm("Удалить запись?")) {
            await dispatch(deleteReference(id));
            dispatch(getReferences());
        }
    };

    if (loading) {
        return <div className="listing__loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="listing__error">Ошибка: {error}</div>;
    }

    return (
        <div className="listing">
            <div className="listing__header">
                <h1 className="listing__title">Журнал работ</h1>
            </div>

            <div className="listing__table-wrapper">
                <table className="listing__table">
                    <thead className="listing__thead">
                    <tr className="listing__tr">
                        <th className="listing__th listing__th--sortable" onClick={handleSort}>
                            Дата {getSortIcon()}
                        </th>
                        <th className="listing__th">Вид работ</th>
                        <th className="listing__th">Объём</th>
                        <th className="listing__th">Ед. изм.</th>
                        <th className="listing__th">Исполнитель</th>
                        <th className="listing__th">Действия</th>
                    </tr>
                    </thead>
                    <tbody className="listing__tbody">
                    {data.map((item) => (
                        <tr className="listing__tr" key={item.id}>
                            <td className="listing__td">{new Date(item.date).toLocaleDateString()}</td>
                            <td className="listing__td">{item.workType?.name}</td>
                            <td className="listing__td">{item.volume}</td>
                            <td className="listing__td">{item.unit}</td>
                            <td className="listing__td">{item.workerName}</td>
                            <td className="listing__td">
                                <button
                                    className="listing__btn listing__btn--delete"
                                    onClick={() => handleDelete(Number(item.id))}
                                >
                                    Удл.
                                </button>
                                <button
                                    className="listing__btn listing__btn--edit"
                                    onClick={() => navigate(`/reference-form/${item.id}`)}
                                >
                                    Ред.
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Listing;