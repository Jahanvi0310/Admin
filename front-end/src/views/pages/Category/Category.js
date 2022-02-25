import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2'
 import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';




const Category = (props) => {


    const [Cat,setCat]=useState([])

    useEffect(()=>{
            const fetchProduct=async ()=>{
                    var {data}=await axios.get("/CategoryDetails");
                    setCat(data);
                    console.log(data);
            }; 
  
            fetchProduct();
    },[]);




    const { SearchBar } = Search;
    
    
    //   const products = [];
    
    // Cat.map((product)=>(
    //     [
    //         const products = ["id":{product._id}];
    //     ]
    // ))
    
    const columns = [{
      dataField: '_id',
      text: 'Category ID',
      filter: textFilter(),
      sort: true
    }, {
      dataField: 'category',
      text: 'Category Name',
      filter: textFilter(),
      sort: true
    }];


    const {register,handleSubmit,errors}=useForm();
    const onSubmit=async(data)=>
    {
        console.log(data);
        try
        {
            const response=await axios.post("/AddCategory",data);
            Swal.fire({
              title: 'Category Added',
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
    };

   

    

    return (
        <>
           <Form className="input-form py-5" onSubmit={handleSubmit(onSubmit)}>
           
           <div className="col-md-6 offset-md-3">
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        placeholder="Enter category here"
                        autoComplete="off"
                        
                    ref={register({
                        required: "Category is required.",
                        pattern:{
                            value :/^[a-zA-Z]+$/,
                        },  
                        minLength:{
                            value:2,
                            message:"Enter atleast 4 characters",
                        }
                    })}   
                    className={`${errors.category ? 'input-error':''} `}
                    />
                    {errors.category && (
                        <p className="errorMsg">{errors.category.message}</p>

                    )}
                </Form.Group>
                
                <Button varient="primary" type="submit" >Add Category</Button>


                {/* <BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } /> */}


                <ToolkitProvider
           
            keyField="id"
            
            data={ Cat }
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
                    <BootstrapTable data={ Cat } columns={ columns }  filter={ filterFactory() } pagination={ paginationFactory()}
                    { ...props.baseProps }
                   
                    />
                </div>
                )
            }
            
            </ToolkitProvider>
               </div> 

           </Form> 
           {/* <BootstrapTable keyField='id' data={ products } columns={ columns } /> */}
           
           
                    </>
                )
            }

export default Category