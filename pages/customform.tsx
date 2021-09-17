import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getEvent } from "../components/lib/api";
import { Data } from "../components/lib/types";
import { NewForm } from "../components/NewForm";
import { useAppContext } from "../components/State/AppContext";
import Header from "../components/Header";

export interface customformProps {
  formData: Record<string, string | boolean>;
  formFields: String[];
  onChange: (value: Record<string, string | boolean>) => void;
}
export default function CustomForm(fields) {
  const info: Data = {
    form_data: {},
  };
  const contexto = useAppContext();
  const person_details = contexto.person;

  useEffect(() => {
    return () => {};
  }, [contexto.processed]);

  
  const [formState, setFormState] = React.useState(info.form_data);
  const handleFormChanged = (value: Record<string, string | boolean>) => {
    setFormState(value);
  };
  
  if (!person_details) return null
  
  console.log('fields', fields)
  console.log('person_details', person_details)

  let existingFields = []
  let personalEvents = person_details.events
  for (let i = 0; i < personalEvents.length; i++) {
    let personalFields = personalEvents[i].form_fields
    for (let i = 0; i < personalFields.length; i++) {
      existingFields.push(personalFields[i].field)
    }
  }

  let newFields = []
  let exampleFields = fields.fields.form_fields
  for (let i = 0; i < exampleFields.length; i++) {
    newFields.push(exampleFields[i].field)
  }
  
  const setFields = newFields.filter(value => !existingFields.includes(value))
  let finalFields = []
  if (setFields.length > 0) { 
    for (let i = 0; i < setFields.length; i++) {
      finalFields.push(exampleFields.find(o => o.field === setFields[i]));
    }
  }

  function countProps(obj) {
    var count = 0;
    for (var p in obj) {
      obj.hasOwnProperty(p) && count++;
    }
    return count; 
  }

  let eventCount = countProps(person_details.events)
  
  return (
    <div>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="3vw"
        ml="5%"
        mr="5%"
      >
        <h3>You've been to {eventCount} hackathons.</h3>
        <h3>A few more and you will get a prize!</h3>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={4}
          width="100%"
          padding="3vw"
          lineHeight={2}
          border="1px solid rgba(0, 0, 0, 0.125)"
          borderRadius="0.25rem"
          boxShadow={6}
          bgcolor="#bac999"
        >
      {setFields.length === 0 ?
      <h1>You are done! Here is your QR code</h1>
      : 
      <NewForm
        formData={formState}
        formFields={finalFields}
        onChange={handleFormChanged}
      />
      }
    </Box>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const fields = await getEvent();

  if (!fields) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fields: fields,
    },
  };
}
