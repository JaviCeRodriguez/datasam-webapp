import React from "react";
import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";

type CardType = {
  name: string;
  link: string;
};

const CardLink: React.FC<CardType> = ({ name, link }) => {
  return (
    <Card className="py-4" as={Link} href={link} isExternal>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{name}</h4>
        {/* <small className="text-default-500">12 Tracks</small> */}
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
    // <a href={link} target="_blank" rel="noreferrer">
    //   <div>
    //     <h4>{name}</h4>
    //   </div>
    // </a>
  );
};

export default CardLink;
