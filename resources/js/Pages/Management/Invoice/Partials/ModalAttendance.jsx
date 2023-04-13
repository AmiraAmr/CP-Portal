import { DatePicker, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

const ModalAttendance = ({ isModalOpen, setIsModalOpen, user }) => {
    const { RangePicker } = DatePicker;

    const [data, setData] = useState({
        attending_leaving: "",
        attending_time: "",
    });
    const handleOk = () => {
        axios.post(`/managers/attendance/${user.id}`, {
            attending_leaving: data.attending_leaving,
            attending_time: data.attending_time,
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Save changes"
        >
            <RangePicker
                showTime={{
                    format: "HH:mm",
                }}
                format="YYYY-MM-DD HH:mm"
                onChange={(date, dateString) =>
                    setData((prev) => {
                        return {
                            ...prev,
                            attending_leaving: moment(dateString[0]).format(
                                "YYYY-MM-DD HH:mm:ss"
                            ),
                            attending_time: moment(dateString[1]).format(
                                "YYYY-MM-DD HH:mm:ss"
                            ),
                        };
                    })
                }
            />
        </Modal>
    );
};

export default ModalAttendance;
