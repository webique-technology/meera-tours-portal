"use client";

import Link from "next/link";
import { siteInfo } from "@/data/site";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { CommonBtn } from "../common/Button";
import { ArrowUpRight } from "lucide-react";

// Reusable motion animation generator
const createFloatMotion = (duration = 2, distance = 15) => ({
  initial: { x: 0 },
  animate: { x: distance },
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
});

export default function CtaBand() {
  return (
    <section className="section cta-bg-sec">
      <Container className="position-relative">
        <Row className="cta-band p-0">
          <Col lg={6} className="cta-content position-relative z-3">
            <div>
              <div className="eyebrow">Travel desk</div>
              <h2 className="display-5 fw-semibold">
                Tell us the dates. We will{" "}
                <span className="text-success">build the rest.</span>
              </h2>
              <p className="lead fs-6">
                Call {siteInfo.phone} or send an enquiry — flights, hotels,
                holidays, buses and visas from one team.
              </p>
              {/* <Link href="/contact" className="btn btn--primary">
                Talk to Meera Tours
              </Link> */}
              <CommonBtn
                rightIcon={<ArrowUpRight size={20} />}
                href="/contact"
                className="commonBtnClass normalBtn--primary"
                normalBtn = "normalBtn"
              >
                Talk to Meera Tours
              </CommonBtn>
            </div>
          </Col>

          <Col lg={6} className="position-relative d-none d-lg-block">
            <div className="position-absolute bottom-0 start-50 translate-middle-x z-3">
              <motion.img
                src="/images/cta-person.webp"
                alt=""
                className="cta-person"
                {...createFloatMotion(2)}
              />
            </div>
            <motion.div className="person-bg-box-1" />
          </Col>
        </Row>

        {/* Bottom floating shape */}
        <div
          className="position-absolute start-50 translate-middle-x z-2"
          style={{ bottom: "85px" }}
        >
          <motion.img
            src="/images/shape.png"
            alt=""
            className="w-100"
            {...createFloatMotion(1)}
          />
        </div>

        {/* Top floating plane banner */}
        <div className="position-absolute top-0 start-50 translate-middle-x z-3">
          <motion.img
            src="/images/plan-bg.webp"
            alt=""
            className="w-100"
            {...createFloatMotion(1.5)}
          />
        </div>
      </Container>
    </section>
  );
}