import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        status: "",
        estimatedSaleAmount: 0.0,
        estimatedCommission: 0.0,
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:3306/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            email: form.email,
            status: form.status,
            estimatedSaleAmount: form.estimatedSaleAmount,


        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:3306/record/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="form-group">
                        <h1 >ID:{form._id} </h1>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">email: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="statusOptions"
                            id="statusProspect"
                            value="Prospect"
                            checked={form.status === "Prospect"}
                            onChange={(e) => updateForm({ status: e.target.value })}
                        />
                        <label htmlFor="positionProspect" className="form-check-label">Prospect</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="statusOptions"
                            id="statusActive"
                            value="Active"
                            checked={form.status === "Active"}
                            onChange={(e) => updateForm({ status: e.target.value })}
                        />
                        <label htmlFor="positionActive" className="form-check-label">Active</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="statusOptions"
                            id="statusUnqualified"
                            value="Unqualified"
                            checked={form.status === "Unqualified"}
                            onChange={(e) => updateForm({ status: e.target.value })}
                        />
                        <label htmlFor="positionUnqualified" className="form-check-label">Unqualified</label>
                    </div>


                </div>
                <div className="form-group">
                    <label htmlFor="name">estimated sale amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="estimated-sale-amount"
                        value={form.estimatedSaleAmount}
                        onChange={(e) => updateForm({ estimatedSaleAmount: e.target.value })}
                    />
                </div>


                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}