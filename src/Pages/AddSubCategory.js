import React, {useState} from 'react';
import SideBar from '../Components/SideBar';

function AddSubCategory() {

    const categories = [
        {
            type: 'active',
            values: [
                { value: 'computerdevices', label: 'Computer Devices' },
                { value: 'householdappliances', label: 'Household Appliances' },
            ]
        }, 
        {
            type: 'passive',
            values: [
                { value: 'furniture', label: 'Furniture' },
                { value: 'officesupplies', label: 'Office Supplies' }
            ]
        }
    ];
    
    const activeCategories = categories.find(category => category.type === 'active').values;
    const passiveCategories = categories.find(category => category.type === 'passive').values;

    const [category, setCategory] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [subCategoryImage, setSubCategoryImage] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    
    const handleSubCategoryNameChange = (event) => {
        setSubCategoryName(event.target.value);
    };
    
    const handleSubCategoryImageChange = (event) => {
        setSubCategoryImage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // tambahkan kode untuk melakukan submit form
    }

    return (
        <div className='App'>
            <div className='add-sub-category-page-container'>
                <div className='navbar-container'>
                    <h1>Add Sub Category</h1>
                    <SideBar/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='form-field'>
                            Category Name
                            <select value={category} onChange={handleCategoryChange} className='select-form'>
                                {activeCategories.map((category) => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className='form-field'>
                            Subcategory Name
                            <input type='text' value={subCategoryName} onChange={handleSubCategoryNameChange} />
                        </label>
                    </div>
                    <div>
                        <label className='form-field'>
                            Subcategory Image
                            <input type='text' value={subCategoryImage} onChange={handleSubCategoryImageChange} />
                        </label>
                    </div>
                    <div>
                    <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
    }
                            
export default AddSubCategory;
