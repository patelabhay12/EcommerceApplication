import React from 'react'

const CategoryForm = ({ hanldeSubmit, value, setValue }) => {
    
    return (
        <>
            <form onSubmit={hanldeSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Enter new Categoy' value={value} onChange={(e)=>{setValue(e.target.value)}} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm;