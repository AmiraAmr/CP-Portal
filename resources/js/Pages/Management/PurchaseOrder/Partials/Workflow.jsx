import { message, Modal, Switch, Transfer } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const mockData = Array.from({
    length: 20,
}).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
}));
const oriTargetKeys = mockData
    .filter((item) => Number(item.key) % 3 > 1)
    .map((item) => item.key);

const Workflow = ({ open, setOpen }) => {
    const [roles, setRoles] = useState([]);

    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const handleChange = (newTargetKeys, direction, moveKeys) => {
        setTargetKeys(newTargetKeys);
        console.log("targetKeys: ", newTargetKeys);
        console.log("direction: ", direction);
        console.log("moveKeys: ", moveKeys);
    };

    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
        console.log("sourceSelectedKeys: ", sourceSelectedKeys);
        console.log("targetSelectedKeys: ", targetSelectedKeys);
    };

    const handleScroll = (direction, e) => {
        console.log("direction:", direction);
        console.log("target:", e.target);
    };

    const handleSave = () => {
        const data = [];
        targetKeys.map((target) => {
            roles.map((role) => {
                if (role.id == target) {
                    data.push({ id: role.id, name: role.name });
                    return role;
                }
            });
        });
        console.log(data);

        let formData = new FormData();
        if (data.length > 0) {
            formData.append("Workflow", JSON.stringify(data));
        }

        axios.post("/managers/updateWorkflow", formData).then((res) => {
            message.success("Modified successfully");
        });
    };
    useEffect(() => {
        setRoles([]);
        setTargetKeys([]);
        axios.get("/managers/customizeWorkpurchase").then((res) => {
            console.log(res);
            res.data.role.map((role) => {
                setRoles((prev) => {
                    return [
                        ...prev,
                        {
                            key: role.id,
                            title: role.name,
                            id: role.id,
                            name: role.name,
                        },
                    ];
                });
                return role;
            });
            res.data.workflow.flowwork_step.map((workflow) => {
                setTargetKeys((prev) => {
                    return [...prev, workflow.role.id];
                });
            });
        });
    }, []);
    return (
        <div>
            <Modal
                title="WorkFlow"
                centered
                open={open}
                onOk={handleSave}
                onCancel={() => setOpen(false)}
                okText="Save"
                width={1000}
            >
                <Transfer
                    dataSource={roles}
                    titles={["Role", "Purchase Order"]}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={handleChange}
                    onSelectChange={handleSelectChange}
                    onScroll={handleScroll}
                    render={(item) => item.title}
                    oneWay
                    listStyle={{
                        width: "100%",
                    }}
                    style={{
                        marginBottom: 16,
                    }}
                />
            </Modal>
        </div>
    );
};

export default Workflow;
