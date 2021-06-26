import React, { useState } from 'react'

export default function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            {/* <input type='text' placeholder='Search...'
                onChange={(e) => setSearchTerm(e.target.value)} />
            {JSON_DATA.filter((value) => {
                if (value.first_name.toLowerCase().includes(searchTerm.toLowerCase())) return value
            }
            ).map((value, key) => {
                return <div className='user' key={key}>
                    {value.first_name}
                </div>
            })

            } */}


        </div>
    )
}
