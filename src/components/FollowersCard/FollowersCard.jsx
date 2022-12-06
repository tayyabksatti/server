import React from 'react'
import './FollowersCard.css'
import User from '../User/User'
import { getAllUser } from '../../api/UserRequest'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Logo from '../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import '../LogoSearch/LogoSearch.css'

const FollowersCard = () => {
    let [persons, setPersons] = useState([])
    let { user } = useSelector((state) => state.authReducer.authData)
    let [persons2, setPersons2] = useState(persons)
    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUser();
            setPersons(data)
            setPersons2(data);
        };
        fetchPersons()
    }, []);

    const handleSearch = () => {
        let usernam = document.getElementById("inputsearch").value.trim();
        if (usernam !== "") {
            persons2 = persons2.filter((person) => person.username === usernam);
            setPersons2(persons2);
        }
        else if (usernam === "")
            setPersons2(persons);
    }

    return (
        <div className="FollowersCard">
            <div className='LogoSearch'>
                <img src={Logo} alt=""></img>
                <div className='Search'>
                    <input type="text" placeholder='#Seach Veterans' id="inputsearch" />
                    <div className='s-icon' onClick={handleSearch}>
                        <UilSearch />
                    </div>
                </div>
            </div>
            <h3>People You May Know</h3>

            {persons2.map((person, id) => {
                if (person._id !== user._id) {
                    return <User person={person} key={id} />;
                }
            })}
        </div>
    )
}

export default FollowersCard