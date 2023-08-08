import React, { useEffect, useState } from "react";
import {  ListGroup, Col, Row } from "react-bootstrap";

interface Props {
    groupId?: number;
    groupName?: string;
}

export const Members = (props: Props) => {
    const [members, setMembers] = useState<string[]>([]);

    useEffect(() => {
        // 여기에 그룹원 정보를 가져오는 axios.get 또는 다른 로직을 추가
        // 예를 들어, axios.get(`/api/group/${props.groupId}/members`)
        // 그리고 가져온 데이터를 setMembers로 업데이트

        // 임시 데이터로 대체
        setMembers([props.groupName + "one", props.groupName + "two", props.groupName + "three" , props.groupName + "four"
            , props.groupName + "five", props.groupName + "six"]);
    }, [props.groupId, props.groupName]);

    const memberItems = members.map((memberName, index) => (
        <ListGroup.Item
            key={index}
            style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "6px",
                padding: "10px",
                marginBottom: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
        >
            {memberName}
        </ListGroup.Item>
    ));

    return (
        <Row>
            <Col md={8}>
                <h1> {props.groupName}</h1>
                <ListGroup>{memberItems}</ListGroup>
            </Col>
            <Col md={4}>
                <div
                    style={{
                        backgroundColor: "#f7f7f7",
                        borderRadius: "10px",
                        padding: "70px",
                        marginTop: "10px",
                        marginBottom : "10px",
                        border: "0.5px solid black",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <p>
                        <strong>그룹 정보</strong>
                        <br />
                        그룹에 대한 정보 담기
                    </p>
                </div>
            </Col>
        </Row>
    );
};

export default Members;
