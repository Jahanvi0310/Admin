import {React} from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
// import {BrowserRouter as Router,Route} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

const Login = (props) => {
  
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async(data) => {
    // console.log(data); 

        try
        {
            const response= await axios.post("/logindetails",data)
            //  console.log(response);  
           Swal.fire({
            title: 'Login Successful',
            //text: 'You will not be able to recover this imaginary file!',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer:2000
           }).then(
             (result)=>{
               
                if (result.isConfirmed || result.isDismissed) {
                  props.history.push('/userLogin');
                }
             }
             );

        }  
        catch (error) {
           
           //console.log("fcrdfc");
           //console.log("gg"+error.response);
          if (error.response) {
            //console.log('error', error.response.data);
            //setErrorMessage(error.response.data);
            // console.log("dfvdfvd");
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: error.response.data
            });
          }
        }
        
    
      };

    

 


  return (
  
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6 offset-md-3 mt-5">
  
        <Form.Group controlId="user_name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="user_name"
            placeholder="Enter your username"
            autoComplete="off"
            ref={register({
              required: 'Username is required.',
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Username can contain characters and'
              }
            })}
            className={`${errors.user_name ? 'input-error' : ''}`}
          />
          {errors.user_name && (
            <p className="errorMsg">{errors.user_name.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="pass">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="pass"
            placeholder="Enter your password"
            autoComplete="off"
            ref={register({
              required: 'Password is required.',
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Password can contain characters and numbers.'
              }
            })}
            className={`${errors.pass ? 'input-error' : ''}`}
          />
          {errors.pass && (
            <p className="errorMsg">{errors.pass.message}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Login;