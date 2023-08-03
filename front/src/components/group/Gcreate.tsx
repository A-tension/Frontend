import {Form,Button,FloatingLabel} from 'react-bootstrap'
const Gcreate =()=>{
    const handleCreate=()=>{
        //axios api put?
    }
    return(
        <>
        <h1>이미지 업로드</h1>
        그룹명
        그룹원 추가하기
        그룹설명

       
        <Form style={{ width: "100%" }}>
            <FloatingLabel label="그룹명">
              <Form.Control type='text' />
            </FloatingLabel>
            <FloatingLabel label="그룹원">
              <Form.Control type="text" defaultValue="그룹원을 추가하세요" />
            </FloatingLabel>
            <FloatingLabel label="그룹 설명">
              <Form.Control

                type="textarea"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
            <Button onClick={handleCreate} variant="primary">그룹생성</Button>
            {/* <Form.Control type="button"readOnly defaultValue="" /> */}
          </Form>
       
        </>
    );
}
export default Gcreate;