"use client";
import SmartImage from "@/components/common/SmartImage";
import { formatINR } from "@/utils/format";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import { CommonBtn, FaveHeartButton } from "../common/Button";
import { Heart, ArrowUpRight } from "lucide-react";
// href={`/holiday-packages?destination=${encodeURIComponent(item.name)}`}

export default function DestinationCard({ item }) {
  return (
    <Card className="border-0 h-100 d-flex gap-3 p-3 rounded-4 hover-card">
      <div className="card-3d__media rounded-4 overflow-hidden">
        <SmartImage
          src={item.image}
          alt={item.name}
          sizes="(max-width: 800px) 100vw, 33vw"
        />
        <FaveHeartButton
          onToggle={(liked) =>
            console.log(
              liked === false
                ? { name: item.name, liked }
                : { item: item, name: item.name, liked },
            )
          }
        />
        <div className="absolute-badge p-2 rounded-top-4 bg-warning position-absolute bottom-0 start-50 translate-middle-x">
          <Row className="position-relative">
            <Col className="text-center border-end border-white">
              <span className="">{item.country}</span>
            </Col>
            {/* <span
              className="bg-light d-inline-block position-absolute bottom-0 start-50 translate-middle-x"
              style={{ width: "1px", height: "24px" }}
            ></span> */}
            <Col className="text-center">
              <span>{item.packages} packages</span>
            </Col>
          </Row>
        </div>
      </div>
      <CardBody className="p-0">
        {/* <Card.Text className="card-3d__meta">
          <span className="chip">{item.country}</span>
          <span>{item.packages} packages</span>
        </Card.Text> */}
        <Card.Title>{item.name}</Card.Title>
        <Card.Text className="lead mb-2">{item.tagline}</Card.Text>
        <Card.Text className="d-flex align-items-center justify-content-between border-top pt-2">
          <span className="price">
            {formatINR(item.startingPrice)}
            <small>starting fare</small>
          </span>
          <CommonBtn
            className={"smallBtn"}
            rightIcon={<ArrowUpRight size={15} />}
            href={`/holiday-packages?destination=${encodeURIComponent(item.name)}`}
          >
            Book now
          </CommonBtn>
        </Card.Text>
      </CardBody>
    </Card>
  );
}
