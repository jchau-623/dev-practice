import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createSpot } from '../../store/spots';

export default function OverviewPage  ()  {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice ] = useState('')
// Address first
// Guests, Bedrooms, Beds,Bathrooms
// amenities
// photos aws
    useEffect(() => {
        setShowErrors(false)
        const errors = []
        if (!address) errors.push("Every note needs a heading")
        if (!description) errors.push("Please provide a description")
        if (heading.length > 20) errors.push("Your heading is too long!")
        if (description.length > 2200) errors.push('Your body is too long!')
        if (errors) setErrors(errors)
    }, [heading, description])
    return (
        <div>
            <h1>Create Spot - Overview Page</h1>
            {/* Add form or components for creating a spot */}
        </div>
    );
};
