import React from "react";

const Footer = () => {
    return (
        <div className="py-4 bg-white">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="font-medium ">
                        <span className="text-gray-400 font-semibold mr-2">
                            2023©
                        </span>
                        <a
                            href="#"
                            target="_blank"
                            className="text-gray-600 font-medium"
                        >
                            Mohamed Ashraf
                        </a>
                    </div>
                    <div>
                        <ul className="flex items-center gap-4 text-gray-500 font-semibold">
                            <li >
                                About
                            </li>
                            <li>
                                Support
                            </li>
                            <li>
                                Purchase
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
