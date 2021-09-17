import Head from "next/head";
import { Box } from "@material-ui/core";
import Card from "../components/Card";
import Header from "../components/Header";

export default function Home() {
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
        <Card
          image={"/images/form.png"}
          text={"Check In"}
          hrefTo="/check-in"
        />
      </Box>
    </div>
  );
}
