import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-modal';
import { ListGroup } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
let debounceId = null
export default function AllContacts() {
    const [modalShow, setModalShow] = useState(true)
    const [contacts, setContacts] = useState([])
    const [search, setSearchHandler] = useState('')
    const [delaySearch, setDelaySearch] = useState('')
    const [checked, setChecked] = useState(false)
    const [currentpage, setCurrentPage] = useState(1)

    const navigate = useNavigate()
    useEffect(() => {
        debounceId = setTimeout(() => {
            setDelaySearch(search);
        }, 2000);

        return () => {
            clearTimeout(debounceId);
        };
    }, [search]);


    useEffect(() => {


        axios.get(`https://contact.mediusware.com/api/contacts?page=${currentpage}&search=${delaySearch}`, {

        })
            .then(res => {

                setContacts([...contacts, ...res.data.results])

            })

    }, [delaySearch, currentpage])

    const searchHandler = (e) => {
        setSearchHandler(e.target.value)
    }

    const submitHandler = (e) => {
        clearTimeout(debounceId)
        e.preventDefault()

        setDelaySearch(search)
    }
    const modalHandler = () => {
        navigate('/problem-2')
        setModalShow(!modalShow)

    }
    const checkHandler = () => {
        setChecked(!checked)
    }

    const fetchMoreData = () => {
        console.log('fetching')
        setCurrentPage(currentpage + 1)
    }
    console.log('checked')
    return <Modal
        isOpen={modalShow}

        onRequestClose={modalShow}
        style={customStyles}
    >

        <Link to='/problem-2/all'>
            <button className="btn btn-lg btn-outline-primary" type="button"  >All Contacts</button></Link>
        <Link to='/problem-2/us'>
            <button className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button></Link>
        <button className="btn btn-lg btn-outline-primary" type="button" onClick={modalHandler} >close</button>

        <form onSubmit={submitHandler}>
            <Form.Control type="text" placeholder="Search" style={{ marginTop: '10px' }} value={search} onChange={searchHandler} />
        </form>
        <Form.Check type="checkbox" label="Only even" style={{ marginTop: '10px' }} checked={checked} onChange={checkHandler} />

        <ListGroup style={{ height: '400px', overflowY: 'scroll' }}>
            <InfiniteScroll dataLength={contacts.length} next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
                height={400}
            >
                {contacts?.length > 0 ? contacts.map((contact, index) => {

                    if (checked) {
                        if (contact.id % 2 == 0) {
                            return <ListGroup.Item >
                                {contact.id} {contact.country.name} {contact.phone}
                            </ListGroup.Item>
                        }
                        return null
                    }
                    return <ListGroup.Item >
                        {contact.id} {contact.country.name} {contact.phone}
                    </ListGroup.Item>

                }) : ''}
            </InfiniteScroll>
        </ListGroup>


    </Modal>



}
