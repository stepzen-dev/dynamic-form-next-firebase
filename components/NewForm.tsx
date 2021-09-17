import * as React from "react";
import {
  Box,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { FormField } from "../components/lib/types";

export interface NewFormProps {
  formData: Record<string, string | boolean>;
  formFields: FormField[];
  onChange: (value: Record<string, string | boolean>) => void;
}

export const NewForm: React.FC<NewFormProps> = ({
  formData,
  formFields,
  onChange,
}) => {
  const [formState, setFormState] = React.useState(formData);

  React.useEffect(() => {
    onChange(formState);
  }, [formState]);

  return (
    <form noValidate autoComplete="off">
      {formFields.map((field) => {
        switch (field.type) {
          case "string":
            return (
              <Box component="div" my={3} key={field.field}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label={field.label}
                  variant="outlined"
                  size="small"
                  value={formState[field.field] || ""}
                  onChange={(ev) =>
                    setFormState({
                      ...formState,
                      [field.field]: ev.target.value,
                    })
                  }
                />
              </Box>
            );
          case "number":
            return (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                my={3}
              >
                <Box mr="5%">
                  <label className="form-label">{field.label}</label>
                </Box>
                <Box width="5%">
                  <Input
                    name={field.label}
                    type={field.type}
                    id={field.label}
                    value={formState[field.field] || ""}
                    onChange={(ev) =>
                      setFormState({
                        ...formState,
                        [field.field]: ev.target.value,
                      })
                    }
                  />
                </Box>
              </Box>
            );
          case "boolean":
            return (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mr="0%"
                ml="0%"
                my={3}
              >
                <label className="form-label">{field.label}</label>

                <RadioGroup
                  aria-label={field.field}
                  name={field.field}
                  value={formState[field.field] || ""}
                  onChange={(ev) =>
                    setFormState({
                      ...formState,
                      [field.field]: ev.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Box>
            );
        }
      })}
    </form>
  );
};
