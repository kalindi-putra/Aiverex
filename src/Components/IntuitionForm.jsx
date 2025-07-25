"use client";
import React , {useState} from 'react'
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const IntuitionForm = ({ onSubmit }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showFormModal = () => {
        setVisible(true);
    };

    const handleIntuitionCancel = () => {
        setVisible(false);
    };

    const handleIntuitionSubmit = (values) => {
        onSubmit(values);
        setVisible(false);
        form.resetFields();
    };


    return (
        <div>
            <Button type="primary" style={{backgroundColor:`var(--codeEditor-intuition-button-color)`}} onClick={showFormModal}>
                <PlusOutlined style={{color:'white'}} />
                Outline Thinking
            </Button>

            <Modal
                title="Submit Your Intuition"
                open={visible}
                onCancel={handleIntuitionCancel}
                onOk={() => form.submit()}
                okText="Submit"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleIntuitionSubmit}
                >
                    <Form.Item
                        label="Time Complexity"
                        name="timeComplexity"
                        rules={[{ required: true, message: "Please input time complexity!" }]}
                    >
                        <Input placeholder="e.g. O(n log n)" />
                    </Form.Item>

                    <Form.Item
                        label="Space Complexity"
                        name="spaceComplexity"
                        rules={[{ required: true, message: "Please input space complexity!" }]}
                    >
                        <Input placeholder="e.g. O(n)" />
                    </Form.Item>

                    <Form.Item
                        label="Data Structures Used"
                        name="dataStructures"
                        rules={[{ required: true, message: "Please list data structures used!" }]}
                    >
                        <Input placeholder="e.g. HashMap, Array" />
                    </Form.Item>

                    <Form.Item
                        label="Algorithms Used"
                        name="algorithms"
                        rules={[{ message: "Please list algorithms used!" }]}
                    >
                        <Input placeholder="e.g. Greedy, BFS" />
                    </Form.Item>

                    <Form.Item
                        label="Explanation of the Intuition"
                        name="explanation"
                        rules={[{ required: true, message: "Please explain your intuition!" }]}
                    >
                        <Input.TextArea rows={4} placeholder="Write your explanation here..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default IntuitionForm