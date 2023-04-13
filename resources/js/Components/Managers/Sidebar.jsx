import { Link } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "antd";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const Sidebar = ({ auth }) => {
    const [links, setLinks] = useState([
        {
            icon: (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.79 22.75H6.21C3.47 22.75 1.25 20.52 1.25 17.78V10.37C1.25 9.01 2.09 7.3 3.17 6.46L8.56 2.26C10.18 1 12.77 0.940005 14.45 2.12L20.63 6.45C21.82 7.28 22.75 9.06001 22.75 10.51V17.79C22.75 20.52 20.53 22.75 17.79 22.75ZM9.48 3.44L4.09 7.64C3.38 8.2 2.75 9.47001 2.75 10.37V17.78C2.75 19.69 4.3 21.25 6.21 21.25H17.79C19.7 21.25 21.25 19.7 21.25 17.79V10.51C21.25 9.55 20.56 8.22 19.77 7.68L13.59 3.35C12.45 2.55 10.57 2.59 9.48 3.44Z" />
                    <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z" />
                </svg>
            ),
            text: "Dashboard",
            href: "/managers",
            name: "dashboard",
        },
        // {
        //     icon: (
        //         <svg
        //             width="24"
        //             height="24"
        //             viewBox="0 0 24 24"
        //             fill="currentColor"
        //             xmlns="http://www.w3.org/2000/svg"
        //         >
        //             <path d="M17.6201 9.62012H12.3701C11.9601 9.62012 11.6201 9.28012 11.6201 8.87012C11.6201 8.46012 11.9601 8.12012 12.3701 8.12012H17.6201C18.0301 8.12012 18.3701 8.46012 18.3701 8.87012C18.3701 9.28012 18.0401 9.62012 17.6201 9.62012Z" />
        //             <path d="M7.11957 10.3801C6.92957 10.3801 6.73957 10.3101 6.58957 10.1601L5.83957 9.41007C5.54957 9.12007 5.54957 8.64007 5.83957 8.35007C6.12957 8.06007 6.60957 8.06007 6.89957 8.35007L7.11957 8.57007L8.83957 6.85007C9.12957 6.56007 9.60957 6.56007 9.89957 6.85007C10.1896 7.14007 10.1896 7.62007 9.89957 7.91007L7.64957 10.1601C7.50957 10.3001 7.31957 10.3801 7.11957 10.3801Z" />
        //             <path d="M17.6201 16.6201H12.3701C11.9601 16.6201 11.6201 16.2801 11.6201 15.8701C11.6201 15.4601 11.9601 15.1201 12.3701 15.1201H17.6201C18.0301 15.1201 18.3701 15.4601 18.3701 15.8701C18.3701 16.2801 18.0401 16.6201 17.6201 16.6201Z" />
        //             <path d="M7.11957 17.3801C6.92957 17.3801 6.73957 17.3101 6.58957 17.1601L5.83957 16.4101C5.54957 16.1201 5.54957 15.6401 5.83957 15.3501C6.12957 15.0601 6.60957 15.0601 6.89957 15.3501L7.11957 15.5701L8.83957 13.8501C9.12957 13.5601 9.60957 13.5601 9.89957 13.8501C10.1896 14.1401 10.1896 14.6201 9.89957 14.9101L7.64957 17.1601C7.50957 17.3001 7.31957 17.3801 7.11957 17.3801Z" />
        //             <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" />
        //         </svg>
        //     ),
        //     text: "Orders",
        //     href: "/user/order",
        //     name: "order",
        // },
        // {
        //     icon: (
        //         <svg
        //             width="24"
        //             height="24"
        //             viewBox="0 0 24 24"
        //             fill="currentColor"
        //             xmlns="http://www.w3.org/2000/svg"
        //         >
        //             <path d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z" />
        //             <path d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z" />
        //             <path d="M8.5 14.5001C8.37 14.5001 8.24 14.4701 8.12 14.4201C7.99 14.3701 7.89 14.3001 7.79 14.2101C7.61 14.0201 7.5 13.7701 7.5 13.5001C7.5 13.3701 7.53 13.2401 7.58 13.1201C7.63 13.0001 7.7 12.8901 7.79 12.7901C7.89 12.7001 7.99 12.6301 8.12 12.5801C8.48 12.4301 8.93 12.5101 9.21 12.7901C9.39 12.9801 9.5 13.2401 9.5 13.5001C9.5 13.5601 9.49 13.6301 9.48 13.7001C9.47 13.7601 9.45 13.8201 9.42 13.8801C9.4 13.9401 9.37 14.0001 9.33 14.0601C9.3 14.1101 9.25 14.1601 9.21 14.2101C9.02 14.3901 8.76 14.5001 8.5 14.5001Z" />
        //             <path d="M12 14.4999C11.87 14.4999 11.74 14.4699 11.62 14.4199C11.49 14.3699 11.39 14.2999 11.29 14.2099C11.11 14.0199 11 13.7699 11 13.4999C11 13.3699 11.03 13.2399 11.08 13.1199C11.13 12.9999 11.2 12.8899 11.29 12.7899C11.39 12.6999 11.49 12.6299 11.62 12.5799C11.98 12.4199 12.43 12.5099 12.71 12.7899C12.89 12.9799 13 13.2399 13 13.4999C13 13.5599 12.99 13.6299 12.98 13.6999C12.97 13.7599 12.95 13.8199 12.92 13.8799C12.9 13.9399 12.87 13.9999 12.83 14.0599C12.8 14.1099 12.75 14.1599 12.71 14.2099C12.52 14.3899 12.26 14.4999 12 14.4999Z" />
        //             <path d="M15.5 14.4999C15.37 14.4999 15.24 14.4699 15.12 14.4199C14.99 14.3699 14.89 14.2999 14.79 14.2099C14.75 14.1599 14.71 14.1099 14.67 14.0599C14.63 13.9999 14.6 13.9399 14.58 13.8799C14.55 13.8199 14.53 13.7599 14.52 13.6999C14.51 13.6299 14.5 13.5599 14.5 13.4999C14.5 13.2399 14.61 12.9799 14.79 12.7899C14.89 12.6999 14.99 12.6299 15.12 12.5799C15.49 12.4199 15.93 12.5099 16.21 12.7899C16.39 12.9799 16.5 13.2399 16.5 13.4999C16.5 13.5599 16.49 13.6299 16.48 13.6999C16.47 13.7599 16.45 13.8199 16.42 13.8799C16.4 13.9399 16.37 13.9999 16.33 14.0599C16.3 14.1099 16.25 14.1599 16.21 14.2099C16.02 14.3899 15.76 14.4999 15.5 14.4999Z" />
        //             <path d="M8.5 17.9999C8.37 17.9999 8.24 17.97 8.12 17.92C8 17.87 7.89 17.7999 7.79 17.7099C7.61 17.5199 7.5 17.2599 7.5 16.9999C7.5 16.8699 7.53 16.7399 7.58 16.6199C7.63 16.4899 7.7 16.38 7.79 16.29C8.16 15.92 8.84 15.92 9.21 16.29C9.39 16.48 9.5 16.7399 9.5 16.9999C9.5 17.2599 9.39 17.5199 9.21 17.7099C9.02 17.8899 8.76 17.9999 8.5 17.9999Z" />
        //             <path d="M12 17.9999C11.74 17.9999 11.48 17.8899 11.29 17.7099C11.11 17.5199 11 17.2599 11 16.9999C11 16.8699 11.03 16.7399 11.08 16.6199C11.13 16.4899 11.2 16.38 11.29 16.29C11.66 15.92 12.34 15.92 12.71 16.29C12.8 16.38 12.87 16.4899 12.92 16.6199C12.97 16.7399 13 16.8699 13 16.9999C13 17.2599 12.89 17.5199 12.71 17.7099C12.52 17.8899 12.26 17.9999 12 17.9999Z" />
        //             <path d="M15.5 17.9999C15.24 17.9999 14.98 17.8899 14.79 17.7099C14.7 17.6199 14.63 17.5099 14.58 17.3799C14.53 17.2599 14.5 17.1299 14.5 16.9999C14.5 16.8699 14.53 16.7399 14.58 16.6199C14.63 16.4899 14.7 16.3799 14.79 16.2899C15.02 16.0599 15.37 15.9499 15.69 16.0199C15.76 16.0299 15.82 16.0499 15.88 16.0799C15.94 16.0999 16 16.1299 16.06 16.1699C16.11 16.1999 16.16 16.2499 16.21 16.2899C16.39 16.4799 16.5 16.7399 16.5 16.9999C16.5 17.2599 16.39 17.5199 16.21 17.7099C16.02 17.8899 15.76 17.9999 15.5 17.9999Z" />
        //             <path d="M20.5 9.83984H3.5C3.09 9.83984 2.75 9.49984 2.75 9.08984C2.75 8.67984 3.09 8.33984 3.5 8.33984H20.5C20.91 8.33984 21.25 8.67984 21.25 9.08984C21.25 9.49984 20.91 9.83984 20.5 9.83984Z" />
        //             <path d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z" />
        //         </svg>
        //     ),
        //     text: "Attend",
        //     href: "/user/attends",
        //     name: "attends",
        // },
        // {
        //     icon: (
        //         <svg
        //             width="24"
        //             height="24"
        //             viewBox="0 0 25 24"
        //             fill="currentColor"
        //             xmlns="http://www.w3.org/2000/svg"
        //         >
        //             <path d="M17.0017 21.25H7.00171C3.35171 21.25 1.25171 19.15 1.25171 15.5V8.5C1.25171 4.85 3.35171 2.75 7.00171 2.75H17.0017C20.6517 2.75 22.7517 4.85 22.7517 8.5V15.5C22.7517 19.15 20.6517 21.25 17.0017 21.25ZM7.00171 4.25C4.14171 4.25 2.75171 5.64 2.75171 8.5V15.5C2.75171 18.36 4.14171 19.75 7.00171 19.75H17.0017C19.8617 19.75 21.2517 18.36 21.2517 15.5V8.5C21.2517 5.64 19.8617 4.25 17.0017 4.25H7.00171Z" />
        //             <path d="M12.0017 15.75C9.93171 15.75 8.25171 14.07 8.25171 12C8.25171 9.93 9.93171 8.25 12.0017 8.25C14.0717 8.25 15.7517 9.93 15.7517 12C15.7517 14.07 14.0717 15.75 12.0017 15.75ZM12.0017 9.75C10.7617 9.75 9.75171 10.76 9.75171 12C9.75171 13.24 10.7617 14.25 12.0017 14.25C13.2417 14.25 14.2517 13.24 14.2517 12C14.2517 10.76 13.2417 9.75 12.0017 9.75Z" />
        //             <path d="M3.00171 9.75H2.00171C1.59171 9.75 1.25171 9.41 1.25171 9C1.25171 8.59 1.59171 8.25 2.00171 8.25H3.00171C5.58171 8.25 6.25171 7.58 6.25171 5V4C6.25171 3.59 6.59171 3.25 7.00171 3.25C7.41171 3.25 7.75171 3.59 7.75171 4V5C7.75171 8.42 6.42171 9.75 3.00171 9.75Z" />
        //             <path d="M22.0017 9.75H21.0017C17.5817 9.75 16.2517 8.42 16.2517 5V4C16.2517 3.59 16.5917 3.25 17.0017 3.25C17.4117 3.25 17.7517 3.59 17.7517 4V5C17.7517 7.58 18.4217 8.25 21.0017 8.25H22.0017C22.4117 8.25 22.7517 8.59 22.7517 9C22.7517 9.41 22.4117 9.75 22.0017 9.75Z" />
        //             <path d="M7.00171 20.75C6.59171 20.75 6.25171 20.41 6.25171 20V19C6.25171 16.42 5.58171 15.75 3.00171 15.75H2.00171C1.59171 15.75 1.25171 15.41 1.25171 15C1.25171 14.59 1.59171 14.25 2.00171 14.25H3.00171C6.42171 14.25 7.75171 15.58 7.75171 19V20C7.75171 20.41 7.41171 20.75 7.00171 20.75Z" />
        //             <path d="M17.0017 20.75C16.5917 20.75 16.2517 20.41 16.2517 20V19C16.2517 15.58 17.5817 14.25 21.0017 14.25H22.0017C22.4117 14.25 22.7517 14.59 22.7517 15C22.7517 15.41 22.4117 15.75 22.0017 15.75H21.0017C18.4217 15.75 17.7517 16.42 17.7517 19V20C17.7517 20.41 17.4117 20.75 17.0017 20.75Z" />
        //         </svg>
        //     ),
        //     text: "Petty Cash",
        //     href: "/",
        //     name: "petty_cash",
        // },
        // {
        //     icon: (
        //         <svg
        //             width="24"
        //             height="24"
        //             viewBox="0 0 24 24"
        //             fill="currentColor"
        //             xmlns="http://www.w3.org/2000/svg"
        //         >
        //             <path d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z" />
        //             <path d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z" />
        //             <path d="M14 6.75H10C9.04 6.75 7.25 6.75 7.25 4C7.25 1.25 9.04 1.25 10 1.25H14C14.96 1.25 16.75 1.25 16.75 4C16.75 4.96 16.75 6.75 14 6.75ZM10 2.75C9.01 2.75 8.75 2.75 8.75 4C8.75 5.25 9.01 5.25 10 5.25H14C15.25 5.25 15.25 4.99 15.25 4C15.25 2.75 14.99 2.75 14 2.75H10Z" />
        //             <path d="M15 22.7501H9C3.38 22.7501 2.25 20.1701 2.25 16.0001V10.0001C2.25 5.44005 3.9 3.49005 7.96 3.28005C8.36 3.26005 8.73 3.57005 8.75 3.99005C8.77 4.41005 8.45 4.75005 8.04 4.77005C5.2 4.93005 3.75 5.78005 3.75 10.0001V16.0001C3.75 19.7001 4.48 21.2501 9 21.2501H15C19.52 21.2501 20.25 19.7001 20.25 16.0001V10.0001C20.25 5.78005 18.8 4.93005 15.96 4.77005C15.55 4.75005 15.23 4.39005 15.25 3.98005C15.27 3.57005 15.63 3.25005 16.04 3.27005C20.1 3.49005 21.75 5.44005 21.75 9.99005V15.9901C21.75 20.1701 20.62 22.7501 15 22.7501Z" />
        //         </svg>
        //     ),
        //     text: "Daily Reports",
        //     href: "/",
        //     name: "daily_reports",
        // },
        // {
        //     icon: (
        //         <svg
        //             width="24"
        //             height="24"
        //             viewBox="0 0 24 24"
        //             fill="currentColor"
        //             xmlns="http://www.w3.org/2000/svg"
        //         >
        //             <path d="M18.0003 7.91002C17.9703 7.91002 17.9503 7.91002 17.9203 7.91002H17.8703C15.9803 7.85002 14.5703 6.39001 14.5703 4.59001C14.5703 2.75001 16.0703 1.26001 17.9003 1.26001C19.7303 1.26001 21.2303 2.76001 21.2303 4.59001C21.2203 6.40001 19.8103 7.86001 18.0103 7.92001C18.0103 7.91001 18.0103 7.91002 18.0003 7.91002ZM17.9003 2.75002C16.8903 2.75002 16.0703 3.57002 16.0703 4.58002C16.0703 5.57002 16.8403 6.37002 17.8303 6.41002C17.8403 6.40002 17.9203 6.40002 18.0103 6.41002C18.9803 6.36002 19.7303 5.56002 19.7403 4.58002C19.7403 3.57002 18.9203 2.75002 17.9003 2.75002Z" />
        //             <path d="M18.0105 15.2801C17.6205 15.2801 17.2305 15.2501 16.8405 15.1801C16.4305 15.1101 16.1605 14.7201 16.2305 14.3101C16.3005 13.9001 16.6905 13.6301 17.1005 13.7001C18.3305 13.9101 19.6305 13.6802 20.5005 13.1002C20.9705 12.7902 21.2205 12.4001 21.2205 12.0101C21.2205 11.6201 20.9605 11.2401 20.5005 10.9301C19.6305 10.3501 18.3105 10.1201 17.0705 10.3401C16.6605 10.4201 16.2705 10.1401 16.2005 9.73015C16.1305 9.32015 16.4005 8.93015 16.8105 8.86015C18.4405 8.57015 20.1305 8.88014 21.3305 9.68014C22.2105 10.2701 22.7205 11.1101 22.7205 12.0101C22.7205 12.9001 22.2205 13.7502 21.3305 14.3502C20.4205 14.9502 19.2405 15.2801 18.0105 15.2801Z" />
        //             <path d="M5.97047 7.91C5.96047 7.91 5.95047 7.91 5.95047 7.91C4.15047 7.85 2.74047 6.39 2.73047 4.59C2.73047 2.75 4.23047 1.25 6.06047 1.25C7.89047 1.25 9.39047 2.75 9.39047 4.58C9.39047 6.39 7.98047 7.85 6.18047 7.91L5.97047 7.16L6.04047 7.91C6.02047 7.91 5.99047 7.91 5.97047 7.91ZM6.07047 6.41C6.13047 6.41 6.18047 6.41 6.24047 6.42C7.13047 6.38 7.91047 5.58 7.91047 4.59C7.91047 3.58 7.09047 2.75999 6.08047 2.75999C5.07047 2.75999 4.25047 3.58 4.25047 4.59C4.25047 5.57 5.01047 6.36 5.98047 6.42C5.99047 6.41 6.03047 6.41 6.07047 6.41Z" />
        //             <path d="M5.96 15.2801C4.73 15.2801 3.55 14.9502 2.64 14.3502C1.76 13.7602 1.25 12.9101 1.25 12.0101C1.25 11.1201 1.76 10.2701 2.64 9.68014C3.84 8.88014 5.53 8.57015 7.16 8.86015C7.57 8.93015 7.84 9.32015 7.77 9.73015C7.7 10.1401 7.31 10.4201 6.9 10.3401C5.66 10.1201 4.35 10.3501 3.47 10.9301C3 11.2401 2.75 11.6201 2.75 12.0101C2.75 12.4001 3.01 12.7902 3.47 13.1002C4.34 13.6802 5.64 13.9101 6.87 13.7001C7.28 13.6301 7.67 13.9101 7.74 14.3101C7.81 14.7201 7.54 15.1101 7.13 15.1801C6.74 15.2501 6.35 15.2801 5.96 15.2801Z" />
        //             <path d="M12.0003 15.38C11.9703 15.38 11.9503 15.38 11.9203 15.38H11.8703C9.98031 15.32 8.57031 13.86 8.57031 12.06C8.57031 10.22 10.0703 8.72998 11.9003 8.72998C13.7303 8.72998 15.2303 10.23 15.2303 12.06C15.2203 13.87 13.8103 15.33 12.0103 15.39C12.0103 15.38 12.0103 15.38 12.0003 15.38ZM11.9003 10.22C10.8903 10.22 10.0703 11.04 10.0703 12.05C10.0703 13.04 10.8403 13.84 11.8303 13.88C11.8403 13.87 11.9203 13.87 12.0103 13.88C12.9803 13.83 13.7303 13.03 13.7403 12.05C13.7403 11.05 12.9203 10.22 11.9003 10.22Z" />
        //             <path d="M11.9993 22.76C10.7993 22.76 9.5993 22.45 8.6693 21.82C7.7893 21.23 7.2793 20.39 7.2793 19.49C7.2793 18.6 7.7793 17.74 8.6693 17.15C10.5393 15.91 13.4693 15.91 15.3293 17.15C16.2093 17.74 16.7193 18.58 16.7193 19.48C16.7193 20.37 16.2193 21.23 15.3293 21.82C14.3993 22.44 13.1993 22.76 11.9993 22.76ZM9.4993 18.41C9.0293 18.72 8.7793 19.11 8.7793 19.5C8.7793 19.89 9.0393 20.27 9.4993 20.58C10.8493 21.49 13.1393 21.49 14.4893 20.58C14.9593 20.27 15.2093 19.88 15.2093 19.49C15.2093 19.1 14.9493 18.72 14.4893 18.41C13.1493 17.5 10.8593 17.51 9.4993 18.41Z" />
        //         </svg>
        //     ),
        //     text: "Employees",
        //     href: "/",
        //     name: "employees",
        // },
        // {
        //     icon: (
        //         <svg
        //             width="24"
        //             height="24"
        //             viewBox="0 0 24 24"
        //             fill="currentColor"
        //             xmlns="http://www.w3.org/2000/svg"
        //         >
        //             <path d="M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z" />
        //             <path d="M15.21 22.1898C15 22.1898 14.79 22.1598 14.58 22.1098C13.96 21.9398 13.44 21.5498 13.11 20.9998L12.99 20.7998C12.4 19.7798 11.59 19.7798 11 20.7998L10.89 20.9898C10.56 21.5498 10.04 21.9498 9.42 22.1098C8.79 22.2798 8.14 22.1898 7.59 21.8598L5.87 20.8698C5.26 20.5198 4.82 19.9498 4.63 19.2598C4.45 18.5698 4.54 17.8598 4.89 17.2498C5.18 16.7398 5.26 16.2798 5.09 15.9898C4.92 15.6998 4.49 15.5298 3.9 15.5298C2.44 15.5298 1.25 14.3398 1.25 12.8798V11.1198C1.25 9.6598 2.44 8.4698 3.9 8.4698C4.49 8.4698 4.92 8.2998 5.09 8.0098C5.26 7.7198 5.19 7.2598 4.89 6.7498C4.54 6.1398 4.45 5.4198 4.63 4.7398C4.81 4.0498 5.25 3.4798 5.87 3.1298L7.6 2.1398C8.73 1.4698 10.22 1.8598 10.9 3.0098L11.02 3.2098C11.61 4.2298 12.42 4.2298 13.01 3.2098L13.12 3.0198C13.8 1.8598 15.29 1.4698 16.43 2.1498L18.15 3.1398C18.76 3.4898 19.2 4.0598 19.39 4.7498C19.57 5.4398 19.48 6.1498 19.13 6.7598C18.84 7.2698 18.76 7.7298 18.93 8.0198C19.1 8.3098 19.53 8.4798 20.12 8.4798C21.58 8.4798 22.77 9.6698 22.77 11.1298V12.8898C22.77 14.3498 21.58 15.5398 20.12 15.5398C19.53 15.5398 19.1 15.7098 18.93 15.9998C18.76 16.2898 18.83 16.7498 19.13 17.2598C19.48 17.8698 19.58 18.5898 19.39 19.2698C19.21 19.9598 18.77 20.5298 18.15 20.8798L16.42 21.8698C16.04 22.0798 15.63 22.1898 15.21 22.1898ZM12 18.4898C12.89 18.4898 13.72 19.0498 14.29 20.0398L14.4 20.2298C14.52 20.4398 14.72 20.5898 14.96 20.6498C15.2 20.7098 15.44 20.6798 15.64 20.5598L17.37 19.5598C17.63 19.4098 17.83 19.1598 17.91 18.8598C17.99 18.5598 17.95 18.2498 17.8 17.9898C17.23 17.0098 17.16 15.9998 17.6 15.2298C18.04 14.4598 18.95 14.0198 20.09 14.0198C20.73 14.0198 21.24 13.5098 21.24 12.8698V11.1098C21.24 10.4798 20.73 9.9598 20.09 9.9598C18.95 9.9598 18.04 9.5198 17.6 8.7498C17.16 7.9798 17.23 6.9698 17.8 5.9898C17.95 5.7298 17.99 5.4198 17.91 5.1198C17.83 4.8198 17.64 4.5798 17.38 4.4198L15.65 3.4298C15.22 3.1698 14.65 3.3198 14.39 3.7598L14.28 3.9498C13.71 4.9398 12.88 5.4998 11.99 5.4998C11.1 5.4998 10.27 4.9398 9.7 3.9498L9.59 3.7498C9.34 3.3298 8.78 3.1798 8.35 3.4298L6.62 4.4298C6.36 4.5798 6.16 4.8298 6.08 5.1298C6 5.4298 6.04 5.7398 6.19 5.9998C6.76 6.9798 6.83 7.9898 6.39 8.7598C5.95 9.5298 5.04 9.9698 3.9 9.9698C3.26 9.9698 2.75 10.4798 2.75 11.1198V12.8798C2.75 13.5098 3.26 14.0298 3.9 14.0298C5.04 14.0298 5.95 14.4698 6.39 15.2398C6.83 16.0098 6.76 17.0198 6.19 17.9998C6.04 18.2598 6 18.5698 6.08 18.8698C6.16 19.1698 6.35 19.4098 6.61 19.5698L8.34 20.5598C8.55 20.6898 8.8 20.7198 9.03 20.6598C9.27 20.5998 9.47 20.4398 9.6 20.2298L9.71 20.0398C10.28 19.0598 11.11 18.4898 12 18.4898Z" />
        //         </svg>
        //     ),
        //     text: "Setting",
        //     href: "/",
        //     name: "setteing",
        // },
    ]);
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem(
            "Purchase",
            "sub1",
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.6201 9.62012H12.3701C11.9601 9.62012 11.6201 9.28012 11.6201 8.87012C11.6201 8.46012 11.9601 8.12012 12.3701 8.12012H17.6201C18.0301 8.12012 18.3701 8.46012 18.3701 8.87012C18.3701 9.28012 18.0401 9.62012 17.6201 9.62012Z"></path>
                <path d="M7.11957 10.3801C6.92957 10.3801 6.73957 10.3101 6.58957 10.1601L5.83957 9.41007C5.54957 9.12007 5.54957 8.64007 5.83957 8.35007C6.12957 8.06007 6.60957 8.06007 6.89957 8.35007L7.11957 8.57007L8.83957 6.85007C9.12957 6.56007 9.60957 6.56007 9.89957 6.85007C10.1896 7.14007 10.1896 7.62007 9.89957 7.91007L7.64957 10.1601C7.50957 10.3001 7.31957 10.3801 7.11957 10.3801Z"></path>
                <path d="M17.6201 16.6201H12.3701C11.9601 16.6201 11.6201 16.2801 11.6201 15.8701C11.6201 15.4601 11.9601 15.1201 12.3701 15.1201H17.6201C18.0301 15.1201 18.3701 15.4601 18.3701 15.8701C18.3701 16.2801 18.0401 16.6201 17.6201 16.6201Z"></path>
                <path d="M7.11957 17.3801C6.92957 17.3801 6.73957 17.3101 6.58957 17.1601L5.83957 16.4101C5.54957 16.1201 5.54957 15.6401 5.83957 15.3501C6.12957 15.0601 6.60957 15.0601 6.89957 15.3501L7.11957 15.5701L8.83957 13.8501C9.12957 13.5601 9.60957 13.5601 9.89957 13.8501C10.1896 14.1401 10.1896 14.6201 9.89957 14.9101L7.64957 17.1601C7.50957 17.3001 7.31957 17.3801 7.11957 17.3801Z"></path>
                <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"></path>
            </svg>,
            [
                getItem(
                    <Link href="/managers/index_purchase_order">
                        Purchase Order
                    </Link>,
                    "o1"
                ),
                getItem(
                    <Link href="/managers/pricing_supplier/index">
                        Pricing_supplier
                    </Link>,
                    "o2"
                ),
                getItem(
                    <Link href="/managers/product_table">
                        Building Materials
                    </Link>,
                    "o3"
                ),
            ]
        ),
        getItem(
            "Customer & Suppliers",
            "sub2",
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.6201 9.62012H12.3701C11.9601 9.62012 11.6201 9.28012 11.6201 8.87012C11.6201 8.46012 11.9601 8.12012 12.3701 8.12012H17.6201C18.0301 8.12012 18.3701 8.46012 18.3701 8.87012C18.3701 9.28012 18.0401 9.62012 17.6201 9.62012Z"></path>
                <path d="M7.11957 10.3801C6.92957 10.3801 6.73957 10.3101 6.58957 10.1601L5.83957 9.41007C5.54957 9.12007 5.54957 8.64007 5.83957 8.35007C6.12957 8.06007 6.60957 8.06007 6.89957 8.35007L7.11957 8.57007L8.83957 6.85007C9.12957 6.56007 9.60957 6.56007 9.89957 6.85007C10.1896 7.14007 10.1896 7.62007 9.89957 7.91007L7.64957 10.1601C7.50957 10.3001 7.31957 10.3801 7.11957 10.3801Z"></path>
                <path d="M17.6201 16.6201H12.3701C11.9601 16.6201 11.6201 16.2801 11.6201 15.8701C11.6201 15.4601 11.9601 15.1201 12.3701 15.1201H17.6201C18.0301 15.1201 18.3701 15.4601 18.3701 15.8701C18.3701 16.2801 18.0401 16.6201 17.6201 16.6201Z"></path>
                <path d="M7.11957 17.3801C6.92957 17.3801 6.73957 17.3101 6.58957 17.1601L5.83957 16.4101C5.54957 16.1201 5.54957 15.6401 5.83957 15.3501C6.12957 15.0601 6.60957 15.0601 6.89957 15.3501L7.11957 15.5701L8.83957 13.8501C9.12957 13.5601 9.60957 13.5601 9.89957 13.8501C10.1896 14.1401 10.1896 14.6201 9.89957 14.9101L7.64957 17.1601C7.50957 17.3001 7.31957 17.3801 7.11957 17.3801Z"></path>
                <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"></path>
            </svg>,
            [
                getItem(
                    <Link href="/managers/suppliertable">Suppliers</Link>,
                    "cs1"
                ),
                getItem(
                    <Link href="/managers/customerindex"> Customers</Link>,
                    "cs2"
                ),
            ]
        ),
        getItem(
            "HR",
            "sub3",
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.6201 9.62012H12.3701C11.9601 9.62012 11.6201 9.28012 11.6201 8.87012C11.6201 8.46012 11.9601 8.12012 12.3701 8.12012H17.6201C18.0301 8.12012 18.3701 8.46012 18.3701 8.87012C18.3701 9.28012 18.0401 9.62012 17.6201 9.62012Z"></path>
                <path d="M7.11957 10.3801C6.92957 10.3801 6.73957 10.3101 6.58957 10.1601L5.83957 9.41007C5.54957 9.12007 5.54957 8.64007 5.83957 8.35007C6.12957 8.06007 6.60957 8.06007 6.89957 8.35007L7.11957 8.57007L8.83957 6.85007C9.12957 6.56007 9.60957 6.56007 9.89957 6.85007C10.1896 7.14007 10.1896 7.62007 9.89957 7.91007L7.64957 10.1601C7.50957 10.3001 7.31957 10.3801 7.11957 10.3801Z"></path>
                <path d="M17.6201 16.6201H12.3701C11.9601 16.6201 11.6201 16.2801 11.6201 15.8701C11.6201 15.4601 11.9601 15.1201 12.3701 15.1201H17.6201C18.0301 15.1201 18.3701 15.4601 18.3701 15.8701C18.3701 16.2801 18.0401 16.6201 17.6201 16.6201Z"></path>
                <path d="M7.11957 17.3801C6.92957 17.3801 6.73957 17.3101 6.58957 17.1601L5.83957 16.4101C5.54957 16.1201 5.54957 15.6401 5.83957 15.3501C6.12957 15.0601 6.60957 15.0601 6.89957 15.3501L7.11957 15.5701L8.83957 13.8501C9.12957 13.5601 9.60957 13.5601 9.89957 13.8501C10.1896 14.1401 10.1896 14.6201 9.89957 14.9101L7.64957 17.1601C7.50957 17.3001 7.31957 17.3801 7.11957 17.3801Z"></path>
                <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"></path>
            </svg>,
            [
                getItem(
                    <Link href="/managers/laborerindex">Time Sheet</Link>,
                    "hr1"
                ),
                getItem(
                    <Link href="/managers/user/usertable">Users</Link>,
                    "hr2"
                ),
                getItem(<Link href="/managers/task/index">Tasks</Link>, "hr3"),

                getItem(<Link href="/managers/dcindex">DCC</Link>, "hr4"),
                getItem(
                    <Link href="/managers/salaries/index">Salaries</Link>,
                    "hr5"
                ),
                getItem(
                    <Link href="/admin/project_index"> Projects</Link>,
                    "hr6"
                ),
            ]
        ),
        getItem(
            <Link href="/managers/index_matrial_request">Matrial Request</Link>,
            "5"
        ),
        getItem(<Link href="/managers/invoice/index">Invoice</Link>, "8"),
        getItem(
            <Link href="/managers/index_employee">Employee Request</Link>,
            "7"
        ),
        getItem(<Link href="/managers/contractorindex">Contractors</Link>, "9"),
        getItem(
            <Link href="/managers/daily_report/index">Daily report</Link>,
            "10"
        ),
        getItem(<Link href="/managers/joboffer/index">Job Offer</Link>, "11"),
        getItem(<Link href="/managers/service/index">Services</Link>, "12"),
        getItem(<Link href="/managers/role">Roles</Link>, "3"),
        getItem(<Link href="/managers/department">Sections</Link>, "4"),
        getItem(
            <Link href="/managers/report/daily/financial">
                Daily Financial Report
            </Link>,
            "13"
        ),
        getItem(
            <Link href="/managers/attendance/Manule">Manule Attendance</Link>,
            "6"
        ),
        getItem(
            <Link href="/managers/HR/attendance">Attendance List</Link>,
            "14"
        ),
        getItem(
            "Reports",
            "sub4",
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.6201 9.62012H12.3701C11.9601 9.62012 11.6201 9.28012 11.6201 8.87012C11.6201 8.46012 11.9601 8.12012 12.3701 8.12012H17.6201C18.0301 8.12012 18.3701 8.46012 18.3701 8.87012C18.3701 9.28012 18.0401 9.62012 17.6201 9.62012Z"></path>
                <path d="M7.11957 10.3801C6.92957 10.3801 6.73957 10.3101 6.58957 10.1601L5.83957 9.41007C5.54957 9.12007 5.54957 8.64007 5.83957 8.35007C6.12957 8.06007 6.60957 8.06007 6.89957 8.35007L7.11957 8.57007L8.83957 6.85007C9.12957 6.56007 9.60957 6.56007 9.89957 6.85007C10.1896 7.14007 10.1896 7.62007 9.89957 7.91007L7.64957 10.1601C7.50957 10.3001 7.31957 10.3801 7.11957 10.3801Z"></path>
                <path d="M17.6201 16.6201H12.3701C11.9601 16.6201 11.6201 16.2801 11.6201 15.8701C11.6201 15.4601 11.9601 15.1201 12.3701 15.1201H17.6201C18.0301 15.1201 18.3701 15.4601 18.3701 15.8701C18.3701 16.2801 18.0401 16.6201 17.6201 16.6201Z"></path>
                <path d="M7.11957 17.3801C6.92957 17.3801 6.73957 17.3101 6.58957 17.1601L5.83957 16.4101C5.54957 16.1201 5.54957 15.6401 5.83957 15.3501C6.12957 15.0601 6.60957 15.0601 6.89957 15.3501L7.11957 15.5701L8.83957 13.8501C9.12957 13.5601 9.60957 13.5601 9.89957 13.8501C10.1896 14.1401 10.1896 14.6201 9.89957 14.9101L7.64957 17.1601C7.50957 17.3001 7.31957 17.3801 7.11957 17.3801Z"></path>
                <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"></path>
            </svg>,
            [
                getItem(
                    <Link href="/managers/report/cost_center">
                        Cost Center
                    </Link>,
                    "r1"
                ),
                getItem(
                    <Link href="/managers/report/position">Salary Scale</Link>,
                    "r2"
                ),
                getItem(
                    <Link href="/managers/report/department/procurement">
                        Procurement
                    </Link>,
                    "r3"
                ),
                getItem(
                    <Link href="/managers/report/department/marketing">
                        Marketing
                    </Link>,
                    "r4"
                ),
                getItem(
                    <Link href="/managers/report/department/tender">
                        Tender
                    </Link>,
                    "r5"
                ),
                getItem(
                    <Link href="/managers/report/department/construction">
                        Construction
                    </Link>,
                    "r6"
                ),
                getItem(
                    <Link href="/managers/report/project">
                        Project Timesheet
                    </Link>,
                    "r7"
                ),
                getItem(
                    <Link href="/managers/report/stockpage">Stock</Link>,
                    "r8"
                ),
            ]
        ),
    ];
    return (
        <motion.div className="scrollbar lg:flex hidden fixed max-w-[18.5rem] h-full w-full bg-[#23408A] flex-col justify-between overflow-y-scroll">
            <div className="flex flex-col">
                <div className="flex px-4 pt-7 pb-3">
                    <img
                        src="/img/logo.png"
                        className="block h-24 w-auto fill-current text-gray-800"
                        alt=""
                    />
                </div>
                <div className="px-4 lg:px-4 flex flex-col gap-3">
                    {links.map((link, index) => {
                        return (
                            <Link
                                href={link.href}
                                key={index}
                                className={`flex items-center gap-2 font-medium p-3 rounded-xl text-white hover:text-white`}
                            >
                                {link.icon}
                                {link.text}
                            </Link>
                        );
                    })}
                    <Menu
                        className="!border-none !bg-[#23408A]"
                        mode="inline"
                        items={items}
                        theme="dark"
                    />
                </div>
            </div>
            <div className="p-3">
                <div className="bg-black p-2 text-white rounded-xl w-full flex flex-col items-center gap-3">
                    <img
                        className="w-16 -mt-6 rounded-full object-cover"
                        src="https://htmlstream.com/preview/front-dashboard-v2.1.1/assets/img/160x160/img6.jpg"
                        alt=""
                    />
                    <div className="w-full px-4 py-2 bg-[#262525] rounded-full flex items-center justify-between">
                        <span>Preset order to admin</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M8.9101 20.67C8.7201 20.67 8.5301 20.6 8.3801 20.45C8.0901 20.16 8.0901 19.68 8.3801 19.39L14.9001 12.87C15.3801 12.39 15.3801 11.61 14.9001 11.13L8.3801 4.61002C8.0901 4.32002 8.0901 3.84002 8.3801 3.55002C8.6701 3.26002 9.1501 3.26002 9.4401 3.55002L15.9601 10.07C16.4701 10.58 16.7601 11.27 16.7601 12C16.7601 12.73 16.4801 13.42 15.9601 13.93L9.4401 20.45C9.2901 20.59 9.1001 20.67 8.9101 20.67Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
