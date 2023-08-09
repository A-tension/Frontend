import React from "react";
import { Button, Card } from "react-bootstrap";

function Plans() {
    return (
        <>
            <Card
                style={{
                    border: "none",
                    marginTop: "-5px",
                    padding: "10px",
                    borderRadius: 0,
                }}
            >
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Button
                        variant="primary"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            borderRadius: "8px",
                        }}
                    >
                        일정 추가
                    </Button>
                </div>

                {/* ... 이전 내용 ... */}
                <div>
                    <div
                        style={{
                            backgroundColor: "#f7f7f7",
                            borderRadius: "6px",
                            padding: "10px",
                            marginBottom: "10px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* 일정 추가 내용 1 */}
                        추가 내용 1
                    </div>
                    <div
                        style={{
                            backgroundColor: "#f7f7f7",
                            borderRadius: "6px",
                            padding: "10px",
                            marginBottom: "10px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* 일정 추가 내용 2 */}
                        추가 내용 2
                    </div>
                    <div
                        style={{
                            backgroundColor: "#f7f7f7",
                            borderRadius: "6px",
                            padding: "10px",
                            marginBottom: "10px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* 일정 추가 내용 3 */}
                        추가 내용 3
                    </div>
                    <div
                        style={{
                            backgroundColor: "#f7f7f7",
                            borderRadius: "6px",
                            padding: "10px",
                            marginBottom: "10px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* 일정 추가 내용 4 */}
                        추가 내용 4
                    </div>
                </div>
            </Card>
        </>
    );
}

export default Plans;
