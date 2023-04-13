import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
const GetPricingSupplier = ({
    data,
    setData,
    setItems,
    setPayment,
    setDiscount,
    setDiscountPercentage,
    setCash,
    setChecked,
}) => {
    const [name, setName] = useState("");
    const [pricingSuppliers, setPricingSuppliers] = useState([]);
    const [selected, setSelected] = useState({});
    const [pricingSupplier, setPricingSupplier] = useState({});
    const getUser = (name) => {
        axios({
            url: "/pricing_suppliersAutoComplete",
            method: "post",
            data: {
                ref: name,
            },
        }).then((res) => {
            setPricingSuppliers(res.data.data);
        });
    };
    useEffect(() => {
        getUser(name);
    }, [name]);

    useEffect(() => {
        if (selected.id) {
            axios({
                url: `/getricingdetails/${selected.id}`,
                method: "post",
            }).then((res) => {
                res.data.data.attributes2.forEach((e) => {
                    setItems((prev) => {
                        return [...prev, e];
                    });
                });
                res.data.data.attributes.forEach((e) => {
                    setItems((prev) => {
                        return [
                            ...prev,
                            {
                                id: e.id,
                                dis: e.pivot.dis,
                                qty: e.pivot.qty,
                                product_id: e.pivot.product_id,
                                unit: e.pivot.unit,
                                unit_price: e.pivot.unit_price,
                                total: e.pivot.total
                            },
                        ];
                    });
                });
                setPayment(res.data.data.note);
                setDiscount(res.data.data.percentage_discount);
                setDiscountPercentage(res.data.data.discount);
                setCash(res.data.data.cash == "1" ? true : false);
                setChecked(res.data.data.on_vat == "1" ? true : false);
                setData("content", res.data.data.order_for);
                setData("supplier_id", res.data.data.supplier_id);
                setPricingSupplier({
                    name: res.data.data.ref,
                    id: res.data.data.id,
                });
                setPricingSuppliers([])
            });
        }
    }, [selected]);
    return (
        <div className="relative">
            <label
                for="pricing-suppliers"
                class="block mb-2 text-sm font-medium text-gray-900"
            >
                Pricing Supplier
            </label>
            <input
                id="pricing-suppliers"
                type="text"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Pricing Supplier"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            {pricingSuppliers.length > 0 && name !== "" ? (
                <motion.div
                    initial={{ y: "-19px" }}
                    animate={{ y: "0" }}
                    className="absolute w-full bg-white border mt-2 shadow-lg p-2 py-3 rounded-lg z-10"
                >
                    {pricingSuppliers?.map((user, index) => {
                        return (
                            <div
                                key={index}
                                className="cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-md"
                                onClick={() => {
                                    setSelected(user);
                                    setName("");
                                }}
                            >
                                {user.ref}
                            </div>
                        );
                    })}
                </motion.div>
            ) : null}
        </div>
    );
};

export default GetPricingSupplier;
