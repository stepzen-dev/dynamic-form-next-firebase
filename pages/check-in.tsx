import { Box } from "@material-ui/core";
import React from "react";
import { getEvent } from "../components/lib/api";
import PersonSearch from "../components/personSearch";

export default function CheckIn(event) {
  return (
    <Box component="div" my={2}>
        <PersonSearch 
        eventName={event.event.name}
        />
    </Box>
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
