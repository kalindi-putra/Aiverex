"use client";
import React from "react";
import { Card, Button } from "antd";
import { useRouter } from 'next/navigation';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./ViolationLimitedExceeded.module.css";

const ViolationLimitedExceeded = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.push('/student/dashboard'); 
  };
  return (
    <div className={styles["violation-container"]}>
      <Card className={styles["violation-card"]}>
        <div className={styles["icon-wrapper"]}>
          <ExclamationCircleOutlined style={{ fontSize: "64px", color: "#ff4d4f" }} />
        </div>
        <h2>You have reached the maximum violation limit</h2>
        <p>
          Due to repeated violations, your test session has been locked. This is to ensure the integrity and fairness of the examination process.
        </p>
        <Button type="primary" className={styles["violation-go-back-button"]} onClick={handleGoBack} style={{ marginTop: "20px" }}>
          Go Back to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default ViolationLimitedExceeded;
