import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
const Problem1 = () => {

    const [datas, setDatas] = useState([]);
    const [values, setValues] = useState({ name: '', status: '' })
    const [show, setShow] = useState('all');

    const handleClick = (val) => {
        setShow(val);
    }


    const changeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {

        e.preventDefault();
        let data = { ...values, id: uuid() }
        setDatas([...datas, data])
        setValues({ name: '', status: '' })

    }
    let filterDataByStatus = (allData) => {

        if (show === 'active') {
            allData = datas.filter(data => data.status.toLowerCase() === 'active')
        }
        if (show === 'completed') {
            allData = datas.filter(data => data.status.toLowerCase() === 'completed')
        }
        return allData;
    }

    const sortData = (data) => {
        if (show == 'all') {
            let allActiveData = datas.filter(data => data.status.toLowerCase() === 'active')
            let allCompletedData = datas.filter(data => data.status.toLowerCase() === 'completed')
            let othersData = datas.filter(data => data.status.toLowerCase() !== 'active' && data.status.toLowerCase() !== 'completed')
            return [...allActiveData, ...allCompletedData, ...othersData]

        }
        return data;
    }
    const showData = () => {

        let allData = sortData(filterDataByStatus(datas.slice()))
        return allData.map(data => <tr key={data.id}>
            <td scope="col">{data.name}</td>
            <td scope="col">{data.status.toLowerCase()}</td>
        </tr>)
    }
    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={submitHandler}>
                        <div className="col-auto">
                            <input type="text" className="form-control" value={values.name} placeholder="Name" name='name' required onChange={changeHandler} />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" value={values.status} placeholder="Status" name='status' required onChange={changeHandler} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showData()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;