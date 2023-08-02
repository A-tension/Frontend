import { Form, Col, Row, Button } from "react-bootstrap";
// import { NavLink, Navigate } from "react-router-dom";
function Join() {
  return (
    <>
      {/* <h1>회의 참여</h1>
      <a>회의 링크 입력</a> */}
      <Form>
        <Form.Group lg as={Row} className="mb-3" controlId="formHorizontalText">
          <Form.Label column sm={2}>
            회의 링크
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              placeholder="회의 링크를 입력하세요"
            />
          </Col>
        </Form.Group>
        <Form.Group lg as={Row} className="mb-3" controlId="formHorizontalText">
          <Form.Label column sm={2}>
            대화명
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              placeholder="대화명을 입력하세요"
            />
          </Col>
        </Form.Group>
        {/* 대기창으로 가는법,,, */}
        <Button type="submit" size="lg" variant="primary">참여</Button>       
        <Button type="reset"size="lg" variant="outline-secondary">취소</Button>
      </Form>
    </>
  );
}

export default Join;
