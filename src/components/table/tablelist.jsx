import React from "react";
import Tabledata from './tabledata';

const Tablelist = ({ info, handleRemove, handleEdit }) => {
    return (
        <tbody>
        {
            info.map(item => {
                return (
                        <Tabledata key={item.id} item={item} handleRemove={handleRemove} handleEdit={handleEdit}/>
                )
            })
        }
        </tbody>
    )
}

export default Tablelist;