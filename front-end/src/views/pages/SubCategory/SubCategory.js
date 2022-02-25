import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';



const Subcategory = (props) => {

    const {register,handleSubmit,errors}=useForm();
    const [Cat,setCat]=useState([])

    useEffect(()=>{
            const fetchProduct=async ()=>{
                    var {data}=await axios.get("/CategoryDetails");
                    setCat(data);
                    console.log(data);
            }; 
  
            fetchProduct();
    },[]);

    const [SubCat,setSubCat]=useState([])

    useEffect(()=>{
            const fetchProduct=async ()=>{
                    var {data}=await axios.get("/SubCategoryDetails");
                    setSubCat(data);
                    console.log(data);
            }; 
  
            fetchProduct();
    },[]);


    const { SearchBar } = Search;
    
    
    //   const products = [{"id":"1","name":"ABC","price":100},{"id":"2","name":"pac","price":20},{"id":"3","name":"aac","price":40}];

      const columns = [{
        dataField: '_id',
        text: 'SubCategory ID',
        filter: textFilter(),
        sort: true
      }, {
        dataField: 'category',
        text: 'Category Name',
        filter: textFilter(),
        sort: true
      }, {
        dataField: 'subCategory',
        text: 'SubCategory Name',
        filter: textFilter(),
        sort: true
      }];


    const onSubmit=async(data)=>
    {
        console.log(data);
        try
        {
            await axios.post("/AddSubCategory",data);
            Swal.fire({
                title: 'Sub-Category Added',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                timer:4000
               }).then(
                (result)=>{
                  
                   if (result.isConfirmed || result.isDismissed) {
                     props.history.push('/');
                   }
                }
                );
        }
        catch(error)
        {
            console.log(error);
            if (errors.response) {
                // console.log('error', error.response.data);
                    Swal.fire({
                        icon:'error',
                        title:"Oops... Failed",
                        text:errors.response.data
                    });
                
                }
        }
    }
    return (
        <>
          <Form className="input-form py-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6 offset-md-3">
            
                <>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        ref={register({
                        required: "Category is required.",  
                    })}   
                    className={`${errors.category ? 'input-error':''} `}
                    >
                        {Cat.map((product)=>( 
                            [
                   
                    <option value={product.category}>{product.category}</option>
                    //  {/* <option value={}>Men</option>
                    // <option value="Women">Women</option>
                    // <option value="Children">Children</option> */}
                ]
                        ))}
                </Form.Control>
                   {errors.category && (
                        <p className="errorMsg">{errors.category.message}</p>
                    )}   
                   
                </Form.Group>
                </>  
                
                <Form.Group className="mb-3" controlId="subCategory">
                    <Form.Label>Sub-Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="subCategory"
                        placeholder="Enter Sub-Category here"
                        autoComplete="off"
                        ref={register({
                        required: "Sub-Category is required.",
                        pattern:{
                            value :/^[a-zA-Z]+$/,
                        },  
                        minLength:{
                            value:2,
                            message:"Enter atleast 2 characters",
                        }
                    })}   
                    className={`${errors.subCategory ? 'input-error':''} `}
                    />
                    {errors.subCategory && (
                        <p className="errorMsg">{errors.subCategory.message}</p>
                    )}
                        

                </Form.Group>
                
                <Button varient="primary" type="submit" >Add Sub-Category</Button>

                <ToolkitProvider
           
            keyField="id"
            
            data={ SubCat }
            columns={ columns }
            search
            // pagination={ paginationFactory()}
            >
            {
                props => (
                <div className="mt-3">
                    
                    {/* <h3>Input something at below input field:</h3> */}
                    <SearchBar  { ...props.searchProps } />
                    <hr />
                    <BootstrapTable data={ SubCat } columns={ columns }  filter={ filterFactory() } pagination={ paginationFactory()}
                    { ...props.baseProps }
                   
                    />
                </div>
                )
            }
            </ToolkitProvider>


               </div> 
           </Form> 

        </>
    )
}

export default Subcategory
