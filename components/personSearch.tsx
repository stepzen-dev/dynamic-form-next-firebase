import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import { useState } from "react";
import EmailIcon from "@material-ui/icons/Email";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import { Box } from "@material-ui/core/";
import { useRouter } from "next/router";
import { useDispatchContext } from "./State/AppContext";
import axios from 'axios'

function PersonSearch(props) {
  const router = useRouter();
  const [person, setPerson] = useState({
    name: "",
    email: "",
    id: "",
  });
  const dispatch = useDispatchContext();
  const updateField = (e) => {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });

    // console.log([e.target.name], e.target.value);
  };

  async function processCall() {
    console.log('person', person)
    let queryPerson = `
        query MyQuery {
          firebase_person(email: "${person.email}") {
            events {
              name
              location
              id
              form_fields {
                type
                label
                field
              }
            }
          }
        }   
      `
    let bodyLob = { query: queryPerson }

    await axios.post('/api/graphql', bodyLob).then((res) => {
      let person = res.data.data.data.firebase_person
      console.log('person', person)
      dispatch({
        type: "PROCESS",
        person: person,
      });
      
      if(person.events[0] === null) {
        router.push("/newvisitor");
      } else {
        router.push("/customform");
      }
    })
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="3vw"
      ml="5%"
      mr="5%"
    >
      <h3>Welcome to the {props.eventName}!</h3>
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
      >
        <form className="recovery-form">
          <div className="column">
            <div className="row_2">
              {" "}
              <label className="form-label" style={{ display: "inline-block" }}>
                Email address <span className="text-danger">*</span>
              </label>
              <div>
                <Input
                  name="email"
                  id="input_email"
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon style={{ color: "#8BC3E2" }} />
                    </InputAdornment>
                  }
                  value={person.email || ""}
                  onChange={updateField}
                />
              </div>
            </div>
            <br />

            <Box display="flex" justifyContent="center" alignItems="center">
              <Button variant="contained" onClick={processCall}>
                Check In
              </Button>
            </Box>
          </div>
        </form>
      </Box>
      <br /> <br />
      <Link href="/" passHref={true}>
        <Button variant="contained">
          <HomeIcon />
        </Button>
      </Link>
    </Box>
  );
}

export default PersonSearch;
