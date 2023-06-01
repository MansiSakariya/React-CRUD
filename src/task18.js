import React, { useState } from "react";
export function Student() {
    const [info, setInfo] = useState({ fname: "", email: "", psw: "", gen: "", add: "", id: "" });
    const [create, setCreate] = useState((JSON.parse(localStorage.getItem("create"))) || []);
    const [student,setStudent] = useState((JSON.parse(localStorage.getItem("data"))) || []);
    const [isEdit, setIsEdit] = useState(-1);

    function handlechane(e) {
        console.log(e.target)
        let { name, value } = e.target;
        setInfo({ ...info, [name]: value, id: Date.now() })
    }
    function handlesubmit(e) {
        if (isEdit === -1) {
            console.log(e.target)
            setCreate([...create, info])
            localStorage.setItem("create", JSON.stringify([...create, info]));
        }
        else {
            const updateddata = create.map((item, index) => {
                if (index === isEdit) {
                    return info
                }
                return item
            })
            setCreate(updateddata)
            localStorage.setItem("create", JSON.stringify(updateddata));
        }
    }

    // All Checkbox

    const handleAllChange = (e, id) => {
        const { name, checked } = e.target;
        if (name === "select") {
            const allCheck = create.map((value) => {
                return {
                    ...value,
                    isChecked: checked,
                };
            });
            setCreate(allCheck);
        }
        else {
            const updated = create.map((value) => {
                if (value.id === id) {
                    return {
                        ...value,
                        isChecked: checked,
                    };
                }
                return value;
            });
            setCreate(updated);
        }
    };

    //  search
    const handleSearch = (e) => {
        const value = e.target.value

        if (!value) {
            setCreate(student);
              return;
        }

        const update = create.filter((item) => {
            return item.fname?.toLowerCase().includes(value?.toLowerCase());
        });
        setCreate(update);
    }


    const Handledelete = (inx) => {
        console.log(inx.target);
        const deletedata = create.filter((item, index) => index !== inx);
        setCreate(deletedata);
        localStorage.setItem("create", JSON.stringify(deletedata));
    }
    const Handleedit = (idx) => {
        setIsEdit(idx);
        const editdata = create.find((item, index) => index === idx);
        setInfo(editdata);
    }

    const { fname, email, psw, gen, add } = info
    return (
        <>
            <div>
                <label htmlFor="fname">Full Name:</label>
                <input type="text" id="fname" name="fname" value={fname} onChange={handlechane} /><br /><br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handlechane} /><br /><br />
                <label htmlFor="psw">Password:</label>
                <input type="password" id="psw" name="psw" value={psw} onChange={handlechane} /><br /><br />
                <label htmlFor="gen">Gender:</label>
                <input type="radio" id="female" name="gen" value="female" onChange={handlechane} />Female
                <input type="radio" id="male" name="gen" value="male" onChange={handlechane} />Male
                <input type="radio" id="other" name="gen" value="other" onChange={handlechane} />Other<br /><br />
                <label htmlFor="add">Address:</label>
                <input type="text" id="add" name="add" value={add} onChange={handlechane} /><br /><br />
                <button type="button" onClick={handlesubmit}>SUBMIT</button><br/><br/>
                <input type="text" className="search" onKeyUp={(e) => handleSearch(e)} />
            </div>
            
            <table>
                <thead>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Del. Btn</th>
                    <th>Edit Btn</th>
                    <th><input type="checkbox" name="select" checked={create.every((value) => value?.isChecked)} onChange={handleAllChange} /></th>
                </thead>
                <tbody>
                    {create.map((item, index) => {
                        const { fname, email, psw, gen, add } = item
                        return (
                            <tr>
                                <td>{fname}</td>
                                <td>{email}</td>
                                <td>{psw}</td>
                                <td>{gen}</td>
                                <td>{add}</td>
                                <td><button type="button" onClick={() => Handledelete(index)}>Delete</button></td>
                                <td><button type="button" onClick={() => Handleedit(index)}>Edit</button></td>
                                <td><input type="checkbox" name={item.fname} checked={item.isChecked} onChange={(e) => handleAllChange(e, item.id)} /> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}