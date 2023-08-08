import React from "react";
import { Card, CardHeader, CardBody, Image, Link } from "@nextui-org/react";

type CardType = {
  name: string;
  link: string;
  image: string;
  description: string;
};

const CardLink: React.FC<CardType> = ({ name, link, image, description }) => {
  return (
    <Card className="py-2" as={Link} href={link} isExternal>
      <CardBody className="flex flex-row gap-5">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={40}
        />
        <div className="flex flex-col">
          <h4 className="text-md">{name}</h4>
          <p className="text-small text-default-500">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardLink;
