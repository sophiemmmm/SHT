import React from 'react';
import { createForm } from "@createform/react";
import { z } from "zod";
import styled from "styled-components";

const FormWrapper = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.form`
  margin-top: 20px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const SubmitButton = styled.button`
  background-color: darkseagreen;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.5s ease; // transitioning time

  &:hover {
    background-color: darkkhaki;
  }
`;

const validationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    age: z.number().min(18, "You must be at least 18 years old to register."), // Validation for age
    terms: z.boolean(),
});


const useForm = createForm({
    initialValues: {
        name:"",
        email: "",
        password: "",
        terms: false,
    },
    mode: "onChange",
    validationSchema: validationSchema,
});

function RegistrationForm() {
    const { register, state } = useForm();
    const { errors, touched } = state;

    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <FormWrapper>
            <h2>Create an Account</h2>
            <FormContainer onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="name">Enter your name:</Label>
                    <InputField
                        id="name"
                        {...register({
                            name: "name",
                            type: "name",
                            placeholder: "Enter your name here",
                            required: true,
                        })}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email:</Label>
                    <InputField
                        id="email"
                        {...register({
                            name: "email",
                            type: "email",
                            placeholder: "Enter your email here",
                            required: true,
                        })}
                    />
                </div>

                <div>
                    <Label htmlFor="age">Age:</Label>
                    <InputField
                        id="age"
                        {...register({
                            name: "age",
                            type: "number", // Use type "number" instead of "age"
                            placeholder: "Enter your age",
                            required: true,
                        })}
                    />
                </div>

                <div>
                    <Label htmlFor="password">Password:</Label>
                    <InputField
                        id="password"
                        {...register({
                            name: "password",
                            type: "password",
                            placeholder: "Enter your password ****",
                            required: true,
                        })}
                    />
                    {touched.password && errors.password && (
                        <span style={{color: "blue"}}>Entered password must be at least 5 characters! </span>
                    )}
                </div>
                <div>
                    <InputField
                        id="terms"
                        {...register({
                            name: "terms",
                            type: "checkbox",
                            required: true,
                        })}
                    />
                    <Label htmlFor="terms">I agree to the terms and conditions</Label>
                </div>
                <SubmitButton type="submit">Register your new Account</SubmitButton>
            </FormContainer>
        </FormWrapper>
    );
}

export default RegistrationForm;
