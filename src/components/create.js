import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
    Divider,
    Stack,
    Text,
    Container,
    Box,
    HStack,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Image,
    Heading,
    SimpleGrid,
    Badge,
    Link,
    Center,
} from "@chakra-ui/react";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        status: "",
        estimatedSaleAmount:  NaN,
        estimatedCommission:  NaN,
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        const pattern = new RegExp("^\\S+@\\S+$");

        if(pattern.test(newPerson.email)){
            var hold= await fetch("http://localhost:3306/record", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            })
                .catch(error => {

                    window.alert(error);
                    return;
                });
            if(!hold.ok){
                window.alert( " You're missing fields ");
                navigate("/create");
            }else{

                setForm({  name: "",
                    email: "",
                    status: "",
                    estimatedSaleAmount:  NaN });
                navigate("/");}

        }else{
            window.alert("Please enter valid email ");
        }

    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
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
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}