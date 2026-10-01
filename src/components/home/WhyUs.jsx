import { whyChooseUs } from "@/data/site";
import SectionHead from "@/components/common/SectionHead";
import { Col, Container, Row } from "react-bootstrap";
import { BadgePercent, Headphones, ShieldCheck, Compass } from "lucide-react";

const listIcon = [BadgePercent, Headphones, ShieldCheck, Compass];

export default function WhyUs() {
  return (
    <section className="section">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={6}>
            <Row className="g-3">
              <Col
                xs={6}
                className="d-flex flex-column justify-content-between gap-3 why-left-images"
              >
                <img
                  src="/images/why-choose-1.webp"
                  alt="Resort stay"
                  className="rounded-top-pill w-100 object-fit-cover"
                  style={{ height: "230px" }}
                />
                <img
                  src="/images/why-choose-2.webp"
                  alt="Travel luggage"
                  className="rounded-bottom-pill w-100 object-fit-cover"
                  style={{ height: "230px" }}
                />
              </Col>
              <Col xs={6}>
                <img
                  src="/images/why-choose-3.webp"
                  alt="Destination landmark"
                  className="rounded-top-pill rounded-bottom-pill w-100 object-fit-cover"
                  style={{ height: "480px" }}
                />
              </Col>
            </Row>
          </Col>

          <Col lg={6}>
            <SectionHead
              eyebrow="Why Meera"
              WrapperClass={"m-0"}
              title="A travel agency that still picks up"
              text="Tired of waiting on automated phone queues? We believe great travel still begins with human connection. At Meera, you get verified stays, tailored packages, and a dedicated team that is always just a phone call away."
            />

            <Row className="g-3 mt-2">
              {whyChooseUs.map((item, index) => {
                const IconComponent = listIcon[index] || Compass;

                return (
                  <Col sm={6} key={item.id || index}>
                    <article className="p-3 bg-white shadow-card rounded-4 w-100 h-100 d-flex align-items-center gap-3 border border-light">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 icon-badge icon-badge--primary"
                      >
                        <IconComponent size={22} strokeWidth={2.2} />
                      </div>
                      <div>
                        <h3 className="fs-5 fw-semibold m-0 text-dark">
                          {item.title}
                        </h3>
                        {/* {item.text && (
                          <p className="text-muted small m-0 mt-1 line-clamp-2">
                            {item.text}
                          </p>
                        )} */}
                      </div>
                    </article>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
