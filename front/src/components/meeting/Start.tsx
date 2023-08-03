import { Form, Row, Col, Button } from "react-bootstrap";

function Start() {
  return (
    <>
      {/* <h1>회의 개설 </h1>
      <a>
        회의 시작 시간, 제목, 구성원 입력
      </a> */}
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
          <Form.Label column sm={2}>
            제목
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              type="email"
              placeholder="방 제목을 입력하세요"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
          <Form.Label column sm={2}>
            날짜
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              type="date"
              placeholder=""
              className="input-border-radius-lg"
              form="rounded"
            />
          </Col>
          <Form.Label column sm={2}>
            시간
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              type="time"
              placeholder=""
              className="rounded-9"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            초대
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              type="email"
              accept="multiple"
              placeholder=""
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="대기실" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10 }}>
            <Button type="submit">생성</Button>
            <Button type="reset" variant="outline-primary">
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default Start;
