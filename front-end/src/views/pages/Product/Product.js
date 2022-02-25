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


const Products = (props) => {
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


    const [products,setProducts]=useState([])

    useEffect(()=>{
            var fetchProduct=async ()=>{
                    var {data}=await axios.get("/ProductDetails");
                    setProducts(data);
                    console.log(data);
            }; 
  
            fetchProduct();
    },[]);
    
    const [newUser,setNewAuthor]=useState([])

    useEffect(()=>{
        var photo=async()=>{
              photo= '';
            };
            photo();
        },[]);

    const { SearchBar } = Search;
    
    
    //  const products = [{"id":"1","name":"ABC","price":100},{"id":"2","name":"pac","price":20},{"id":"3","name":"aac","price":40}];

    const columns = [{
        dataField: 'id',
        text: 'Product ID',
        filter: textFilter(),
        sort: true
      }, {
        dataField: 'category',
        text: 'Category Name',
        filter: textFilter(),
        sort: true
      },{
        dataField: 'subcategory',
        text: 'SubCategory Name',
        filter: textFilter(),
        sort: true
      },{
        dataField: 'productname',
        text: 'Product Name',
        filter: textFilter(),
        sort: true
      }, {
        dataField: 'price',
        text: 'Product Price',
        filter: textFilter(),
        sort: true
      }, {
        dataField: 'quantity',
        text: 'Quantity',
        filter: textFilter(),
        sort: true
      },{
        dataField: 'description',
        text: 'Description',
        filter: textFilter(),
        sort: true
      },];
     
     

    const onSubmit=async(data)=>
    {
        const formData = new FormData();
        formData.append('photo', newUser.photo);

        console.log(data);
        try
        {
            await axios.post("/AddProduct",data);
            Swal.fire({
                title: 'Product Added',
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
    // const handleSubmit = () => {
    //     const formData = new FormData();
    //     formData.append('photo', newUser.photo);

    // }



    const handlePhoto = (e) => {
        setNewAuthor({...newUser, photo: e.target.files[0]});
        // console.log("helloooooo"+(e.target.files));
        // axios.post('', e.target.files)
        // .then(res => {
        //    console.log(res);
        // })
        // .catch(err => {
        //    console.log(err);
        // });
    }







    return (
        <>
            <Form className="input-form py-5" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <div className="col-md-8 offset-md-2">
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
                    //  {/* <option value={"Men"}>Men</option>
                    // <option value="Women">Women</option>
                    // <option value="Children">Children</option> */}
                ]
                        ))}
                    
                    
                </Form.Control>
                   {errors.category && (
                        <p className="errorMsg">{errors.category.message}</p>
                    )}     
                    
                </Form.Group>
                <Form.Group className="mb-3" controlId="subcategory">
                    <Form.Label>SubCategory</Form.Label>
                    <Form.Control
                        as="select"
                        name="subcategory"
                        ref={register({
                        required: "Category is required.",  
                    })}   
                    className={`${errors.subcategory ? 'input-error':''} `}
                    >
                    {SubCat.map((product)=>( 
                            [
                   
                    <option value={product.subCategory}>{product.subCategory}</option>
                    //  {/* <option value={"Men"}>Men</option>
                    // <option value="Women">Women</option>
                    // <option value="Children">Children</option> */}
                ]
                        ))}
                    
                    
                </Form.Control>
                   {errors.subcategory && (
                        <p className="errorMsg">{errors.subcategory.message}</p>
                    )}     
                    
                </Form.Group>
                <Form.Group className="mb-3" controlId="productname">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="productname"
                        placeholder="Enter Product Name here"
                        autoComplete="off"
                        ref={register({
                        required: "Product Name is required.",
                        pattern:{
                            value :/^[a-zA-Z]+$/,
                        },  
                        minLength:{
                            value:2,
                            message:"Enter atleast 2 characters",
                        }
                    })}   
                    className={`${errors.productname ? 'input-error':''} `}
                    />
                    {errors.productname && (
                        <p className="errorMsg">{errors.productname.message}</p>
                    )}
                        

                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        name="price"
                        placeholder="Enter Price here"
                        autoComplete="off"
                        ref={register({
                        required: "Price is required.",
                        pattern:{
                            value :/^[0-9]+$/,
                        },  
                        minLength:{
                            value:1,
                            message:"Enter atleast 1 characters",
                        }
                    })}   
                    className={`${errors.price ? 'input-error':''} `}
                    />
                    {errors.price && (
                        <p className="errorMsg">{errors.price.message}</p>
                    )}
                        

                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="text"
                        name="quantity"
                        placeholder="Enter Quantity here"
                        autoComplete="off"
                        ref={register({
                        required: "Quatity is required.",
                        pattern:{
                            value :/^[0-9]+$/,
                        },  
                        minLength:{
                            value:1,
                            message:"Enter atleast 1 characters",
                        }
                    })}   
                    className={`${errors.quantity ? 'input-error':''} `}
                    />
                    {errors.quantity && (
                        <p className="errorMsg">{errors.quantity.message}</p>
                    )}
                        

                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        placeholder="Enter Description Name here"
                        autoComplete="off"
                        ref={register({
                        required: "Description is required.",
                        pattern:{
                            value :/^[a-zA-Z0-9]+$/,
                        },  
                        minLength:{
                            value:10,
                            message:"Enter atleast 10 characters",
                        }
                    })}   
                    className={`${errors.description ? 'input-error':''} `}
                    />
                    {errors.description && (
                        <p className="errorMsg">{errors.description.message}</p>
                    )}
                        
                <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

                </Form.Group>


                {/* <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p> 
					 <p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div> 
			) : (
				<p>Select a file to show details</p>
			)}
			<div> 
				<button onClick={handleSubmit}>Submit</button>
			</div>
		 */}
                
                <Button varient="primary" type="submit" >Add Products</Button>

                <ToolkitProvider
           
           keyField="id"
           
           data={ products }
        //    data={products.map((singlecat2)=>
        // [
        //     {"id":"singlecat2._id","C-name":"singlecat2.category","S-name":"singlecat2.subcategory"}
        // ])}
           columns={ columns }
           search
          
           >
           {
               props => (
               <div className="mt-3">
                   
                   {/* <h3>Input something at below input field:</h3> */}
                   <SearchBar  { ...props.searchProps } />
                   <hr />
                   <BootstrapTable   filter={ filterFactory() } pagination={ paginationFactory()}
                   { ...props.baseProps }
                  
                   />
               </div>
               )
           }
           </ToolkitProvider>
</div>
                {/* </div>   */}
           </Form> 
        </>
    )
}

export default Products