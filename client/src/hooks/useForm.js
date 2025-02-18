import { useEffect, useState } from 'react'

export function useForm(initialValues, submitCallback , reinitializeForm = false){

    const [values, setValues] = useState(initialValues);

    useEffect(()=>{
        if(reinitializeForm){
            setValues(initialValues)
        }
        
    }, [initialValues, reinitializeForm])
    //add support for checkbox
    const changeHandler = (e) => {
        
        setValues( state => ({
            ...state,
            [e.target.name] : e.target.value
        }))
    }

    const submitHandler = async(e) => {

        e.preventDefault();

       await submitCallback(values);
        setValues(initialValues);
    }

    return {
        values,
        changeHandler,
        submitHandler
    }

}
    
