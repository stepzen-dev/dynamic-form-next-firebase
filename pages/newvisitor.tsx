import { Box } from "@material-ui/core";
import React from "react";
import { getEvent } from "../components/lib/api";
import { Data } from "../components/lib/types";
import { NewForm } from "../components/NewForm";
import Header from "../components/Header";

export interface customformProps {
  formData: Record<string, string | boolean>;
  formFields: String[];
  onChange: (value: Record<string, string | boolean>) => void;
}
export default function NewVisitor(event) {
  const info: Data = {
    form_data: {},
  };

  
  const [formState, setFormState] = React.useState(info.form_data);
  const handleFormChanged = (value: Record<string, string | boolean>) => {
    setFormState(value);
  };
  
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
          <NewForm
            formData={formState}
            formFields={event.event.form_fields}
            onChange={handleFormChanged}
          />
        </Box>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const event = await getEvent();

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: event,
    },
  };
}
